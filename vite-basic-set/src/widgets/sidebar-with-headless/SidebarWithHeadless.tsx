import { SidebarContainer } from "./ui/SidebarContainer";

/**
 * SidebarWithHeadless
 *
 * headless-tree 기반 조직/메뉴 트리 예시 위젯.
 * - 디자인 시스템 컴포넌트(HeadlessTreeNav) 래핑
 * - 조직(센터 > 그룹 > 팀 > 개발자) + 페이지 라우트 예시 혼합 (4단계 구조)
 * - node.meta.route 존재 시 클릭 → 라우팅
 *
 * 관리자용 시드 수준: 여기서 복잡 비즈니스(권한/필터/드래그 제약) 미도입.
 * 향후 확장 포인트:
 *  - 검색 고도화 (하이라이트, 폴더 자동 전개)
 *  - 파견/할당 DragZone (본문 별도 영역)
 *  - canMove 규칙(팀/에이전트 이동 제한)
 *  - context menu (Radix ContextMenu 등 결합)
 */

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
export const SidebarWithHeadless: React.FC<SidebarWithHeadlessProps> = (
  props,
) => {
  return <SidebarContainer {...props} />;
};

SidebarWithHeadless.displayName = "SidebarWithHeadless";

export default SidebarWithHeadless;
