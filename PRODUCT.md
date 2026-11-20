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
- Kept cards stay in this browser's localStorage only (page memory when storage is blocked or full, and the page
  says so). No quote service, account or sync.
- Known limit: two tabs that save different cards in the same instant can still lose one save (the read, change and
  write are not one transaction; saves made one after the other are merged).
- Known limit: removing a card from Saved has no Undo toast yet; keep it again from the Deck.
- Known limit: the current row's button reads "Showing" while its accessible name starts "Show the quote by …", so
  voice control may not match the visible word.
- Known limit: when this browser will not save (storage blocked or full), cards kept for this visit only are lost
  as soon as another tab changes the saved list; the page then shows the other tab's list.
- Known limit: after another tab removes or keeps the card on screen, this tab's button updates but the last status
  line ("Saved in this browser.") stays until the next action.
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
