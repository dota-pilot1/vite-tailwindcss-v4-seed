import React from "react";

/**
 * TopBar (Design System - vercel-ui)
 *
 * 앱 전역에서 재사용 가능한 상단 바 레이아웃 컴포넌트.
 * - 도메인 / 비즈니스 로직 / 라우터 의존 없음 (슬롯 기반 구조)
 * - left / center / right 세 영역을 받아 정렬
 * - 시각 옵션(테두리, 그림자, 투명도, sticky) 토글 가능
 *
 * 사용 예:
 * <TopBar
 *   left={<Logo />}
 *   center={<PrimaryNav />}
 *   right={<UserMenu />}
 *   shadow
 *   translucent
 * />
 *
 * 접근성:
 * - role="banner" 로 문서 내 전역 헤더 랜드마크 지정
 * - 실제 내비게이션은 center 슬롯 내부에서 <nav>를 구성 (TopBar는 레이아웃만 책임)
 *
 * 확장 포인트:
 * - 반응형 숨김/노출은 외부에서 Tailwind 조건 클래스 전달
 * - 다크 모드 전환 시 색상 토큰(tw class)만 바꾸면 됨
 * - maxWidth 로 내부 컨텐츠 중앙 정렬(container 패턴) 가능
 */

export interface TopBarProps {
  /** 좌측 영역 (로고, 프로젝트 선택 등) */
  left?: React.ReactNode;
  /** 중앙 영역 (탭/내비게이션/검색창 등) */
  center?: React.ReactNode;
  /** 우측 영역 (알림, 사용자 메뉴, 테마 토글 등) */
  right?: React.ReactNode;
  /** 고정 높이(px). 기본 56 */
  height?: number;
  /** 상단 sticky 적용 여부 (기본 true) */
  sticky?: boolean;
  /** 하단 테두리 표시 여부 (기본 true) */
  border?: boolean;
  /** 그림자 표시 여부 */
  shadow?: boolean;
  /** 반투명 & 블러 처리 (macOS / vercel 느낌) */
  translucent?: boolean;
  /** 내부 컨텐츠 최대 폭 (예: 1440, '1280px', '80rem') */
  maxWidth?: number | string;
  /** 외곽 header 추가 클래스 */
  className?: string;
  /** 내부 컨텐츠 래퍼 추가 클래스 */
  containerClassName?: string;
}

/* 간단한 className 병합 (Tailwind 충돌 정교 merge가 필요하면 프로젝트 cn 유틸 교체) */
function cx(...parts: (string | undefined | false | null)[]) {
  return parts.filter(Boolean).join(" ");
}

export const TopBar: React.FC<TopBarProps> = ({
  left,
  center,
  right,
  height = 56,
  sticky = true,
  border = true,
  shadow,
  translucent,
  maxWidth,
  className,
  containerClassName,
}) => {
  const style: React.CSSProperties = { height };
  return (
    <header
      role="banner"
      style={style}
      className={cx(
        "flex w-full items-center",
        "px-4 gap-4",
        // 배경 / 투명도 옵션
        translucent
          ? "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60"
          : "bg-white",
        // 경계선 / 그림자
        border && "border-b border-gray-200",
        shadow && "shadow-sm",
        // 고정
        sticky && "sticky top-0 z-40",
        "print:hidden", // 인쇄시 숨김 (보통 헤더 불필요)
        className,
      )}
      data-component="TopBar"
    >
      <div
        className={cx(
          "flex w-full items-center gap-4 mx-auto",
          maxWidth ? "max-w-full" : undefined, // maxWidth 적용시 overflow 방지
          containerClassName,
        )}
        style={
          maxWidth
            ? {
                maxWidth:
                  typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
              }
            : undefined
        }
        data-slot="container"
      >
        {/* Left */}
        <div
          className="flex min-w-[140px] items-center gap-2 shrink-0"
          data-slot="left"
        >
          {left}
        </div>

        {/* Center */}
        <div
          className="flex flex-1 items-center justify-center min-w-0"
          data-slot="center"
        >
          {center}
        </div>

        {/* Right */}
        <div
          className="flex min-w-[160px] items-center justify-end gap-2 shrink-0"
          data-slot="right"
        >
          {right}
        </div>
      </div>
    </header>
  );
};

TopBar.displayName = "TopBar";

export default TopBar;
