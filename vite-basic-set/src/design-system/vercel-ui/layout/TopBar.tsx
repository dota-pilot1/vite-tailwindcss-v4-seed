import type React from "react";

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
