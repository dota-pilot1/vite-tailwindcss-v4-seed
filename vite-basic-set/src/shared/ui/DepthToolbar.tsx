import React from "react";

/**
 * DepthToolbar
 *
 * Shared UI: Reusable depth control toolbar component
 * ------------------------------------------------------------
 * Generic toolbar for tree/hierarchical structures with programmatic expand/collapse controls.
 *
 * Features:
 *  - Collapse All button (↺)
 *  - Configurable depth level buttons (1, 2, 3, 4...)
 *  - Visual feedback for current active depth
 *  - Accessible with proper ARIA labels
 *  - Disabled state support
 *
 * Usage:
 *  <DepthToolbar
 *    currentDepth={selectedDepth}
 *    onCollapseAll={handleCollapseAll}
 *    onExpandDepth={handleExpandDepth}
 *    maxDepth={4}
 *  />
 */

export interface DepthToolbarProps {
  /** Currently selected depth level (null = all collapsed) */
  currentDepth: number | null;
  /** Callback when "collapse all" is triggered */
  onCollapseAll: () => void;
  /** Callback when specific depth level is selected */
  onExpandDepth: (depth: number) => void;
  /** Maximum depth levels to show (default: 4) */
  maxDepth?: number;
  /** Disable all interactions */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom aria-label for the toolbar */
  ariaLabel?: string;
}

export const DepthToolbar: React.FC<DepthToolbarProps> = ({
  currentDepth,
  onCollapseAll,
  onExpandDepth,
  maxDepth = 4,
  disabled = false,
  className,
  ariaLabel = "깊이 제어 툴바",
}) => {
  const btnBase =
    "rounded-md border border-neutral-500 bg-neutral-50 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-500 " +
    "disabled:opacity-40 disabled:cursor-not-allowed text-[11px] px-2 py-[5px] leading-none text-neutral-700 " +
    "font-medium transition-colors focus:outline-none";

  const activeCls =
    "bg-neutral-800 text-white font-semibold border-neutral-700 shadow-sm hover:bg-neutral-700 hover:text-white " +
    "focus:ring-neutral-600";

  const depthLevels = Array.from({ length: maxDepth }, (_, i) => i + 1);

  return (
    <div
      className={`flex items-center gap-1 ${className || ''}`}
      role="toolbar"
      aria-label={ariaLabel}
    >
      {/* Collapse All Button */}
      <button
        type="button"
        className={`${btnBase} ${currentDepth === null ? activeCls : ""}`}
        onClick={onCollapseAll}
        disabled={disabled}
        title="전체 닫기"
        aria-label="전체 닫기"
        aria-pressed={currentDepth === null}
      >
        ↺
      </button>

      {/* Depth Level Buttons */}
      {depthLevels.map((depth) => {
        const isActive = currentDepth === depth;
        return (
          <button
            key={depth}
            type="button"
            className={`${btnBase} ${isActive ? activeCls : ""}`}
            onClick={() => onExpandDepth(depth)}
            disabled={disabled}
            title={`깊이 ${depth}단까지 펼치기`}
            aria-label={`깊이 ${depth}단까지 펼치기`}
            aria-pressed={isActive}
          >
            {depth}
          </button>
        );
      })}
    </div>
  );
};

DepthToolbar.displayName = "DepthToolbar";

export default DepthToolbar;
