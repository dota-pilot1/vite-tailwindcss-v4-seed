import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeadlessTreeNav } from "./HeadlessTreeNav";
import { SidebarHeader } from "./SidebarHeader";
import { CollapsedSidebar } from "./CollapsedSidebar";
import { ORG_TREE } from "../data/orgTree";
import { deriveActiveId } from "../lib/activeIdUtils";
import { useSidebarState } from "../model/sidebarState";

export interface SidebarContainerProps {
  width?: number;
  className?: string;
  /**
   * DnD 필요시 true (현재는 내부 reorder 정도만 의미)
   */
  enableDnd?: boolean;
}

/**
 * 사이드바 컨테이너 UI 컴포넌트
 */
export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  width = 240,
  className,
  enableDnd = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const activeId = deriveActiveId(ORG_TREE, location.pathname);
  const { selectedDepth, apiRef, collapseAll, expandDepth } = useSidebarState();

  return (
    <aside
      className={[
        "flex shrink-0 flex-col border-r border-gray-200 bg-white/70 backdrop-blur-sm transition-all duration-300",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: isCollapsed ? 48 : width }}
      data-widget="SidebarWithHeadless"
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        selectedDepth={selectedDepth ?? 0}
        onCollapseAll={collapseAll}
        onExpandDepth={expandDepth}
        maxDepth={3}
      />

      {isCollapsed ? (
        <CollapsedSidebar onExpand={() => setIsCollapsed(false)} />
      ) : (
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
      )}
    </aside>
  );
};

SidebarContainer.displayName = "SidebarContainer";
export default SidebarContainer;
