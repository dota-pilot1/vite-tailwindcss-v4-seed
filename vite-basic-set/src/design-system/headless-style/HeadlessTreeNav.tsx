import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useTree } from "@headless-tree/react";
import {
  syncDataLoaderFeature,
  dragAndDropFeature,
  hotkeysCoreFeature,
} from "@headless-tree/core";
import {
  shouldSearch,
  useDebouncedValue,
} from "../../shared/lib/search/shouldSearch";

/**
 * HeadlessTreeNav
 *
 * - headless-tree 기반 최소/확장가능 트리 내비게이션 래퍼
 * - 검색 고도화: 매칭 노드 + 모든 조상 노드 표시, 자동 확장, 매칭 하이라이트
 */

export interface HeadlessTreeNode {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: HeadlessTreeNode[];
  disabled?: boolean;
  meta?: unknown;
}

export interface HeadlessTreeNavProps {
  data: HeadlessTreeNode[];
  activeId?: string;
  className?: string;
  height?: number | string;
  enableDnd?: boolean;
  enableHotkeys?: boolean;
  searchable?: boolean;
  onSelect?(
    node: HeadlessTreeNode,
    e: React.MouseEvent | React.KeyboardEvent,
  ): void;
  onMove?(info: {
    dragId: string;
    targetId: string;
    position: "before" | "after" | "inside";
  }): void;
}

/* Data normalization */
function buildNodeMap(roots: HeadlessTreeNode[]): {
  map: Record<string, HeadlessTreeNode>;
  childrenMap: Record<string, string[]>;
} {
  const map: Record<string, HeadlessTreeNode> = {};
  const childrenMap: Record<string, string[]> = {};
  const visit = (node: HeadlessTreeNode) => {
    map[node.id] = node;
    const childIds =
      node.children?.map((c) => {
        visit(c);
        return c.id;
      }) ?? [];
    childrenMap[node.id] = childIds;
  };
  roots.forEach(visit);
  return { map, childrenMap };
}

