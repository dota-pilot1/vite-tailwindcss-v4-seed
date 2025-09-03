# vite-tailwindcss-v4-seed

Minimal Vite + React + TypeScript + Tailwind CSS v4 starter.

## simple-style 8bit navigation

An experimental ultra–minimal 8‑bit inspired header navigation (SimpleNav) has been added.

Characteristics:
- Pixel / retro vibe using mono font, hard 2px offset shadows, dashed selection border
- Pure Tailwind utility classes (no extra global CSS)
- Keyboard navigation: ArrowLeft / ArrowRight / Home / End / Enter / Space
- Accessible: role="navigation" + role="tab" semantics and aria-current="page" for the active item
- Design tokens kept deliberately minimal (size, intensity)

Selection effect:
- Active item: dashed black border (2px), yellow highlight block (bg-yellow-200), pixel shadow (shadow-[2px_2px_0_0_#000])
- Focus-visible replicates the same dashed outline to reinforce keyboard discoverability

Usage (auto‑wired in header):
- The `AppHeader` now accepts `forceSimpleStyle` (default: true)
- Set `forceSimpleStyle={false}` to fall back to the vercel-ui `PrimaryNav`

Example override:
```tsx
// In a custom layout / page
<AppHeader forceSimpleStyle={false} />
```

Future ideas:
- Add a dark palette flip (amber → lime or cyan)
- Optional animated “marching ants” dashed border (prefers-reduced-motion aware)
- Compact density scale + icon‑only mode

This mode is intended as a stylistic contrast / demo and can be removed or evolved into a proper theme variant later.
