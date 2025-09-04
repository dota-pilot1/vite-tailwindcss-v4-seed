import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeadlessTreeNav, {
  type HeadlessTreeNode,
} from "../../design-system/headless-style/HeadlessTreeNav";

/**
 * SidebarWithHeadless
 *
 * headless-tree 기반 조직/메뉴 트리 예시 위젯.
 * - 디자인 시스템 컴포넌트(HeadlessTreeNav) 래핑
 * - 조직(센터 > 그룹 > 팀 > 개발자) + 페이지 라우트 예시 혼합
 * - node.meta.route 존재 시 클릭 → 라우팅
 *
 * 관리자용 시드 수준: 여기서 복잡 비즈니스(권한/필터/드래그 제약) 미도입.
 * 향후 확장 포인트:
 *  - 검색 고도화 (하이라이트, 폴더 자동 전개)
 *  - 파견/할당 DragZone (본문 별도 영역)
 *  - canMove 규칙(팀/에이전트 이동 제한)
 *  - context menu (Radix ContextMenu 등 결합)
 */

/* 샘플 조직 + 메뉴 데이터 */
const ORG_TREE: HeadlessTreeNode[] = [
  {
    id: "center-seoul",
    name: "서울센터",
    isFolder: true,
    children: [
      {
        id: "group-platform",
        name: "플랫폼그룹",
        isFolder: true,
        children: [
          {
            id: "team-fe-core",
            name: "FE Core 팀",
            isFolder: true,
            children: [
              { id: "dev-a", name: "Dev A" },
              { id: "dev-b", name: "Dev B" },
            ],
          },
          {
            id: "team-fe-app",
            name: "FE App 팀",
            isFolder: true,
            children: [
              { id: "dev-c", name: "Dev C" },
              { id: "dev-d", name: "Dev D" },
            ],
          },
        ],
      },
      {
        id: "group-ops",
        name: "운영그룹",
        isFolder: true,
        children: [
          {
            id: "team-qa",
            name: "QA 팀",
            isFolder: true,
            children: [{ id: "dev-qa1", name: "QA 1" }],
          },
        ],
      },
    ],
  },
  {
    id: "center-busan",
    name: "부산센터",
    isFolder: true,
    children: [
      {
        id: "group-regional",
        name: "리저널그룹",
        isFolder: true,
        children: [
          {
            id: "team-r-fe",
            name: "FE 팀",
            isFolder: true,
            children: [{ id: "dev-e", name: "Dev E" }],
          },
        ],
      },
    ],
  },
  // 라우팅 전용 ‘메뉴’ 섹션 (조직과 구분될 수도 있음)
  {
    id: "section-pages",
    name: "페이지",
    isFolder: true,
    children: [
      {
        id: "page-home",
        name: "홈",
        meta: { route: "/" },
      },
      {
        id: "page-about",
        name: "About",
        meta: { route: "/about" },
      },
    ],
  },
];

/* 현재 pathname 을 기준으로 activeId 계산 (meta.route 매칭) */
function deriveActiveId(
  nodes: HeadlessTreeNode[],
  pathname: string,
): string | undefined {
  const stack: HeadlessTreeNode[] = [...nodes];
  while (stack.length) {
    const n = stack.pop()!;
    // @ts-expect-error(meta 자유 필드)
    const route = n.meta?.route;
    if (route && route === pathname) return n.id;
    if (n.children) stack.push(...n.children);
  }
  return undefined;
}

export interface SidebarWithHeadlessProps {
  width?: number;
  className?: string;
  /**
   * DnD 필요시 true (현재는 내부 reorder 정도만 의미)
   */
  enableDnd?: boolean;
}

/**
 * 메인 사이드바 위젯
 */
export const SidebarWithHeadless: React.FC<SidebarWithHeadlessProps> = ({
  width = 240,
  className,
  enableDnd = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeId = deriveActiveId(ORG_TREE, location.pathname);
  // removed treeKey (remount hack) – programmatic collapse/expand API now used
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);
  const apiRef = useRef<{
    expandToDepth(depth: number): void;
    collapseAll(): void;
  } | null>(null);

  // Toolbar action handlers using HeadlessTreeNav onReady API
  const collapseAll = () => {
    apiRef.current?.collapseAll();
    setSelectedDepth(null);
  };

  const expandDepth = (depth: number) => {
    apiRef.current?.expandToDepth(depth);
    setSelectedDepth(depth);
  };

  /**
   * TreeToolbar
   * - 별도 컴포넌트로 분리하여 손쉽게 기능 on/off 가능
   * - 버튼 구성:
   *   [↺] 전체 닫기 (collapse all)
   *   [1][2][3] 깊이별 펼치기 요청
   *
   * 실제 depth 기반 펼치기는 HeadlessTreeNav 내부 expand API 연동 필요 (TODO)
   */
  interface TreeToolbarProps {
    onCollapseAll: () => void;
    onExpandDepth: (depth: number) => void;
    currentDepth: number | null;
    disabled?: boolean;
  }

  function TreeToolbar({
    onCollapseAll,
    onExpandDepth,
    currentDepth,
    disabled,
  }: TreeToolbarProps) {
    const btnBase =
      "rounded-md border border-gray-400 bg-white/95 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-[11px] px-2 py-1 leading-none text-gray-700 transition-colors";
    const activeCls =
      "bg-indigo-600 text-white hover:bg-indigo-500 border-indigo-600 shadow-sm";
    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          className={`${btnBase} ${currentDepth === null ? activeCls : ""}`}
          onClick={onCollapseAll}
          disabled={disabled}
          title="전체 닫기"
          aria-label="전체 닫기"
        >
          ↺
        </button>
        {[1, 2, 3].map((d) => {
          const isActive = currentDepth === d;
          return (
            <button
              key={d}
              type="button"
              className={`${btnBase} ${isActive ? activeCls : ""}`}
              onClick={() => onExpandDepth(d)}
              disabled={disabled}
              title={`깊이 ${d}까지 펼치기`}
              aria-label={`깊이 ${d}까지 펼치기`}
            >
              {d}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <aside
      className={[
        "flex shrink-0 flex-col border-r border-gray-200 bg-white/70 backdrop-blur-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width }}
      data-widget="SidebarWithHeadless"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
        <span className="text-xs font-semibold tracking-wide text-gray-500">
          ORG / MENU
        </span>
        <TreeToolbar
          onCollapseAll={collapseAll}
          onExpandDepth={expandDepth}
          currentDepth={selectedDepth}
          disabled={false}
        />
      </div>
      {/* key prop removed (no longer remounting for collapse) */}
      <HeadlessTreeNav
        data={ORG_TREE}
        activeId={activeId}
        enableDnd={enableDnd}
        enableHotkeys
        searchable
        height="calc(100vh - 60px)"
        onReady={(api) => {
          apiRef.current = api;
        }}
        onSelect={(node) => {
          // 라우트 있는 항목이면 이동
          // @ts-expect-error(meta 자유 필드)
          if (node.meta?.route) {
            // @ts-expect-error(meta 자유 필드)
            navigate(node.meta.route);
          }
        }}
      />
    </aside>
  );
};

SidebarWithHeadless.displayName = "SidebarWithHeadless";

export default SidebarWithHeadless;
