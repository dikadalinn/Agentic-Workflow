---
name: modern-ui-implementation
description: Premium, production-grade frontend UI implementation patterns. Use this skill when building React/Next.js components, implementing design systems, handling UI state machines (Loading/Empty/Error/Success), crafting responsive layouts, and applying micro-animations. Covers component architecture, accessibility, and performance best practices.
license: MIT
compatibility: opencode
---

# Modern UI Implementation

Apply these patterns when building frontend components to ensure a premium, accessible, and performant user interface.

## Component Architecture Rules

1. **Page shells first** — Build the overall layout and skeleton before filling in individual components.
2. **All 4 UI states always** — Every data-driven component MUST implement:
   - `Loading` — Skeleton loaders, not spinners (less jarring)
   - `Empty` — Helpful empty state with a clear action ("Add your first song →")
   - `Error` — Friendly error with a retry action
   - `Success` — The happy path data display

```tsx
function SongQueue({ streamerId }: Props) {
  const { data, isLoading, isError } = useQueue(streamerId);

  if (isLoading) return <QueueSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data?.length) return <EmptyQueueState />;
  return <QueueList items={data} />;
}
```

## Design Token System

Never hardcode values. Always use CSS variables or Tailwind tokens:

```css
:root {
  --color-primary: hsl(25, 95%, 53%);     /* Brand orange */
  --color-surface: hsl(220, 15%, 10%);    /* Dark background */
  --color-surface-raised: hsl(220, 15%, 14%);
  --color-text: hsl(220, 10%, 95%);
  --color-text-muted: hsl(220, 10%, 60%);
  --radius-base: 0.5rem;
  --radius-lg: 1rem;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.3);
}
```

## Micro-Animation Standards

Use subtle animations to make the interface feel alive and premium:

```css
/* Standard transition for interactive elements */
.btn, .card, input {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover lift effect for cards */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

/* Skeleton shimmer animation */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a2e 25%, #2a2a4e 50%, #1a1a2e 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

## Responsive Layout Patterns

Always build mobile-first. Use these breakpoints:

```
Mobile:  < 768px  → Single column, bottom navigation
Tablet:  768-1024px → Two columns, collapsible sidebar
Desktop: > 1024px → Full layout with persistent sidebar
```

## Form Patterns

Use React Hook Form + Zod for all forms:

```tsx
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} error={errors.email?.message} />
      <Input {...register("password")} type="password" error={errors.password?.message} />
      <Button type="submit" loading={isSubmitting}>Sign In</Button>
    </form>
  );
}
```

## Accessibility Non-Negotiables

- Every interactive element must have a visible focus ring (`:focus-visible`)
- All images need descriptive `alt` text
- Color contrast ratio minimum 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation must work for all interactive flows
- Use semantic HTML: `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<section>`
- All modals must trap focus and close on `Escape`

## Performance Rules

- Code-split at the route level with `React.lazy()`
- Virtualize lists over 50 items with `react-window` or `react-virtual`
- Memoize expensive calculations with `useMemo`; stabilize callbacks with `useCallback`
- Optimize images: WebP format, explicit width/height, `loading="lazy"` below the fold
- Avoid layout thrash: never read and write DOM properties in the same frame
