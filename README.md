# mikeye-workers

MCP node for **mikeye.com** — origin identity layer of the Mike Ye ecosystem (exmxc.ai, trailgenic.com, sleepgenic.ai, ellaentity.ai).

**Live endpoint:** https://mcp.mikeye.com
**Cloudflare account:** mike@trailgenic.com
**Deploy:** manual `wrangler deploy` (CI pending)

## v2.0 — MCP Streamable HTTP

The worker serves both a JSON-RPC 2.0 MCP transport and a backward-compatible REST surface.

### MCP transport — `POST /mcp`

Supports `initialize`, `ping`, `tools/list`, `tools/call`, `notifications/initialized`.

| Tool | Description |
|---|---|
| `my.origin.getIdentity` | Canonical identity + 5-domain sameAs graph |
| `my.strategy.getDoctrine` | Decision Framing doctrine |
| `my.frames.get` | Five decision frames, filterable by `name` / `category` |
| `my.exit.getFramework` | Buyer-Lens Audit™ v1.0 — six dimensions, two-tier delivery |
| `my.exit.runDiagnostic` | Diagnostic structure + tier routing ($199 / $499) |
| `my.dataset.get` | Any named dataset (`origin`, `doctrine`, `decision_frames`, `strategy`, `ecosystem`, `glossary`, `keywords`) |

### REST surface (backward compatible)

- `/` — root discovery
- `/.well-known/tool-registry.json` · `/.well-known/mcp.json` · `/.well-known/ai-plugin.json` · `/.well-known/openapi.json`
- `/capabilities.json` · `/health`
- `/datasets` + `/datasets/{origin,doctrine,decision-frames,strategy,ecosystem,glossary,keywords}.json`
- `/frameworks/buyer-lens-audit.json` — **new in v2**
- `/exit/diagnostic.json` — **new in v2**

## Structure

```
worker.js          — router + MCP transport
lib/registry.js    — entity, tools, frames, BLA framework, doctrine, ecosystem (single source of truth)
lib/tools.js       — tool handlers + dataset builders
lib/http.js        — response helpers
datasets/          — glossary.json, keywords.json (real files, bundled at build)
```

## v2.0 content changes

- **Decision frames: 4 → 5.** Judgment-as-a-Service added to `decision-frames.json` and doctrine structure (was on site, missing from datasets).
- **Entity graph: 3 → 5 domains.** sleepgenic.ai and ellaentity.ai added to `ecosystem.json`, `affiliated_entities`, and sameAs everywhere.
- **Buyer-Lens Audit™ v1.0** formalized: six named dimensions with evaluation criteria, provenance, and two-tier delivery model (Main Street $199 ≤ $1M revenue / Full Report $499).

## Deploy

```bash
wrangler deploy   # from the mike@trailgenic.com account
```

Note: JSON imports use `with { type: "json" }`. If an older Wrangler/esbuild rejects it, switch to `assert { type: "json" }` in `lib/tools.js`.

## Smoke test

```bash
node smoke.mjs    # 46 assertions: REST routes, content sync, full MCP flow
```
