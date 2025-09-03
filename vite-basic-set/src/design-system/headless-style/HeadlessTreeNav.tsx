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

  /* Search derivation: matched + ancestors */
  const searchInfo = useMemo(() => {
    if (!query.trim()) {
      return {
        list: tree.getItems().filter((it) => it.getId() !== ROOT_ID),
        matched: new Set<string>(),
        ancestors: new Set<string>(),
        descendants: new Set<string>(),
      };
    }
    const q = query.toLowerCase();
    const items = tree.getItems();
    const matched = new Set<string>();
    const ancestors = new Set<string>();
    const descendants = new Set<string>();

    const getParentId = (it: any) => it.getItemMeta().parentId;

    items.forEach((it) => {
      if (it.getId() === ROOT_ID) return;
      const name = it.getItemData()?.name?.toLowerCase() || "";
      if (name.includes(q)) {
        matched.add(it.getId());
        // collect ancestors
        let p = getParentId(it);
        while (p && p !== ROOT_ID) {
          ancestors.add(p);
          const parent = tree.getItemInstance(p);
          p = parent.getItemMeta().parentId;
        }
      }
    });

    // collect descendants (recursive) of each matched item
    const collectDesc = (id: string) => {
      const childIds = childrenMap[id] || [];
      for (const cid of childIds) {
        if (!descendants.has(cid)) {
          descendants.add(cid);
          collectDesc(cid);
        }
      }
    };
    matched.forEach((id) => collectDesc(id));

    // list preserves original order; include matched + ancestors + descendants
    const list = items.filter((it) => {
      const id = it.getId();
      if (id === ROOT_ID) return false;
      return matched.has(id) || ancestors.has(id) || descendants.has(id);
    });

    return { list, matched, ancestors, descendants };
  }, [query, tree, childrenMap]);

  /* Auto expand ancestors + matched so descendants become visible */
  const expandedAppliedRef = useRef<string>("");
  useEffect(() => {
    if (!query.trim()) return;
    const signature = [
      ...Array.from(searchInfo.ancestors).sort(),
      "|",
      ...Array.from(searchInfo.matched).sort(),
    ].join("");
    if (expandedAppliedRef.current === signature) return;

    const toOpen = new Set<string>([
      ...searchInfo.ancestors,
      ...searchInfo.matched,
    ]);

    toOpen.forEach((id) => {
      try {
        const inst = tree.getItemInstance(id);
        if (!inst.isExpanded()) inst.expand();
      } catch {
        /* ignore */
      }
    });
    expandedAppliedRef.current = signature;
  }, [query, searchInfo.ancestors, searchInfo.matched, tree]);

  const handleItemClick = useCallback(
    (item: any, e: React.MouseEvent) => {
      if (item.getId() === ROOT_ID) return;
      const payload = item.getItemData();
      if (!payload) return;
      onSelect?.(payload, e);
      if (payload.isFolder) {
        item.isExpanded() ? item.collapse() : item.expand();
      }
    },
    [onSelect],
  );

  /* Highlight helper */
  const highlight = useCallback(
    (label: string) => {
      if (!query.trim()) return label;
      const lower = label.toLowerCase();
      const q = query.toLowerCase();
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
    [query],
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
              item.isExpanded() ? item.collapse() : item.expand();
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

  const itemsToRender = query.trim()
    ? searchInfo.list
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
