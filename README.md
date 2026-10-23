# Quote Desk (quote generator)

A small quote deck: five authored quotes you can pick from a list or "deal" at random (never the same card twice in a
row), mark as kept for this page view, and copy to the clipboard as `“text” — author`. Sample data only, kept in the
code.

Live: https://quote-generator.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- No backgrounds, typography controls, image upload or PNG export.
- No quote service or import. Kept cards are not saved: a reload clears them.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: deck logic, MCP route, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/quotes.ts`: the authored deck plus `pickNext` (random source passed in), `toggleFavorite`, `formatQuote` and
  `searchQuotes` (used by the page and the MCP route).
- `app/api/mcp/route.ts`: stateless JSON-RPC endpoint with `get_all`, `get_by_id` and `search` over the deck.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
- `app/more-projects/page.tsx`: shared portfolio link page (copied per repository, not a package).
