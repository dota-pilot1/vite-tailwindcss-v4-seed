import React, { useMemo, useState, useCallback } from "react";
import {
  useTree,
  // TreeInstance removed
  // ItemInstance removed
} from "@headless-tree/react";
import {
  syncDataLoaderFeature,
  dragAndDropFeature,
  hotkeysCoreFeature,
} from "@headless-tree/core";

/**
 * HeadlessTreeNav
 *
 * - headless-tree 기반 최소/확장가능 트리 내비게이션 래퍼
 * - 디자인 시스템에서 DOM / 스타일 완전 통제
 * - 현재: 동기 데이터 / 기본 확장 / 선택 / (옵션) Drag & Drop / (옵션) Hotkeys / 간단 검색
 *
 * NOTE:
 * - 실제 DnD 후 처리(onMove) / 이동 제약(canMove) / 외부 DropZone 연동은 향후 어댑터 훅으로 분리 권장
 * - dragAndDropFeature 의 세부 hook 은 추후 프로젝트 요구 따라 확장
 */

/* ---------------------------------- */
/* Public Types                       */
/* ---------------------------------- */

export interface HeadlessTreeNode {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: HeadlessTreeNode[];
  disabled?: boolean;
  meta?: unknown;
}

export interface HeadlessTreeNavProps {
  data: HeadlessTreeNode[]; // 루트 여러 개 허용 → 내부에서 synthetic root 구성
  activeId?: string;
  className?: string;
  height?: number | string;
  enableDnd?: boolean;
  enableHotkeys?: boolean;
  searchable?: boolean;
  /**
   * 항목 선택 (leaf/folder 모두)
   */
  onSelect?(
    node: HeadlessTreeNode,
    e: React.MouseEvent | React.KeyboardEvent,
  ): void;
  /**
   * (선택) DnD 이후 처리 (기본 dragAndDropFeature 내부 로직 확장 시)
   * position 은 단순화(inside/before/after) – 향후 실제 tree 인덱스 계산 로직 추가
   */
  onMove?(info: {
    dragId: string;
    targetId: string;
    position: "before" | "after" | "inside";
  }): void;
}

/* ---------------------------------- */
/* Internal: Normalize Data           */
/* ---------------------------------- */

/**
 * 주어진 중첩 data 를 id→node 맵 + children id 배열 구조로 변환
 * headless-tree syncDataLoaderFeature 요구 형식 대응
 */
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

  for (const r of roots) visit(r);

  return { map, childrenMap };
}

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

export const HeadlessTreeNav: React.FC<HeadlessTreeNavProps> = ({
  data,
  activeId,
  className,
  height = 400,
  enableDnd = false,
  enableHotkeys = true,
  searchable = true,
  onSelect,
  onMove,
}) => {
  const [query, setQuery] = useState("");

  /**
   * rootItemId 로 사용할 synthetic root.
   * 내부 아이디 충돌을 피하기 위해 고정 문자열 사용 (실제 data 와 겹치지 않도록).
   */
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

  /**
   * tree 인스턴스 생성
   * - getItemName / isItemFolder : node payload 기반
   * - dataLoader: map/childrenMap 참조
   */
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
          ? {
              id: ROOT_ID,
              name: "ROOT",
              isFolder: true,
              children: data,
            }
          : map[itemId],
      getChildren: (itemId) =>
        itemId === ROOT_ID ? data.map((n) => n.id) : childrenMap[itemId] || [],
    },
    features,
  });

  /* ---------------------------------- */
  /* Selection / Events                 */
  /* ---------------------------------- */

  const handleItemClick = useCallback(
    (item: any, e: React.MouseEvent) => {
      if (item.getId() === ROOT_ID) return;
      const payload = item.getItemData();
      if (!payload) return;
      onSelect?.(payload, e);
      // 폴더이면 기본: 토글
      if (payload.isFolder) {
        if (item.isExpanded()) item.collapse();
        else item.expand();
      }
    },
    [onSelect],
  );

  /* ---------------------------------- */
  /* Filtering (간단 검색)              */
  /* ---------------------------------- */
  const flatItems = tree.getItems();

  const filtered = useMemo(() => {
    if (!query.trim()) return flatItems;
    const q = query.toLowerCase();
    return flatItems.filter((it) => {
      if (it.getId() === ROOT_ID) return false;
      const name = it.getItemData()?.name?.toLowerCase() || "";
      return name.includes(q);
    });
  }, [flatItems, query]);

  /* ---------------------------------- */
  /* Render Helpers                     */
  /* ---------------------------------- */

  function renderItem(item: any) {
    if (item.getId() === ROOT_ID) return null;

    const meta = item.getItemMeta(); // level, index 등
    const payload = item.getItemData();
    if (!payload) return null;

    // 루트 바로 아래 level 이 1 이므로 시각적 들여쓰기는 (level - 1)
    // meta.level: synthetic root = -1, 첫 실노드 = 0 → 그대로 사용
    const visualLevel = meta.level < 0 ? 0 : meta.level;
    // Indentation: base 12px + 18px per level (센터/그룹/팀 깊이 명확 구분)
    const indent = 12 + visualLevel * 18;

    const active = activeId === item.getId();
    const isFolder = payload.isFolder;
    const disabled = payload.disabled;

    return (
      <div
        key={item.getId()}
        {...item.getProps()} // 접근성/키보드 필수 props
        data-id={item.getId()}
        data-folder={isFolder ? "true" : "false"}
        onClick={(e) => handleItemClick(item, e)}
        className={[
          "group flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 text-sm outline-none",
          disabled && "opacity-50 cursor-not-allowed",
          active
            ? "bg-gray-100 text-gray-900 font-medium"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "focus-visible:ring-2 focus-visible:ring-gray-300",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ paddingLeft: indent }}
        aria-current={active ? "true" : undefined}
      >
        {/* 폴더 토글 아이콘 (간단) */}
        {isFolder && (
          <span
            className={[
              "transition-transform text-[10px]",
              item.isExpanded() ? "rotate-90" : "",
            ].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              if (item.isExpanded()) item.collapse();
              else item.expand();
            }}
          >
            ▶
          </span>
        )}
        {!isFolder && <span className="w-3" />}
        <span className="truncate">{payload.name}</span>
      </div>
    );
  }

  /* ---------------------------------- */
  /* DnD 확장 참고 (기본 골격 주석)    */
  /* ---------------------------------- */
  /**
   * dragAndDropFeature 사용 시:
   * - headless-tree 쪽 문서에서 제공하는 ItemInstance 메서드나 drag context accessor 로 추가 제약 가능
   * - onMove 콜백을 tree 인스턴스 훅 / feature override 로 주입 (향후 필요 시 어댑터화)
   *
   * 이 초기 버전에서는 사용자 직관적 reorder 정도(라이브러리 기본 기능)에 맡기고
   * 세밀한 canMove 제약/외부 DropZone 은 후속 확장.
   */

  /* ---------------------------------- */
  /* Layout / Container                 */
  /* ---------------------------------- */
  const inlineHeight =
    typeof height === "number" ? `${height}px` : height || "400px";

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
        {(query ? filtered : flatItems)
          .filter((it) => it.getId() !== ROOT_ID)
          .map((it) => renderItem(it))}
      </div>
    </div>
  );
};

HeadlessTreeNav.displayName = "HeadlessTreeNav";

export default HeadlessTreeNav;
