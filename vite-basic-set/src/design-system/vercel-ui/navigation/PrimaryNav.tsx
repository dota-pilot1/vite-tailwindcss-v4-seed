import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * PrimaryNav (Design System - vercel-ui)
 *
 * 수평 탭/주요 내비게이션 컴포넌트 (도메인 비의존).
 * - Router / 상태 관리 라이브러리 미의존 (상위에서 active 제어)
 * - 키보드 탐색 지원: ← / → , Home / End
 * - onSelect 콜백으로 상위 라우팅 / 상태 전환 처리
 *
 * 구성 철학:
 * - design-system 레벨 → “표현 + 상호작용 패턴” 만 제공
 * - 실제 경로 이동(react-router, next/link 등)은 상위에서 감싼 anchor / Link 활용
 *   (renderItem 속성으로 커스터마이징 가능)
 *
 * 접근성:
 * - role="navigation" 래퍼 + role="tablist"/"tab" 패턴 유사 구조
 * - aria-current="page" 로 현재 활성 항목 표시
 * - disabled 항목은 tabIndex=-1 + aria-disabled 적용
 *
 * 확장 아이디어(필요 시):
 * - overflow 발생 시 좌우 스크롤 버튼 (ScrollShadow)
 * - variant 추가 (underline / pill / ghost 등)
 * - 아이콘만 탭인 경우 title + aria-label 처리
 */

/* 간단한 className merge (tailwind-merge 미사용 최소 구현) */
function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** 내비게이션 항목 정의 */
export interface PrimaryNavItem {
  id: string;
  label: string;
  href?: string; // 외부 링크 / anchor 용 (선택)
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  title?: string; // 아이콘 전용일 때 시각적 보조 텍스트
  meta?: unknown; // 상위 사용처 확장을 위한 자유 필드
}

/** 스타일/표현 관련 옵션 */
export interface PrimaryNavStyleOptions {
  size?: "sm" | "md";
  variant?: "solid" | "underline" | "ghost";
  rounded?: boolean;
  fullWidth?: boolean;
}

