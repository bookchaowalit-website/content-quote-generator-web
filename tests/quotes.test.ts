import { describe, expect, it } from "vitest";
import { QUOTES, formatQuote, pickNext, searchQuotes, toggleFavorite } from "@/lib/quotes";

describe("pickNext", () => {
  it("never deals the current card again", () => {
    for (const r of [0, 0.25, 0.5, 0.75, 0.999]) expect(pickNext(QUOTES, 3, r).id).not.toBe(3);
  });

  it("maps the random number onto the remaining cards and clamps out-of-range input", () => {
    expect(pickNext(QUOTES, 1, 0).id).toBe(2);
    expect(pickNext(QUOTES, 1, 0.999).id).toBe(5);
    expect(pickNext(QUOTES, 1, 1).id).toBe(5);
    expect(pickNext(QUOTES, 1, -1).id).toBe(2);
  });

  it("returns the only card when the deck has one", () => {
    expect(pickNext([QUOTES[0]], 1, 0.5).id).toBe(1);
  });
});

describe("QUOTES", () => {
  it("credits the darkest-moments line to Aristotle Onassis, not the philosopher", () => {
    expect(QUOTES[4].author).toBe("Aristotle Onassis");
  });
});

describe("toggleFavorite", () => {
  it("adds then removes an id without touching the others", () => {
    expect(toggleFavorite([2], 4)).toEqual([2, 4]);
    expect(toggleFavorite([2, 4], 2)).toEqual([4]);
  });
});

describe("formatQuote and searchQuotes", () => {
  it("formats the clipboard text with curly quotes and the author", () => {
    expect(formatQuote(QUOTES[2])).toBe("“Stay hungry, stay foolish.” — Steve Jobs");
  });

  it("searches text, author and category ignoring case", () => {
    expect(searchQuotes(QUOTES, "STEVE").map((q) => q.id)).toEqual([1, 2, 3]);
    expect(searchQuotes(QUOTES, "hope").map((q) => q.id)).toEqual([5]);
    expect(searchQuotes(QUOTES, "dreams").map((q) => q.id)).toEqual([4]);
    expect(searchQuotes(QUOTES, "zzz")).toEqual([]);
  });
});
