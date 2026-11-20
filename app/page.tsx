"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AppFoot, AppTop, ListButton, Pill } from "@/components/app-shell";
import { QUOTES, SAVED_KEY, formatQuote, parseSaved, pickNext, type Quote } from "@/lib/quotes";
import { useStoredState } from "@/lib/use-stored-state";

type View = "deck" | "saved";
const SOURCE = "https://github.com/bookchaowalit-website/content-quote-generator-web";
const NO_SAVED: number[] = [];
const parse = (raw: string | null) => parseSaved(raw);

export default function Home() {
  const [selected, setSelected] = useState<Quote>(QUOTES[0]);
  const [saved, setSaved] = useStoredState(SAVED_KEY, NO_SAVED, parse);
  const [view, setView] = useState<View>("deck");
  const [status, setStatus] = useState("");
  const cardRef = useRef<HTMLElement>(null);

  const isSaved = saved.includes(selected.id);
  const shown = view === "deck" ? QUOTES : QUOTES.filter((quote) => saved.includes(quote.id));

  // Every status change takes a new ticket; an async result (copy) only writes if its ticket is still the latest.
  const statusTicket = useRef(0);
  const say = useCallback((message: string) => {
    statusTicket.current += 1;
    setStatus(message);
  }, []);

  const deal = () => {
    setSelected(pickNext(QUOTES, selected.id, Math.random()));
    say("");
  };
  const keep = () => {
    // Act on what the button shows (Keep card or Saved), applied to the latest saved list: another tab may have
    // changed it since this render, and a list that already matches is left alone.
    const id = selected.id;
    const want = !isSaved;
    const { saved: stored } = setSaved((current) =>
      want ? (current.includes(id) ? current : [...current, id]) : current.includes(id) ? current.filter((entry) => entry !== id) : current,
    );
    if (!stored) say(want ? "Kept for this visit only: this browser would not save it." : "Removed for this visit only: this browser would not save the change.");
    else say(want ? "Saved in this browser." : "Removed from saved cards.");
  };
  const copy = async () => {
    const ticket = ++statusTicket.current;
    let message: string;
    try {
      await navigator.clipboard.writeText(formatQuote(selected));
      message = "Copied to the clipboard.";
    } catch {
      message = "Copy did not work here. Select the quote and copy it by hand.";
    }
    if (ticket === statusTicket.current) setStatus(message);
  };
  const show = (quote: Quote) => {
    // Render the new quote first, so the card's accessible name is the new quote when focus lands on it.
    flushSync(() => {
      setSelected(quote);
      say("");
    });
    cardRef.current?.focus();
  };

  return (
    <div className="as">
      <a className="as-skip" href="#main">Skip to the quote</a>
      <AppTop name="Quote Desk" tagline="A small deck of authored quotes" />
      <div className="as-body">
        <nav className="as-side" aria-label="Lists">
          <h2>Lists</h2>
          <ul className="as-lists">
            <ListButton label="Deck" count={QUOTES.length} current={view === "deck"} onSelect={() => setView("deck")} />
            <ListButton label="Saved" count={saved.length} current={view === "saved"} onSelect={() => setView("saved")} />
          </ul>
        </nav>
        <main id="main" className="as-main">
          <div className="as-head">
            <div>
              <h1>Quote Desk</h1>
              <p>Deal a card, keep the ones you like, copy one clean.</p>
            </div>
            <div className="as-tools">
              <button type="button" className="as-button" onClick={deal}>Deal another</button>
            </div>
          </div>

          <article ref={cardRef} className="qd-card" tabIndex={-1} aria-labelledby="qd-quote">
            <blockquote id="qd-quote">“{selected.text}”</blockquote>
            <p className="qd-author">{selected.author}</p>
            <div className="qd-card-foot">
              <Pill tone="grey">{selected.category}</Pill>
              <div className="qd-actions">
                <button type="button" className="as-plain qd-outline" aria-pressed={isSaved} onClick={keep}>{isSaved ? "Saved" : "Keep card"}</button>
                <button type="button" className="as-plain qd-outline" onClick={copy}>Copy quote</button>
              </div>
            </div>
            <p className="qd-status" role="status">{status}</p>
          </article>

          <section className="as-section" aria-labelledby="qd-list-title">
            <h2 id="qd-list-title" className="as-section-title">{view === "deck" ? "The deck" : "Saved cards"}</h2>
            {shown.length === 0 ? (
              <div className="as-list">
                <p className="as-empty"><strong>No saved cards yet</strong>Press Keep card on a quote and it stays here, in this browser.</p>
              </div>
            ) : (
              <ul className="as-list">
                {shown.map((quote) => (
                  <li key={quote.id} className="as-row">
                    <div>
                      <h3>{quote.text}</h3>
                      <p>{quote.author}{saved.includes(quote.id) ? " · Saved" : ""}</p>
                    </div>
                    <Pill tone="grey">{quote.category}</Pill>
                    <button type="button" className="as-plain" aria-pressed={selected.id === quote.id} aria-label={`Show the quote by ${quote.author}: ${quote.category}`} onClick={() => show(quote)}>
                      {selected.id === quote.id ? "Showing" : "Show"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="as-note">Five authored sample quotes; no remote quote service is connected. Saved cards stay in this browser only.</p>
        </main>
      </div>
      <AppFoot source={SOURCE} />
    </div>
  );
}
