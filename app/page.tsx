"use client";

import { useState } from "react";

type Quote = { id: number; text: string; author: string; category: string };
const QUOTES: Quote[] = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Leadership" },
  { id: 3, text: "Stay hungry, stay foolish.", author: "Steve Jobs", category: "Life" },
  { id: 4, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams" },
  { id: 5, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "Hope" },
];

export default function Home() {
  const [selected, setSelected] = useState(QUOTES[0]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const nextQuote = () => {
    const candidates = QUOTES.filter((quote) => quote.id !== selected.id);
    setSelected(candidates[Math.floor(Math.random() * candidates.length)]);
    setCopied(false);
  };
  const toggleFavorite = () => setFavorites((current) => current.includes(selected.id) ? current.filter((id) => id !== selected.id) : [...current, selected.id]);
  const copyQuote = async () => {
    try { await navigator.clipboard.writeText(`“${selected.text}” — ${selected.author}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };

  return (
    <main className="quote-shell">
      <div className="quote-frame">
        <header className="quote-topbar"><a href="https://bookchaowalit.com" className="quote-mark" aria-label="Bookchaowalit home"><span>QUOTE</span> / DESK</a><span>AUTHORED DECK / {QUOTES.length} CARDS</span><span>{favorites.length} SAVED</span></header>
        <section className="quote-intro"><div><h1>Put a thought<br /><em>on the table.</em></h1><p>A small quote deck for the sentence that needs to travel with you. Deal another card, keep one, or copy it clean.</p></div><div className="quote-stamp" aria-hidden="true"><span>DECK</span><b>{String(selected.id).padStart(2, "0")}</b><span>LOCAL</span></div></section>

        <section className="quote-desk" aria-label="Quote generator">
          <aside className="quote-index"><div className="desk-head"><span>THE DECK</span><span>{QUOTES.length} CARDS</span></div><div className="quote-list">{QUOTES.map((quote) => <button type="button" key={quote.id} className={selected.id === quote.id ? "quote-row selected" : "quote-row"} onClick={() => setSelected(quote)} aria-pressed={selected.id === quote.id}><span>{String(quote.id).padStart(2, "0")}</span><strong>{quote.category}</strong><small>{quote.author}</small></button>)}</div><div className="index-note"><span className="field-label">DECK NOTE</span><p>Five authored samples. No remote quote service is connected.</p></div></aside>
          <article className="quote-card"><div className="desk-head"><span>SELECTED CARD / {selected.category.toUpperCase()}</span><span>READ / KEEP / COPY</span></div><div className="card-paper"><span className="card-number">{String(selected.id).padStart(2, "0")}</span><blockquote>“{selected.text}”</blockquote><p className="quote-author">— {selected.author}</p><span className="quote-category">{selected.category}</span><div className="quote-actions"><button type="button" className="primary" onClick={nextQuote}>Deal another</button><button type="button" className={favorites.includes(selected.id) ? "secondary active" : "secondary"} onClick={toggleFavorite}>{favorites.includes(selected.id) ? "Saved" : "Keep card"}</button><button type="button" className="text-action" onClick={copyQuote}>{copied ? "Copied" : "Copy quote"}</button></div></div><p className="boundary-note"><b>LOCAL DECK</b> / Favorites stay in this page and quotes are authored sample records.</p></article>
        </section>
        <footer className="quote-footer"><span>BOOK / DEV TOOLS</span><span>DEAL · KEEP · CARRY</span></footer>
      </div>
    </main>
  );
}
