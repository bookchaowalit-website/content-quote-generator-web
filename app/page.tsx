'use client'

import { useState } from 'react';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs", category: "Life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "Hope" },
];

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote.text === currentQuote.text);
    setCurrentQuote(newQuote);
  };

  const toggleFavorite = () => {
    const quoteText = `${currentQuote.text} - ${currentQuote.author}`;
    if (favorite.includes(quoteText)) {
      setFavorite(favorite.filter(f => f !== quoteText));
    } else {
      setFavorite([...favorite, quoteText]);
    }
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">💭 Quote Generator</h1>
          <p className="text-gray-600 dark:text-gray-300">Get inspired with timeless wisdom</p>
        </div>

        {/* Quote Display */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 mb-8 relative">
          <div className="text-6xl text-amber-300 mb-4">"</div>
          <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
            {currentQuote.text}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xl text-gray-600 dark:text-gray-300">— {currentQuote.author}</p>
            <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm">
              {currentQuote.category}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={generateQuote}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            ✨ New Quote
          </button>
          <button
            onClick={toggleFavorite}
            className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105 ${
              favorite.includes(`${currentQuote.text} - ${currentQuote.author}`)
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
            }`}
          >
            {favorite.includes(`${currentQuote.text} - ${currentQuote.author}` ? '❤️ Saved' : '🤍 Save'}
          </button>
          <button
            onClick={copyQuote}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>

        {/* Favorites */}
        {favorite.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">❤️ Your Favorites</h2>
            <div className="space-y-3">
              {favorite.map((fav, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                >
                  <p className="flex-1 text-gray-700 dark:text-gray-300 italic">"{fav.split(' - ')[0]}"</p>
                  <p className="text-gray-500 text-sm">— {fav.split(' - ')[1]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
