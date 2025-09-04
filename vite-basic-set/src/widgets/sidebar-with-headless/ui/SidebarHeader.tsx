import DepthToolbar from "../../../shared/ui/DepthToolbar";

export interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  selectedDepth: number;
  onCollapseAll: () => void;
  onExpandDepth: (depth: number) => void;
  maxDepth: number;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  onToggle,
  selectedDepth,
  onCollapseAll,
  onExpandDepth,
  maxDepth,
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
        title={isCollapsed ? "사이드바 열기" : "사이드바 닫기"}
      >
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {!isCollapsed && (
        <>
          <span className="text-xs font-semibold tracking-wide text-gray-500">
            ORG / MENU
          </span>
          <DepthToolbar
            onCollapseAll={onCollapseAll}
            onExpandDepth={onExpandDepth}
            currentDepth={selectedDepth}
            maxDepth={maxDepth}
          />
        </>
      )}
    </div>
  );
};

SidebarHeader.displayName = "SidebarHeader";
