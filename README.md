# vite-tailwindcss-v4-seed

Minimal Vite + React + TypeScript + Tailwind CSS v4 starter.

## modern-seek minimal navigation

A modern ultra–minimal dashed-outline navigation variant (SimpleNav) focused on subtle contrast and clean spacing.

Characteristics:
- Subtle dashed active outline (low-contrast gray)
- Soft background highlight (bg-gray-50) only on active
- Neutral typography (no uppercase / mono / pixel shadow)
- Keyboard: ArrowLeft / ArrowRight / Home / End / Enter / Space
- Accessible semantics (navigation + tab roles, aria-current)

Selection styling:
- Active: bg-gray-50 + dashed border (gray-400)
- Focus-visible: same dashed border plus soft ring (ring-gray-300)

Usage (auto‑wired in header):
- `AppHeader` 기본: modern-seek 스타일 (`forceSimpleStyle` = true)
- `forceSimpleStyle={false}` 로 vercel-ui `PrimaryNav` 복귀

Example override:
```tsx
// In a custom layout / page
<AppHeader forceSimpleStyle={false} />
```

Future ideas:
- Dark mode tone mapping (neutral gray → subtle dark palette)
- Optional animated dashed outline (prefers-reduced-motion aware)
- Density scale + icon-only mode

This mode is intended as a stylistic contrast / demo and can be removed or evolved into a proper theme variant later.
