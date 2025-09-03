import React, { useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../design-system/vercel-ui/layout/TopBar";
import PrimaryNav, {
  type PrimaryNavItem,
} from "../../design-system/vercel-ui/navigation/PrimaryNav";

/**
 * AppHeader (FSD: widgets 레벨)
 *
 * - design-system(vercel-ui)의 TopBar + PrimaryNav 를 조합한 상단 전역 헤더
 * - 라우터(react-router-dom)와 결합하여 현재 경로 기반 활성 탭 처리
 * - 도메인/비즈니스 기능(프로젝트 전환, 사용자 메뉴, 알림 등)은
 *   추후 features/* 컴포넌트로 교체 가능한 placeholder 형태로 유지
 *
 * 책임(Scope):
 * - 전역 네비게이션 항목 정의 (간단 config)
 * - 현재 URL → active nav 매핑
 * - onSelect 시 라우터 이동
 *
 * 비책임(Out of Scope):
 * - 실제 사용자 정보/프로젝트 데이터 fetch
 * - 접근 권한별 필터링 (필요 시 shared/config/nav.ts 로 이동)
 * - 다국어 처리 (추후 i18n Provider 도입 후 label 국제화)
 *
 * 확장 아이디어:
 * - navItems 를 외부 props 로 주입하여 동적 구성
 * - role 기반 필터 혹은 실험 플래그(feature flag) 적용
 * - 우측 영역: ThemeToggle / Notifications / UserMenu 등 feature 삽입
 */

/* ---------------------------------- */
/* Nav 항목 정의 (임시, 추후 분리 가능) */
/* ---------------------------------- */

/**
 * NOTE:
 *  - path 는 react-router-dom 에서 사용하는 라우트 경로
 *  - id 는 PrimaryNavItem.id 와 1:1 매핑
 *  - requiredRole, icon 등 메타 필드가 필요해지면 확장
 */
const NAV_ITEMS: PrimaryNavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
];

/* 경로 → 활성 nav id 매핑 유틸 (간단 규칙 기반) */
function deriveActiveId(pathname: string): string {
  if (pathname.startsWith("/about")) return "about";
  return "home";
}

/* ---------------------------------- */
/* Placeholder (우측 기능들 임시구현)   */
/* ---------------------------------- */

/**
 * ThemeTogglePlaceholder
 * - 실제 다크모드 구현 전까지 자리표시자
 * - 추후 features/theme-toggle 로 이동
 */
function ThemeTogglePlaceholder() {
  return (
    <button
      type="button"
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
      aria-label="테마 전환 (미구현)"
    >
      Theme
    </button>
  );
}

/**
 * UserMenuPlaceholder
 * - 추후 features/account-menu 로 교체
 */
function UserMenuPlaceholder() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-[10px] font-semibold flex items-center justify-center text-white">
        U
      </span>
      <span className="hidden text-xs text-gray-600 sm:inline">
        user@example.com
      </span>
    </div>
  );
}

/* ---------------------------------- */
/* AppHeader 컴포넌트                  */
/* ---------------------------------- */

export interface AppHeaderProps {
  /**
   * 외부에서 활성 항목을 강제로 지정하고 싶은 경우
   * (없으면 location.pathname 기반 자동 계산)
   */
  activeIdOverride?: string;
  /**
   * 네비게이션 항목 교체 (기본값 NAV_ITEMS)
   * - 페이지/권한/실험 플래그에 따라 동적 생성 가능
   */
  navItems?: PrimaryNavItem[];
  /**
   * 커스텀 항목 선택 처리 (라우터 이동 외 추가 동작)
   * - return false 를 하면 기본 라우트 이동을 막을 수 있음
   */
  onItemSelect?(
    item: PrimaryNavItem,
    event: React.MouseEvent | React.KeyboardEvent,
  ): boolean | void;
  /**
   * 헤더 좌측 로고/프로젝트 스위처 자리에 커스텀 요소 삽입
   */
  leftSlot?: React.ReactNode;
  /**
   * 헤더 우측 기능 영역 커스터마이즈
   * (전달되면 기본 placeholder 들을 대체)
   */
  rightSlot?: React.ReactNode;
  /**
   * TopBar 추가 클래스
   */
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeIdOverride,
  navItems = NAV_ITEMS,
  onItemSelect,
  leftSlot,
  rightSlot,
  className,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  /* 현재 경로 기반 활성 id (외부 override 우선) */
  const activeId = activeIdOverride ?? deriveActiveId(location.pathname);

  /* 선택 시 라우팅 */
  const handleSelect = useCallback(
    (
      item: PrimaryNavItem,
      e: React.MouseEvent | React.KeyboardEvent,
    ): void => {
      const result = onItemSelect?.(item, e);
      if (result === false) return; // 외부에서 기본 이동 차단
      switch (item.id) {
        case "about":
          navigate("/about");
          break;
        case "home":
        default:
          navigate("/");
          break;
      }
    },
    [navigate, onItemSelect],
  );

  /* center: PrimaryNav 구성 */
  const center = useMemo(
    () => (
      <PrimaryNav
        items={navItems}
        activeId={activeId}
        onSelect={handleSelect}
        variant="underline"
        size="md"
      />
    ),
    [navItems, activeId, handleSelect],
  );

  /* 우측 영역 (커스텀 없으면 placeholder) */
  const right = useMemo(
    () =>
      rightSlot || (
        <div className="flex items-center gap-2">
          <ThemeTogglePlaceholder />
          <UserMenuPlaceholder />
        </div>
      ),
    [rightSlot],
  );

  /* 좌측 (로고 + 외부 slot 혼합) */
  const left = useMemo(
    () => (
      <div className="flex items-center gap-3">
        <Logo />
        {leftSlot}
      </div>
    ),
    [leftSlot],
  );

  return (
    <TopBar
      left={left}
      center={center}
      right={right}
      translucent
      border
      shadow={false}
      className={className}
    />
  );
};

/**
 * 간단한 로고 컴포넌트 — 추후 design-system primitives 로 이동 가능
 */
function Logo() {
  return (
    <span className="text-sm font-bold tracking-tight text-indigo-600 select-none">
      SuperUI
    </span>
  );
}

export default AppHeader;
