import { useLocation, useNavigate } from "react-router-dom";
import { HeadlessTreeNav } from "./HeadlessTreeNav";
import DepthToolbar from "../../../shared/ui/DepthToolbar";
import { ORG_TREE } from "../data";
import { deriveActiveId } from "../lib";
import { useSidebarState } from "../model";

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

  const activeId = deriveActiveId(ORG_TREE, location.pathname);
  const { selectedDepth, apiRef, collapseAll, expandDepth } = useSidebarState();

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
        <DepthToolbar
          onCollapseAll={collapseAll}
          onExpandDepth={expandDepth}
          currentDepth={selectedDepth}
          maxDepth={3}
        />
      </div>
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

SidebarContainer.displayName = "SidebarContainer";
export default SidebarContainer;
