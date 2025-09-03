import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * SimpleNav (modern minimal / modern-seek)
 *
 * 극단적 미니멀 & 모던 시크 스타일:
 * - 필요 최소 요소, 과한 색/그림자/레트로 효과 제거
 * - 활성 항목: 은은한 배경 + 낮은 대비 점선(dashed) 윤곽선
 * - 비활성: 투명 → hover 시 소프트 톤 표시
 * - router 비의존 (상위 activeId / onSelect)
 * - 키보드: ← → Home End Enter Space
 *
 * 접근성:
 * - role="navigation" + role="tab" 유사 패턴
 * - aria-current="page" 로 활성 전달
 *
 * 디자인 메모:
 * - 픽셀/8bit 효과 제거 → 깔끔/여백/미세 대비 중심
 * - dashed border 는 한 톤 낮은 gray 사용 (촌스러움 회피)
 * - focus-visible 시 ring + dashed outline 재사용
 */

function cx(...parts: (string | null | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export interface SimpleNavItem {
  id: string;
  label: string;
  disabled?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

export interface SimpleNavProps {
  items: SimpleNavItem[];
  activeId?: string;
  onSelect?(
    item: SimpleNavItem,
    ev: React.MouseEvent | React.KeyboardEvent,
  ): void;
  className?: string;
  /**
   * 픽셀풍 강도: none (기본) | bold
   * bold 는 더 강한 배경/색 대비
   */
  intensity?: "none" | "bold";
  /**
   * compact 모드: 수직 높이 축소
   */
  size?: "sm" | "md";
  /**
   * 전체 폭 채우기
   */
  fullWidth?: boolean;
  "aria-label"?: string;
  /**
   * 비활성 항목 Tab 순회 제외 (기본 true)
   */
  skipDisabled?: boolean;
}

/**
 * 항목 기본 클래스 생성
 */
function itemClasses(
  active: boolean,
  disabled: boolean,
  {
    intensity,
    size,
  }: {
    intensity: NonNullable<SimpleNavProps["intensity"]>;
    size: NonNullable<SimpleNavProps["size"]>;
  },
) {
  const base =
    "relative inline-flex items-center justify-center select-none font-medium tracking-tight transition-colors outline-none rounded-sm";
  const sizing =
    size === "sm"
      ? "h-8 px-3 text-[11px] leading-none"
      : "h-9 px-4 text-[12px] leading-none";
  // intensity 는 글자 대비만 약간 조정
  const paletteBase = intensity === "bold" ? "text-gray-800" : "text-gray-600";
  const hoverable = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer hover:bg-gray-50 hover:text-gray-800";
  const activeStyle = active
    ? cx("bg-gray-50 text-gray-900", "border border-gray-400 border-dashed")
    : cx("border border-transparent");
  const focusVisible =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:border-gray-400 focus-visible:border-dashed";
  return cx(
    base,
    sizing,
    "bg-transparent",
    paletteBase,
    hoverable,
    activeStyle,
    focusVisible,
  );
}

/**
 * SimpleNav
 */
export const SimpleNav: React.FC<SimpleNavProps> = ({
  items,
  activeId,
  onSelect,
  className,
  intensity = "none",
  size = "md",
  fullWidth,
  "aria-label": ariaLabel = "Simple navigation",
  skipDisabled = true,
}) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState(() => {
    if (!activeId) return 0;
    const idx = items.findIndex((i) => i.id === activeId);
    return idx >= 0 ? idx : 0;
  });

  const enabledIndexes = items
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => !(skipDisabled && it.disabled))
    .map(({ i }) => i);

  useEffect(() => {
    if (!activeId) return;
    const idx = items.findIndex((i) => i.id === activeId);
    if (idx >= 0) setFocusIndex(idx);
  }, [activeId, items]);

  const moveFocus = useCallback(
    (targetPos: number) => {
      const actualIdx = enabledIndexes[targetPos];
      if (actualIdx != null) {
        setFocusIndex(actualIdx);
        itemRefs.current[actualIdx]?.focus();
      }
    },
    [enabledIndexes],
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (
        !["ArrowRight", "ArrowLeft", "Home", "End", "Enter", " "].includes(
          e.key,
        )
      )
        return;
      e.preventDefault();

      const currentPos = enabledIndexes.indexOf(idx);
      if (currentPos === -1) return;

      switch (e.key) {
        case "ArrowRight":
          moveFocus((currentPos + 1) % enabledIndexes.length);
          break;
        case "ArrowLeft":
          moveFocus(
            (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length,
          );
          break;
        case "Home":
          moveFocus(0);
          break;
        case "End":
          moveFocus(enabledIndexes.length - 1);
          break;
        case "Enter":
        case " ":
          if (!items[idx].disabled) onSelect?.(items[idx], e);
          break;
      }
    },
    [enabledIndexes, items, moveFocus, onSelect],
  );

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cx(
        "inline-flex items-center rounded-md",
        fullWidth && "w-full",
        "bg-white/70 backdrop-blur-sm",
        "px-2 py-1 gap-1",
        className,
      )}
      data-component="SimpleNav"
      data-variant="modern-seek"
    >
      {items.map((item, idx) => {
        const active = item.id === activeId;
        const disabled = !!item.disabled;
        const focusable = idx === focusIndex && !disabled;
        return (
          <button
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-current={active ? "page" : undefined}
            aria-disabled={disabled || undefined}
            tabIndex={focusable ? 0 : -1}
            title={item.title || item.label}
            className={itemClasses(active, disabled, { intensity, size })}
            onClick={(e) => {
              if (disabled) return;
              onSelect?.(item, e);
            }}
            onKeyDown={(e) => handleKey(e, idx)}
            data-active={active ? "true" : "false"}
            data-disabled={disabled ? "true" : "false"}
          >
            {item.icon && (
              <span className="mr-1 flex h-4 w-4 items-center justify-center text-[10px]">
                {item.icon}
              </span>
            )}
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

SimpleNav.displayName = "SimpleNav";

export default SimpleNav;
