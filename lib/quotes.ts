// The authored quote deck and the pure rules the page and the MCP route share.

export type Quote = { id: number; text: string; author: string; category: string };

export const QUOTES: Quote[] = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Leadership" },
  { id: 3, text: "Stay hungry, stay foolish.", author: "Steve Jobs", category: "Life" },
  { id: 4, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams" },
  { id: 5, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle Onassis", category: "Hope" },
];

/** A different quote than `currentId`, chosen by `random` (0 <= r < 1). With one quote, that quote. */
export function pickNext(quotes: Quote[], currentId: number, random: number): Quote {
  const candidates = quotes.filter((quote) => quote.id !== currentId);
  if (candidates.length === 0) return quotes[0];
  const index = Math.min(candidates.length - 1, Math.max(0, Math.floor(random * candidates.length)));
  return candidates[index];
}

/** Adds the id if missing, removes it if present. */
export function toggleFavorite(favorites: number[], id: number): number[] {
  return favorites.includes(id) ? favorites.filter((entry) => entry !== id) : [...favorites, id];
}

/** The clipboard text for a quote. */
export function formatQuote(quote: Quote): string {
  return `“${quote.text}” — ${quote.author}`;
}

/** Quotes whose text, author or category contains `query`, ignoring case. */
export function searchQuotes(quotes: Quote[], query: string): Quote[] {
  const needle = query.trim().toLowerCase();
  return quotes.filter((quote) => `${quote.text} ${quote.author} ${quote.category}`.toLowerCase().includes(needle));
}