export const HeadlessTreeNav: React.FC<HeadlessTreeNavProps> = ({
  data,
  activeId,
  className,
  height = 400,
  enableDnd = false,
  enableHotkeys = true,
  searchable = true,
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 150);
  const gate = shouldSearch(debouncedQuery);
  const effectiveQuery = gate.allow ? debouncedQuery : "";
  const ROOT_ID = "__root__";
  const { map, childrenMap } = useMemo(() => buildNodeMap(data), [data]);

  const features = useMemo(
    () => [
      syncDataLoaderFeature,
      ...(enableDnd ? [dragAndDropFeature] : []),
      ...(enableHotkeys ? [hotkeysCoreFeature] : []),
    ],
    [enableDnd, enableHotkeys],
  );

  const tree = useTree<HeadlessTreeNode>({
    rootItemId: ROOT_ID,
    getItemName: (item) =>
      item.getId() === ROOT_ID
        ? "ROOT"
        : (item.getItemData()?.name ?? item.getId()),
    isItemFolder: (item) =>
      item.getId() === ROOT_ID
        ? true
        : Boolean(item.getItemData()?.isFolder && childrenMap[item.getId()]),
    dataLoader: {
      getItem: (itemId) =>
        itemId === ROOT_ID
          ? { id: ROOT_ID, name: "ROOT", isFolder: true, children: data }
          : map[itemId],
      getChildren: (itemId) =>
        itemId === ROOT_ID ? data.map((n) => n.id) : childrenMap[itemId] || [],
    },
    features,
  });

  /* Global search (expansion-independent for match discovery)
     - Always searches the entire original data (map)
     - Always shows: matched nodes + their ancestors
     - Additionally shows descendants of matched nodes ONLY if they are currently visible
       (i.e. user expanded the matched branch), keeping noise low.
  */
  const visibleItems = tree.getItems();
  /* Expansion signature (only expanded folders, stable ordering) */
  const expansionSig = useMemo(
    () =>
      tree
        .getItems()
        .filter((i: any) => i.isExpanded?.())
        .map((i: any) => i.getId())
        .sort()
        .join("|"),
    [tree, visibleItems],
  );

  /* Compute actually visible (expanded path) node ids via DFS (uses expansionSig). */
  const expandedVisibleIds = useMemo(() => {
    const set = new Set<string>();
    const visit = (nodes: HeadlessTreeNode[], parentExpanded: boolean) => {
      if (!parentExpanded) return;
      nodes.forEach((n) => {
        set.add(n.id);
        let inst: any = null;
        try {
          inst = tree.getItemInstance(n.id);
        } catch {
          /* ignore */
        }
        const isOpen = inst?.isExpanded?.() ?? false;
        if (n.isFolder && n.children?.length) {
          visit(n.children, isOpen);
        }
      });
    };
    visit(data, true); // synthetic root always expanded
    return set;
  }, [data, tree, expansionSig]);

  const searchInfo = useMemo(() => {
    if (!effectiveQuery.trim()) {
      return {
        listIds: visibleItems
          .map((i) => i.getId())
          .filter((id) => id !== ROOT_ID),
        matched: new Set<string>(),
        ancestors: new Set<string>(),
      };
    }
    const q = effectiveQuery.toLowerCase();
    const matched = new Set<string>();
    const ancestors = new Set<string>();
    const parentOf: Record<string, string | undefined> = {};

    Object.entries(childrenMap).forEach(([pid, kids]) =>
      kids.forEach((k) => {
        parentOf[k] = pid;
      }),
    );

    // Collect matched + ancestors (full tree, ignoring expansion)
    Object.values(map).forEach((node) => {
      const name = node.name.toLowerCase();
      if (name.includes(q)) {
        matched.add(node.id);
        let p = parentOf[node.id];
        while (p && p !== ROOT_ID) {
          if (!ancestors.has(p)) ancestors.add(p);
          p = parentOf[p];
        }
      }
    });

    // Descendant visibility: only if node AND its ancestor chain are currently expanded
    const isExpandedDescendantOfMatched = (id: string) => {
      let p = parentOf[id];
      let touchedMatched = false;
      while (p && p !== ROOT_ID) {
        if (!expandedVisibleIds.has(p)) return false; // collapsed ancestor stops visibility
        if (matched.has(p)) touchedMatched = true;
        p = parentOf[p];
      }
      return touchedMatched;
    };

    // Preorder list respecting original tree order
    const listIds: string[] = [];
    const walk = (nodes: HeadlessTreeNode[]) => {
      nodes.forEach((n) => {
        const id = n.id;
        if (
          ancestors.has(id) || // always keep ancestors
          (matched.has(id) && expandedVisibleIds.has(id)) || // matched node visible only if its chain is expanded
          (expandedVisibleIds.has(id) && isExpandedDescendantOfMatched(id)) // visible descendant of a matched node
        ) {
          if (id !== ROOT_ID) listIds.push(id);
        }
        if (n.children?.length) walk(n.children);
      });
    };
    walk(data);

    return { listIds, matched, ancestors };
  }, [
    effectiveQuery,
    data,
    map,
    childrenMap,
    visibleItems,
    expandedVisibleIds,
  ]);

  /* Auto expand only ancestors so matched nodes are reachable; matched remain collapsed unless user opens */
  const expandedAppliedRef = useRef<string>("");
  useEffect(() => {
    if (!effectiveQuery.trim()) return;
    const signature = Array.from(searchInfo.ancestors).sort().join("|");
    if (expandedAppliedRef.current === signature) return;
    searchInfo.ancestors.forEach((id) => {
      try {
        const inst = tree.getItemInstance(id);
        if (!inst.isExpanded()) inst.expand();
      } catch {
        /* ignore */
      }
    });
    expandedAppliedRef.current = signature;
  }, [effectiveQuery, searchInfo.ancestors, tree]);

  const handleItemClick = useCallback(
    (item: any, e: React.MouseEvent) => {
      if (item.getId() === ROOT_ID) return;
      const payload = item.getItemData();
      if (!payload) return;
      onSelect?.(payload, e);
      if (payload.isFolder) {
        if (item.isExpanded()) {
          item.collapse();
        } else {
          item.expand();
        }
      }
    },
    [onSelect],
  );

  /* Highlight helper */
  const highlight = useCallback(
    (label: string) => {
      if (!effectiveQuery.trim()) return label;
      const lower = label.toLowerCase();
      const q = effectiveQuery.toLowerCase();
      const idx = lower.indexOf(q);
      if (idx === -1) return label;
      return (
        <>
          {label.slice(0, idx)}
          <span className="bg-yellow-100 px-0.5 rounded">
            {label.slice(idx, idx + q.length)}
          </span>
          {label.slice(idx + q.length)}
        </>
      );
    },
    [query, effectiveQuery],
  );

  function renderItem(item: any) {
    if (item.getId() === ROOT_ID) return null;
    const meta = item.getItemMeta();
    const payload = item.getItemData();
    if (!payload) return null;
    const visualLevel = meta.level < 0 ? 0 : meta.level;
    const indent = 12 + visualLevel * 18;
    const active = activeId === item.getId();
    const isFolder = payload.isFolder;
    const disabled = payload.disabled;
    const isMatched = searchInfo.matched.has(item.getId());

    return (
      <div
        key={item.getId()}
        {...item.getProps()}
        data-id={item.getId()}
        data-folder={isFolder ? "true" : "false"}
        onClick={(e) => handleItemClick(item, e)}
        className={[
          "group flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 text-sm outline-none",
          disabled && "opacity-50 cursor-not-allowed",
          active
            ? "bg-gray-100 text-gray-900 font-medium"
            : isMatched
              ? "bg-yellow-50 text-gray-800"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "focus-visible:ring-2 focus-visible:ring-gray-300",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ paddingLeft: indent }}
        aria-current={active ? "true" : undefined}
      >
        {isFolder && (
          <span
            className={[
              "transition-transform text-[10px]",
              item.isExpanded() ? "rotate-90" : "",
            ].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              if (item.isExpanded()) {
                item.collapse();
              } else {
                item.expand();
              }
            }}
          >
            ▶
          </span>
        )}
        {!isFolder && <span className="w-3" />}
        <span className="truncate">{highlight(payload.name)}</span>
      </div>
    );
  }

  const inlineHeight =
    typeof height === "number" ? `${height}px` : height || "400px";

  const itemsToRender = effectiveQuery.trim()
    ? searchInfo.listIds.map((id) => tree.getItemInstance(id))
    : tree.getItems().filter((it) => it.getId() !== ROOT_ID);

  return (
    <div
      className={["flex h-full flex-col", className].filter(Boolean).join(" ")}
      data-component="HeadlessTreeNav"
    >
      {searchable && (
        <div className="p-2">
          <input
            placeholder="검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {!gate.allow && debouncedQuery.trim() !== "" && (
            <div className="mt-1 text-[11px] leading-snug text-gray-500">
              {gate.reason}
            </div>
          )}
        </div>
      )}

      <div
        {...tree.getContainerProps()}
        className="flex-1 overflow-auto px-1 pb-2"
        style={{ height: inlineHeight }}
      >
        {itemsToRender.map((it) => renderItem(it))}
      </div>
    </div>
  );
};

HeadlessTreeNav.displayName = "HeadlessTreeNav";
export default HeadlessTreeNav;
