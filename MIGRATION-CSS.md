# Tailwind → Semantic CSS Migration (Angular)

This document explains the token-driven, semantic CSS system replacing Tailwind-like utilities across the Angular app. It includes the design tokens, shared classes, common replacements, patterns, and the final cleanup steps.

## Why semantic CSS

- Consistent design across the app (one source of truth)
- Smaller templates and fewer inline utility classes
- Feature-scoped CSS when necessary; shared primitives for everything else
- Easier theming and refactoring via CSS variables

## Design tokens (src/styles.css)

- Colors: `--color-bg`, `--color-bg-alt`, `--color-foreground`, `--color-border`, `--color-primary`, `--color-secondary`, `--color-muted`, `--color-danger`, `--color-warning`, `--color-info`, `--color-success`
- Type scale: `--text-xs` … `--text-5xl`
- Spacing scale: `--space-0` … `--space-12`
- Radii: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- Shadows: `--shadow-sm`, `--shadow`, `--shadow-lg`
- Transitions: `--transition-fast`, `--transition`

All components and utilities use these CSS variables to stay consistent.

## Shared semantic classes (src/styles.css)

- Page & Grid
  - `.page`, `.page--narrow`, `.page--tight`, `.page--wide`
  - Grids: `.grid-two`, `.grid-three`, `.grid-four`, `.grid-features`, `.grid-stats`, `.grid-responsive`
  - Stacks: `.stack-sm`, `.stack-md`, `.stack-lg`, `.stack-xl`
  - Rows: `.row-sm`
- Typography
  - `.heading-hero`, `.heading-xl`, `.heading-section`, `.heading-lg`
  - `.text-small`, `.text-meta`, `.lead`, `.text-muted`, `.text-primary`, `.text-secondary`, `.text-danger`, `.text-warning`, `.text-info`
- Cards
  - `.card`, `.card-hero`, `.card-elegant`, with optional `.card__header`, `.card__body`
- Buttons
  - `.btn`, variants: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-danger`
- Badges
  - `.badge`, variants: `.badge-primary`, `.badge-secondary`, `.badge-soft`, `.badge-warning`, `.badge-danger`
- Forms
  - `.field`, `.label`, `.input`, `.select`, sized: `.input-sm`, `.input-lg`
- Effects
  - `.hover-lift`, `.gradient-hero`

## Typical replacements

- Container and spacing
  - `container mx-auto px-4 py-8` → `.page` (optionally `.page--narrow`)
  - `space-y-*` → replace with `.stack-*` on parent
- Type
  - `text-4xl md:text-5xl font-bold` → `.heading-xl` (or `.heading-hero`)
  - `text-lg text-muted-foreground` → `.lead` or `.text-small .text-muted` depending on context
- Color
  - `text-foreground` → remove or use inherited color; headings already styled
  - `text-muted-foreground` → `.text-muted`
  - `text-primary`/`text-secondary` → `.text-primary`/`.text-secondary`
  - `bg-background` → handled by cards or containers; avoid on leaf nodes unless necessary
- Cards and sections
  - `rounded-lg border p-6` → `.card-elegant` with `.card__header` and `.card__body`
- Buttons and badges
  - `px-6 py-3 rounded-md bg-secondary text-white` → `.btn.btn-secondary`
  - `px-3 py-1 rounded-full ...` → `.badge` + appropriate variant
- Forms
  - `border rounded px-3 py-2` → `.input`
  - Form field stack: wrap label + input + help in `.field` with `.label`

## Feature-scoped helpers

Some pages add minimal helpers to keep templates clean:

- `about/about.css`: `.card__header`, `.card__body`, `.row-sm`, `.tech-icon`
- `contact/contact.css`: `.card__header`, `.card__body`, `.row-sm`
- `how-it-works/how-it-works.css`: `.process*`, `.dot--*`, `.card__*`, `.stat`, `.stack-*`, `.row-sm`

These are small, consistent with the global system, and safe to reuse.

## Angular patterns

- Standalone components import `CommonModule` (and `RouterModule` where `routerLink` is used)
- Avoid `[ngClass]` with Tailwind-like strings. Prefer mapping to semantic variants (e.g., `'btn-secondary'`, `'badge-danger'`)

## Transitional helpers (temporary)

To keep migration smooth, a few legacy-class mappings exist in `styles.css` (e.g., `[class*='text-foreground']`, `[class*='bg-secondary']`). These ensure older templates don’t visually break during the sweep. Plan to remove them after all pages are migrated.

Removal checklist:

- [ ] Grep for legacy patterns: `text-foreground`, `text-muted-foreground`, `bg-background`, `bg-secondary`, `text-primary`, `text-secondary`, `border`, spacing utilities, `rounded-*`, `grid-cols-*`
- [ ] Replace with semantic equivalents per the mapping above
- [ ] Run prod build and visual smoke test
- [ ] Delete the transitional helper block in `styles.css`

## Current status (at the time of writing)

- Migrated to semantic system: Dashboard, Yield Prediction Form, Prediction History, Resources, Weather Hub, Crop Guide, Climate Region, How It Works, About, Contact, Landing, Not Found
- Global additions: `.btn-danger`, `.badge-warning`, `.badge-danger`
- Production builds pass; CSS budgets OK

## Conventions & tips

- Prefer `.page` for screens, not ad-hoc containers
- Use stacks/grids for spacing instead of one-off margins
- Keep feature CSS small and cohesive; lean on global primitives first
- When dynamic styles are needed from TS, map to semantic variants (`'btn-secondary'`, `'badge-warning'`) instead of raw color classes

## Questions

If you’re unsure which class to use, grep for similar usage in `src/styles.css` and the feature CSS files, or follow the examples above.
