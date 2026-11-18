// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { SAVED_KEY } from "@/lib/quotes";
import { resetStoredCache } from "@/lib/use-stored-state";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root;
let host: HTMLDivElement;
const $ = (selector: string) => host.querySelector(selector) as HTMLElement;
const button = (text: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(text)) as HTMLButtonElement;
const press = async (el: Element) => { await act(async () => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); }); };
const quote = () => $("#qd-quote").textContent;

function mount() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(<Home />));
}

beforeEach(() => {
  localStorage.clear();
  resetStoredCache();
  mount();
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.restoreAllMocks();
});

describe("quote desk", () => {
  it("deals a different card", async () => {
    const before = quote();
    await press(button("Deal another"));
    expect(quote()).not.toBe(before);
  });

  it("keeps a card in localStorage, lists it under Saved and survives a remount", async () => {
    await press(button("Saved"));
    expect($(".as-empty").textContent).toContain("No saved cards yet");
    await press(button("Deck"));
    await press(button("Keep card"));
    expect($(".qd-actions button").getAttribute("aria-pressed")).toBe("true");
    expect($(".qd-actions button").textContent).toBe("Saved");
    expect(JSON.parse(localStorage.getItem(SAVED_KEY)!)).toEqual([1]);
    expect($('[role="status"]').textContent).toBe("Saved in this browser.");
    act(() => root.unmount());
    host.remove();
    resetStoredCache();
    mount();
    const savedList = [...host.querySelectorAll(".as-lists button")].find((b) => b.textContent?.startsWith("Saved"))!;
    expect(savedList.textContent).toContain("1");
    await press(savedList);
    expect([...host.querySelectorAll(".as-row h3")].map((h) => h.textContent)).toEqual(["The only way to do great work is to love what you do."]);
    await press($(".qd-actions button"));
    expect($('[role="status"]').textContent).toBe("Removed from saved cards.");
    expect(host.querySelector(".as-empty")).not.toBeNull();
  });

  it("shows a quote from the list and moves focus to the card", async () => {
    await press(host.querySelector('[aria-label^="Show the quote by Eleanor"]')!);
    expect(quote()).toContain("beauty of their dreams");
    expect(document.activeElement).toBe($(".qd-card"));
  });

  it("copies the quote and reports a failure plainly", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    await press(button("Copy quote"));
    expect(writeText).toHaveBeenCalledWith("“The only way to do great work is to love what you do.” — Steve Jobs");
    expect($('[role="status"]').textContent).toBe("Copied to the clipboard.");
    writeText.mockRejectedValueOnce(new Error("denied"));
    await press(button("Copy quote"));
    expect($('[role="status"]').textContent).toContain("Copy did not work here");
  });
});
