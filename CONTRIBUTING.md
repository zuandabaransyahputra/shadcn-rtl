# Contributing

Thanks for helping make shadcn/ui work for right-to-left languages.

## Setup

```bash
pnpm install
pnpm dev            # demo site on http://localhost:3000
pnpm build          # shadcn build (public/r/*.json) + next build
```

Node 22 or newer.

## Where things live

- `registry/rtl/ui/*` and `registry/rtl/lib/*`: the source of every registry item.
- `registry.json`: the item list. `pnpm registry:build` turns it into `public/r/*.json`. Commit the output.
- `components/demos/*`: one demo per item, using `useT()` for English and Arabic strings.
- `lib/docs.ts`: the text on each docs page (description, "what changed", usage).
- `lib/site.ts`: the deployed URL (`SITE_URL`). Also update `homepage` in `registry.json` if it changes.

## Rules for components

- Logical properties only: `ms-/me-/ps-/pe-/start-/end-/border-s/border-e/text-start`. No `ml-`, `left-`, `text-left` unless the edge is genuinely physical.
- Icons that point somewhere get `rtl:rotate-180`. Icons that do not (search, close, check) stay as they are.
- Slide animations use tw-animate-css's `slide-in-from-start` / `-end` (they read `:dir()`).
- Anything rendered in a portal needs `dir` passed in explicitly (`Direction.useDirection()`), because it leaves the `dir="rtl"` wrapper.
- Hard-coded English (labels, screen-reader text) becomes a prop with the English default.
- Stay close to upstream shadcn/ui so diffs are easy to review. Say what changed in `lib/docs.ts`.

## Before opening a PR

1. `pnpm build` passes.
2. Check the component in the demo in all four combinations (LTR/RTL x EN/AR), including keyboard navigation.
3. Keep `app/globals.css` in sync with the `arabic-typography` item in `registry.json` if you touch either.
