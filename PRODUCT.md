# Quote Desk (quote generator) — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `quote-generator`, evidence Live→Prototype) on
> 2026-10-23.

## What it is

A client-only demo of a five-card quote deck with copy to clipboard.

## Who it is for

A portfolio visitor who wants a calm card UI: pick, deal, keep and copy a quote.

## What works today

1. Five hard-coded quotes (Steve Jobs x3, Eleanor Roosevelt, Aristotle Onassis), each with a category; pick one from
   the deck list.
2. "Deal another" shows a random different card; "Keep card" toggles a kept mark and the header counts kept cards.
3. "Copy quote" copies `“text” — author` to the clipboard.
4. `/api/mcp` answers JSON-RPC with `get_all`, `get_by_id` and `search` (text, author, category) over the same deck.
5. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No customizable backgrounds, typography controls, PNG export or custom images (claims removed from the portfolio
  card in the 2026-10 review).
- Kept cards live only in page memory; nothing survives a reload. No quote service, account or sync.
- Attributions are the commonly cited ones and are not sourced (the "darkest moments" line was credited to the
  philosopher Aristotle; it is usually attributed to Aristotle Onassis and now says so).

## Live URL and deploy state

- Live: https://quote-generator.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-quote-generator-frontend` is deployed only by CLI. Last production deployment:
  2026-10-23 (CLI, commit 893be49, the Next 16.4.2 CVE patch). Its Git link names the old repository
  (`bookchaowalit/bookchaowalit-quote-generator-frontend`), so a push to `main` does not deploy: the live site lags
  `main` (no Sentry, old template MCP route) until the owner reconnects Vercel Git to this repository (owner action
  D9).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `content-quote-generator-web`, org
  `personal-yu0`).

## Boundaries

- Browser-only apart from the stateless `/api/mcp` route.
