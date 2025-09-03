import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../design-system/vercel-ui/layout/TopBar";
import PrimaryNav, {
  type PrimaryNavItem,
} from "../../design-system/vercel-ui/navigation/PrimaryNav";
import SimpleNav from "../../design-system/simple-style/SimpleNav";

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
  /**
   * simple-style (8bit) 강제 적용 여부
   * true 면 SimpleNav, false 면 기존 vercel 스타일 PrimaryNav
   */
  forceSimpleStyle?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeIdOverride,
  navItems = NAV_ITEMS,
  onItemSelect,
  leftSlot,
  rightSlot,
  className,
  forceSimpleStyle = true, // 기본: 새 simple-style 적용
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  /* 현재 경로 기반 활성 id (외부 override 우선) */
  const activeId = activeIdOverride ?? deriveActiveId(location.pathname);

  /* 선택 시 라우팅 */
  const handleSelect = (
    item: PrimaryNavItem,
    e: React.MouseEvent | React.KeyboardEvent,
  ): void => {
    const result = onItemSelect?.(item, e);
    if (result === false) return;
    switch (item.id) {
      case "about":
        navigate("/about");
        break;
      case "home":
      default:
        navigate("/");
        break;
    }
  };

  /* center: simple-style (8bit) 구성 or 기존 vercel-ui 구성 */
  const center = forceSimpleStyle ? (
    <SimpleNav
      items={navItems.map((n) => ({ id: n.id, label: n.label }))}
      activeId={activeId}
      onSelect={(it) => {
        // SimpleNavItem -> PrimaryNavItem 호환 (id 기반)
        const target = navItems.find((n) => n.id === it.id) || navItems[0];
        handleSelect(target, {} as any);
      }}
      intensity="bold"
      size="md"
    />
  ) : (
    <PrimaryNav
      items={navItems}
      activeId={activeId}
      onSelect={handleSelect}
      variant="underline"
      size="md"
    />
  );

  /* 우측 영역 (커스텀 없으면 placeholder) */
  const right = rightSlot || (
    <div className="flex items-center gap-2">
      <ThemeTogglePlaceholder />
      <UserMenuPlaceholder />
    </div>
  );

  /* 좌측 (로고 + 외부 slot 혼합) */
  const left = (
    <div className="flex items-center gap-3">
      <Logo />
      {leftSlot}
    </div>
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
