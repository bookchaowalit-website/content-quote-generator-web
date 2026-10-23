import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/mcp/route";

function rpc(body: unknown) {
  return POST(new Request("http://localhost/api/mcp", { method: "POST", body: JSON.stringify(body) }));
}

describe("MCP route", () => {
  it("echoes the JSON-RPC request id", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 7, method: "tools/list" });
    expect((await res.json()).id).toBe(7);
  });

  it("get_all returns the real deck", async () => {
    const { result } = await (await rpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_all" } })).json();
    expect(result.quotes.map((q: { id: number }) => q.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it("get_by_id finds a quote and errors on an unknown id", async () => {
    const ok = await (await rpc({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "get_by_id", arguments: { id: 4 } } })).json();
    expect(ok.result.quote.author).toBe("Eleanor Roosevelt");
    const bad = await (await rpc({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "get_by_id", arguments: { id: 99 } } })).json();
    expect(bad.error.code).toBe(-32602);
    expect(bad.id).toBe(3);
  });

  it("search matches author", async () => {
    const { result } = await (await rpc({ jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "search", arguments: { query: "aristotle" } } })).json();
    expect(result.quotes.map((q: { id: number }) => q.id)).toEqual([5]);
  });

  it("rejects an unknown tool, an unknown method and a malformed body", async () => {
    expect((await (await rpc({ jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "render_png" } })).json()).error.code).toBe(-32602);
    expect((await (await rpc({ jsonrpc: "2.0", id: 6, method: "nope" })).json()).error.code).toBe(-32601);
    const bad = await POST(new Request("http://localhost/api/mcp", { method: "POST", body: "{" }));
    expect((await bad.json()).error.code).toBe(-32700);
  });
});