/** 렌더 커스터마이징 함수 타입 */
export type PrimaryNavRenderItem = (params: {
  item: PrimaryNavItem;
  active: boolean;
  focusable: boolean;
  props: {
    onClick: (e: React.MouseEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    tabIndex: number;
    role: string;
    "aria-current"?: "page";
    "aria-disabled"?: boolean;
    className: string;
    href?: string;
  };
}) => React.ReactNode;

export interface PrimaryNavProps extends PrimaryNavStyleOptions {
  items: PrimaryNavItem[];
  /** 외부에서 현재 활성 항목 id 전달 */
  activeId?: string;
  /** activeId 대신 커스텀 매칭 로직 사용 시 */
  isActive?(item: PrimaryNavItem, index: number): boolean;
  /** 선택(클릭/Enter/Space) 시 호출 */
  onSelect?(
    item: PrimaryNavItem,
    event: React.MouseEvent | React.KeyboardEvent,
  ): void;
  /** 커스텀 렌더 (anchor / Link 등 주입) */
  renderItem?: PrimaryNavRenderItem;
  /** aria-label 또는 heading과 연결 (필수는 아니나 권장) */
  "aria-label"?: string;
  className?: string;
  /** 비활성 항목 focus 제외 (기본 true) */
  skipDisabled?: boolean;
}

/**
 * 기본 스타일 변환
 */
function baseItemClasses(
  options: Required<
    Pick<PrimaryNavStyleOptions, "size" | "variant" | "rounded">
  >,
  active: boolean,
  disabled: boolean,
) {
  const sizeCls =
    options.size === "sm" ? "h-8 px-3 text-[12px]" : "h-9 px-3.5 text-xs";
  const roundCls = options.rounded ? "rounded-md" : "rounded";
  const common =
    "inline-flex items-center gap-1 font-medium select-none whitespace-nowrap transition outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
  const state = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const variantMap: Record<string, string> = {
    solid: active
      ? "bg-indigo-600 text-white shadow-sm"
      : "text-gray-600 hover:bg-gray-100",
    underline: cx(
      active
        ? "text-indigo-600"
        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50",
      "relative",
      active &&
        "after:absolute after:inset-x-2 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-indigo-500",
    ),
    ghost: active
      ? "bg-gray-100 text-gray-800"
      : "text-gray-600 hover:bg-gray-100",
  };
  return cx(common, sizeCls, roundCls, state, variantMap[options.variant]);
}

export const PrimaryNav: React.FC<PrimaryNavProps> = ({
  items,
  activeId,
  isActive,
  onSelect,
  renderItem,
  size = "md",
  variant = "underline",
  rounded = true,
  fullWidth,
  className,
  skipDisabled = true,
  "aria-label": ariaLabel = "주요 내비게이션",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState<number>(() => {
    const initial = items.findIndex((it, idx) =>
      isActive ? isActive(it, idx) : it.id === activeId,
    );
    return initial >= 0 ? initial : 0;
  });

  /** 포커스 가능한 인덱스 목록 계산 */
  const enabledIndexes = items
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => !(skipDisabled && it.disabled))
    .map(({ i }) => i);

  /** 키보드 핸들러 */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIdx: number) => {
      if (
        !["ArrowRight", "ArrowLeft", "Home", "End", "Enter", " "].includes(
          e.key,
        )
      )
        return;
      e.preventDefault();

      const currentPos = enabledIndexes.indexOf(currentIdx);
      if (currentPos === -1) return;

      const moveFocus = (targetPos: number) => {
        const actualIdx = enabledIndexes[targetPos];
        if (actualIdx != null) {
          setFocusIndex(actualIdx);
          itemRefs.current[actualIdx]?.focus();
        }
      };

      switch (e.key) {
        case "ArrowRight": {
          const next = (currentPos + 1) % enabledIndexes.length;
          moveFocus(next);
          break;
        }
        case "ArrowLeft": {
          const prev =
            (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length;
          moveFocus(prev);
          break;
        }
        case "Home":
          moveFocus(0);
          break;
        case "End":
          moveFocus(enabledIndexes.length - 1);
          break;
        case "Enter":
        case " ":
          onSelect?.(items[currentIdx], e);
          break;
      }
    },
    [enabledIndexes, items, onSelect],
  );

  /** 외부 activeId 변경 시 포커스 재조정(선택적) */
  useEffect(() => {
    if (!activeId) return;
    const idx = items.findIndex((it) => it.id === activeId);
    if (idx >= 0) setFocusIndex(idx);
  }, [activeId, items]);

  const styleOpts = { size, variant, rounded };

  return (
    <div
      ref={containerRef}
      role="navigation"
      aria-label={ariaLabel}
      className={cx(
        "flex items-center",
        fullWidth && "w-full",
        "select-none",
        className,
      )}
      data-component="PrimaryNav"
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cx(
          "flex items-center gap-1",
          fullWidth && "flex-1 justify-center",
        )}
      >
        {items.map((item, idx) => {
          const active = isActive
            ? isActive(item, idx)
            : activeId
              ? item.id === activeId
              : false;

          const disabled = !!item.disabled;
          const focusable = idx === focusIndex && !disabled;

          const commonProps = {
            onClick: (e: React.MouseEvent) => {
              if (disabled) return;
              onSelect?.(item, e);
            },
            onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, idx),
            tabIndex: focusable ? 0 : -1,
            role: "tab",
            "aria-current": active ? ("page" as const) : undefined,
            "aria-disabled": disabled || undefined,
            className: baseItemClasses(styleOpts, active, disabled),
            href: item.href,
          };

          if (renderItem) {
            return (
              <React.Fragment key={item.id}>
                {renderItem({
                  item,
                  active,
                  focusable,
                  props: commonProps,
                })}
              </React.Fragment>
            );
          }

          // 기본 렌더: button (href 있으면 role 유지, 상위에서 <a> 감싸고 싶으면 renderItem 활용)
          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              {...commonProps}
              title={item.title || item.label}
              data-active={active ? "true" : "false"}
              data-disabled={disabled ? "true" : "false"}
            >
              {item.icon && (
                <span className="flex h-4 w-4 items-center justify-center text-[13px]">
                  {item.icon}
                </span>
              )}
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-1 inline-flex items-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

PrimaryNav.displayName = "PrimaryNav";

export default PrimaryNav;
