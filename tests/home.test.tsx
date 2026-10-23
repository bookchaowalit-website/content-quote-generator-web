import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the deck, the first card and the sample-data notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Put a thought");
    expect(html).toContain("The only way to do great work is to love what you do.");
    expect(html).toContain("Five authored samples. No remote quote service is connected.");
    expect(html).toMatch(/0(<!-- -->)? SAVED/);
  });
});
