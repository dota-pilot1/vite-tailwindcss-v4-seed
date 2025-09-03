import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * AppLayout.tsx
 *
 * 전역 레이아웃 위젯 (FSD: widgets 레벨)
 * - 헤더 내비게이션 + 메인 컨테이너
 * - React Router 연동: <Outlet /> 사용
 * - 활성 탭은 현재 URL(location.pathname) 기반 자동 계산
 *
 * 설계 포인트:
 * - children 이 명시되면 children 우선 → 점진적 마이그레이션 용이
 * - children 없으면 라우터 Outlet 렌더
 * - onNavigate 미전달 시 내부에서 useNavigate 활용 (기본 내비게이션)
 *
 * 향후 확장:
 * - 사용자 상태 / 알림 / 다국어 Provider 래핑
 * - 사이드바 / 퀵패널 / 글로벌 모달 포털 slot 추가
 */

/** 지원 탭 ID (필요 시 enum/분리 가능) */
export type PageId = "home" | "about";

/** 헤더 메뉴 항목 구조 */
interface NavItem {
  id: PageId;
  label: string;
  to: string;
  end?: boolean; // 홈 경로 구분용 (index 매칭)
}

/** 내비게이션 항목 정의 (라우트 매핑) */
const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", to: "/", end: true },
  { id: "about", label: "About", to: "/about" },
];

/**
 * URL → PageId 매핑 유틸 (간단 규칙 기반)
 * 필요 시 정교한 패턴 매칭 or 라우트 메타데이터 적용
 */
function deriveActiveFromPath(pathname: string): PageId {
  if (pathname.startsWith("/about")) return "about";
  return "home";
}

/**
 * HeaderMenu Props
 * - current: 현재 활성 탭 (외부 강제 지정 가능)
 * - onNavigate: 사용자 클릭 시 호출 (라우터 내비게이션 커스터마이즈 용)
 * - rightSlot: 우측 확장 슬롯(유저 메뉴, 설정 등)
 */
export interface HeaderMenuProps {
  current?: PageId;
  onNavigate?(id: PageId): void;
  rightSlot?: ReactNode;
}

/**
 * HeaderMenu
 * - NavLink 로 접근성/활성 상태 aria-current 제공
 * - current 가 주어지면 우선 사용, 없으면 NavLink 의 isActive 로 스타일 결정
 */
export function HeaderMenu({
  current,
  onNavigate,
  rightSlot,
}: HeaderMenuProps) {
  return (
    <header className="flex h-12 items-stretch border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center px-4 text-sm font-semibold tracking-tight text-indigo-600">
        SuperUI
      </div>
      <nav className="flex flex-1 items-center gap-1 px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.end}
            onClick={() => onNavigate?.(item.id)}
            className={({ isActive }) => {
              const active = current ? current === item.id : isActive;
              return [
                "relative rounded-md px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100",
              ].join(" ");
            }}
            aria-label={item.label}
          >
            {({ isActive }) => {
              const active = current ? current === item.id : isActive;
              return (
                <>
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-indigo-300"></span>
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-3 pr-4">{rightSlot}</div>
    </header>
  );
}

/**
 * AppLayout Props
 * - children: 명시 시 해당 컨텐츠 렌더 (점진 마이그레이션용)
 * - active: 외부에서 강제 활성 탭 지정 (선택)
 * - onNavigate: 커스텀 내비게이션 로직 주입
 * - rightSlot: 헤더 우측 slot
 */
export interface AppLayoutProps {
  children?: ReactNode;
  active?: PageId;
  onNavigate?(id: PageId): void;
  rightSlot?: ReactNode;
}

/**
 * AppLayout
 * - location 기반 활성 탭 계산 (active prop 우선)
 * - children 없을 경우 <Outlet /> 로 라우트 콘텐츠 표시
 */
export function AppLayout({
  children,
  active,
  onNavigate,
  rightSlot,
}: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const derivedActive = active ?? deriveActiveFromPath(location.pathname);

  const handleNavigate = (id: PageId) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    // 기본 내비게이션 처리
    switch (id) {
      case "about":
        navigate("/about");
        break;
      case "home":
      default:
        navigate("/");
        break;
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <HeaderMenu
        current={derivedActive}
        onNavigate={handleNavigate}
        rightSlot={rightSlot}
      />
      <main
        className="flex-1 overflow-auto bg-gradient-to-b from-white to-gray-50 p-6"
        role="main"
      >
        {children ?? <Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
