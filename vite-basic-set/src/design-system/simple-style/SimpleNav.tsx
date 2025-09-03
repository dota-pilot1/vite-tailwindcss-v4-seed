import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * SimpleNav (8-bit / simple-style)
 *
 * 초극단 미니멀 + 레트로(8bit-ish) 느낌의 상단 네비게이션.
 * - 선택(활성) 시 점선/픽셀 사각형 강조
 * - 최소한의 색상 팔레트와 '거친' 그림자(2px 오프셋) 사용
 * - router 비의존 (상위에서 activeId + onSelect 제어)
 * - 키보드 탐색 지원: ← → Home End Enter / Space
 *
 * 접근성:
 * - role="navigation" 래퍼
 * - 내부 버튼 role="tab" 과 aria-current="page" (선택 상태) 적용
 *
 * 디자인 메모:
 * - 8bit 감성: 단색 + 굵은 경계 + 저해상도 느낌(2px shadow)
 * - dotted focus/active 박스: border-dashed or outline + box-shadow 로 블록감 부여
 * - Tailwind 유틸만 활용(추가 전역 CSS 없이)
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
  onSelect?(item: SimpleNavItem, ev: React.MouseEvent | React.KeyboardEvent): void;
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
    "relative inline-flex items-center justify-center select-none font-mono tracking-tight uppercase transition-colors outline-none";
  const sizing =
    size === "sm"
      ? "h-8 px-3 text-[10px] leading-none"
      : "h-9 px-4 text-[11px] leading-none";
  const paletteBase =
    intensity === "bold"
      ? "bg-[#f5f5f5] text-gray-800"
      : "bg-white text-gray-700";
  const hoverable = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer hover:bg-yellow-50";
  const activeStyle = active
    ? cx(
        "bg-yellow-200 text-gray-900",
        // 점선 사각형 + 픽셀 그림자
        "border-2 border-black border-dashed",
        "shadow-[2px_2px_0_0_#000]",
      )
    : cx(
        "border-2 border-transparent",
        "shadow-[2px_2px_0_0_rgba(0,0,0,0)]",
      );

  const focusVisible =
    "focus-visible:outline-none focus-visible:border-black focus-visible:border-dashed focus-visible:shadow-[2px_2px_0_0_#000]";

  return cx(base, sizing, paletteBase, hoverable, activeStyle, focusVisible);
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
        "inline-flex",
        fullWidth && "w-full",
        "bg-[#e2e2e2] p-1 border-2 border-black",
        "shadow-[3px_3px_0_0_#000]",
        "gap-1",
        className,
      )}
      data-component="SimpleNav"
      data-variant="simple-style-8bit"
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
