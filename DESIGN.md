---
name: Quote Desk
description: A local quote deck that treats each sentence like a typeset card.
---

# Design System: Quote Desk

## Overview

Quote Desk is a small authored deck, not a quote API. The index helps a visitor choose a category; the paper card gives one sentence room to breathe; Deal, Keep, and Copy are the complete actions. The deck is intentionally finite and labeled local.

## Colors

- **Ink** `#20263a`: dark desk ground and primary type.
- **Ink soft** `#2b3550`: index and card frame.
- **Paper** `#f1eadc`: quote card surface.
- **Orange** `#d96742`: deal action and card mark.
- **Blue** `#81b5c0`: editorial emphasis in the hero.
- **Yellow** `#e0bd58`: saved/deck signal.
- **Rule** `#9a9386`: card and desk structure.

Orange is the action mark; yellow identifies saved or local deck state. The paper card owns the quote.

## Typography

Geist Sans handles labels and controls. Georgia carries the selected quote at reading scale so the sentence feels like a typeset object. Geist Mono is limited to card numbers, deck metadata, and the local boundary.

## Layout

The hero and tilted deck stamp lead to an asymmetric desk: category index on the left and selected quote card on the right. On mobile the deck index comes first, then the quote paper and actions; no action is hidden behind a menu.

## Elevation & Depth

The paper card against the ink-soft desk is the depth system. Border rules and the orange card mark are enough; there are no gradients, shadows, or decorative quote tiles.

## Shapes

Cards are rectangular like a small typesetter's proof. The stamp is rotated once as a deck mark. Category tags are outlined rectangles and actions stay flat.

## Components

- **Deck index:** five authored categories/authors and selected state.
- **Quote card:** quote, author, category, Deal another, Keep card, and Copy quote.
- **Local deck note:** favorites remain in current page state and quotes are sample records.

## Do's and Don'ts

- Do let the sentence be the largest object on the page.
- Do make saved/copy feedback direct and quiet.
- Do keep the finite authored deck honest.
- Don't add a remote quote feed, attribution claims, or account favorites.
- Don't turn the surface into a generic inspirational gradient or emoji button grid.
