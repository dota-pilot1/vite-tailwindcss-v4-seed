import { ORG_TREE } from "../data/orgTree";

export interface CollapsedSidebarProps {
  onExpand: () => void;
}

export const CollapsedSidebar: React.FC<CollapsedSidebarProps> = ({
  onExpand,
}) => {
  return (
    <div className="flex flex-col gap-1 p-2">
      {ORG_TREE.filter(node => node.children && node.children.length > 0).map((node) => (
        <button
          key={node.id}
          onClick={onExpand}
          className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
          title={node.name}
        >
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        </button>
      ))}
    </div>
  );
};

CollapsedSidebar.displayName = "CollapsedSidebar";
