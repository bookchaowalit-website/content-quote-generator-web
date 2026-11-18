import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the App shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "A small deck of authored quotes: deal a card, keep the ones you like, copy one clean.";

export const metadata: Metadata = {
  title: "Quote Desk | Bookchaowalit",
  description,
  keywords: ["quote generator", "quotes", "writing prompt"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://quote-generator.bookchaowalit.com"),
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Quote Desk | Bookchaowalit", description, siteName: "Bookchaowalit" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
