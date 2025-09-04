import { useState, useRef } from "react";

/**
 * 사이드바 상태 관리 훅
 * - 선택된 depth 상태
 * - tree API 참조 관리
 */
export function useSidebarState() {
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

  return {
    selectedDepth,
    apiRef,
    collapseAll,
    expandDepth,
  };
}
