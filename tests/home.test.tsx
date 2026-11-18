import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "geist-variable" }) }));
import Home from "@/app/page";
import RootLayout, { metadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";

describe("home page", () => {
  it("renders the shell, the first card, both lists and the sample-data note", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("<h1>Quote Desk</h1>");
    expect(html).toContain("The only way to do great work is to love what you do.");
    expect(html).toContain("Five authored sample quotes");
    expect(html).toContain('href="https://bookchaowalit.com/"');
    expect(html).toContain('id="main"');
  });

  it("puts the font on <html> and uses its own domain", () => {
    const html = renderToString(<RootLayout><p>x</p></RootLayout>);
    expect(html).toMatch(/<html lang="en" class="geist-variable"/);
    expect(String(metadata.metadataBase)).toBe("https://quote-generator.bookchaowalit.com/");
    expect(robots().sitemap).toBe("https://quote-generator.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://quote-generator.bookchaowalit.com/");
  });

  it("sends the retired /more-projects page to the portfolio hub for good", async () => {
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
