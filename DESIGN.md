---
name: Quote Desk
description: A small authored quote deck on the shared App shell.
---

# Design System: Quote Desk

## Overview

Quote Desk is a small authored deck, not a quote API. Since 2026-11-19 it uses the shared App shell
(`app/app-shell.css`, `components/app-shell.tsx`, `APP-SHELL.md`): the calm, Apple-like look shared with the
list apps. Deal, Keep and Copy are the complete actions. The deck is finite and labelled as sample content.

## Colors and type

Only the App shell tokens (`--as-*`, light and dark). Geist via `next/font`, variable on `<html>`. The one
filled button is Deal another; Keep card and Copy quote are outlined plain buttons (3:1 edge).

## Layout

Top bar, then the two lists (Deck, Saved) in the sidebar, which become a row of pills on phones. The main pane
shows the head with Deal another, the selected quote card, then the current list. On phones the card comes
before the list, so the quote and its actions sit in the first screen.

## Components

- **Quote card:** quote, author, category pill, Keep card (`aria-pressed`), Copy quote, and a status line.
- **Lists:** Deck shows all five quotes; Saved shows kept cards, with an empty state when there are none.
- **Note:** quotes are authored samples; saved cards stay in this browser (`localStorage`).

## Do's and Don'ts

- Do let the sentence be the largest object on the page.
- Do keep the finite authored deck honest.
- Don't add a remote quote feed, attribution claims, or account favorites.
