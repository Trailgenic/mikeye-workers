# mikeye-workers

MCP node for **mikeye.com** — origin identity layer of the Mike Ye ecosystem (exmxc.ai, trailgenic.com, sleepgenic.ai, ellaentity.ai).

**Live endpoint:** https://mcp.mikeye.com
**Cloudflare account:** mike@trailgenic.com
**Deploy:** a push to `main` runs smoke tests, then deploys through the existing Cloudflare workflow.

## v2.4 — Acquisition mandate and target screening

Adds the Acquisition Mandate & Target Screen to the first two transaction stages. The inventory now has 17 resources and eleven commit-pinned Excel downloads. It records mandate, alternatives, requirements, evidence, and review priorities. The MCP exposes metadata and workbook links; it does not calculate or approve acquisitions. See the latest `site-foundation/mandate-release` handoff in `Trailgenic/my-exitdesk` before regenerating shared assets.

## v2.3 — LOI economics and risk allocation

Synchronizes the 156-action Deal Workflow, 112-item due diligence checklist, and 104-action integration checklist. The inventory has 16 resources and ten versioned Excel downloads, including five company models and the Synergy Underwriting & Value Bridge and LOI Economics & Risk Allocator tools. The seven ordered transaction stages are distinct from the ten knowledge pillars. `my.dataset.get` exposes both structures and resource metadata; it does not execute workbook calculations. The release uses verified, commit-pinned workbooks and is coordinated with site publication.

## v2.1 — Practical M&A library

Adds 13 resource records, 10 M&A topics, seven versioned Excel downloads, and a shared Mike Ye authorship graph. The new public routes are `/datasets/ma-library.json`, `/ontology.json`, and `/llms.txt`; `my.dataset.get` also accepts `ma_library` and `ontology`. Existing tools, identity relationships, and Exit Desk routes remain available.

These records describe the coordinated MikeYe.com rebuild. Merge this release only when the Webflow launch gate is complete and the canonical resource URLs are being published. The main-domain `/llms.txt` is managed separately; this worker exposes the updated machine guide on the MCP domain.

The source inventory and schema generator are maintained in `Trailgenic/my-exitdesk`, under `site-foundation/launch` and `scripts/build-launch.mjs`. Regenerate there, copy `ma-library.json` and `ontology.json` into `datasets`, and update `lib/library-guide.js` from the generated `llms.txt`. Keep the website graphs and worker inventory synchronized in one release.

## v2.0 — MCP Streamable HTTP

The worker serves both a JSON-RPC 2.0 MCP transport and a backward-compatible REST surface.

### MCP transport — `POST /mcp`

Supports `initialize`, `ping`, `tools/list`, `tools/call`, `notifications/initialized`.

| Tool | Description |
|---|---|
| `my.origin.getIdentity` | Canonical identity profiles + 5-domain affiliated-entity graph |
| `my.strategy.getDoctrine` | Decision Framing doctrine |
| `my.frames.get` | Five decision frames, filterable by `name` / `category` |
| `my.exit.getFramework` | Buyer-Lens Audit™ v1.0 — six dimensions, two-tier delivery |
| `my.exit.runDiagnostic` | Diagnostic structure + tier routing ($199 / $499) |
| `my.dataset.get` | Any named dataset (`origin`, `doctrine`, `decision_frames`, `strategy`, `ecosystem`, `glossary`, `keywords`, `ma_library`, `ontology`) |

### REST surface (backward compatible)

- `/` — root discovery
- `/.well-known/tool-registry.json` · `/.well-known/mcp.json` · `/.well-known/ai-plugin.json` · `/.well-known/openapi.json`
- `/capabilities.json` · `/health`
- `/datasets` + `/datasets/{origin,doctrine,decision-frames,strategy,ecosystem,glossary,keywords,ma-library}.json`
- `/frameworks/buyer-lens-audit.json` — **new in v2**
- `/exit/diagnostic.json` — **new in v2**

## Structure

```
worker.js          — router + MCP transport
lib/registry.js    — entity, tools, frames, BLA framework, doctrine, ecosystem (single source of truth)
lib/tools.js       — tool handlers + dataset builders
lib/http.js        — response helpers
datasets/          — glossary.json, keywords.json, ma-library.json, ontology.json (bundled at build)
```

## v2.0 content changes

- **Decision frames: 4 → 5.** Judgment-as-a-Service added to `decision-frames.json` and doctrine structure (was on site, missing from datasets).
- **Entity graph: 3 → 5 domains.** sleepgenic.ai and ellaentity.ai added to `ecosystem.json` and `affiliated_entities`.
- **Identity semantics corrected in v2.0.1.** Mike Ye's `sameAs` now contains only verified Mike Ye identity profiles. exmxc, TrailGenic, Sleepgenic, and Ella remain affiliated/downstream entities rather than being incorrectly declared as the same entity.
- **TrailGenic classification aligned in v2.0.1.** TrailGenic is described as a longevity method and applied longevity laboratory.
- **Buyer-Lens Audit™ v1.0** formalized: six named dimensions with evaluation criteria, provenance, and two-tier delivery model (Main Street $199 ≤ $1M revenue / Full Report $499).

## Deploy

```bash
wrangler deploy   # from the mike@trailgenic.com account
```

Note: JSON imports use `with { type: "json" }`. If an older Wrangler/esbuild rejects it, switch to `assert { type: "json" }` in `lib/tools.js`.

## Smoke test

```bash
node smoke.mjs    # REST routes, content sync, full MCP flow, M&A inventory and transaction path
```

## Library release 2.5.0

Adds the Carve-Out Perimeter & TSA Planner to the divestitures pillar, with its verified seven-tab workbook, five reciprocal resource relationships, and unchanged primary seven-stage transaction path. The inventory contains eighteen resources and twelve workbook downloads.

## Library release 2.6.0

Adds the Capital Allocation & Deal Affordability Tool to Strategic finance, with its verified workbook, five reciprocal resource relationships, and preserved primary seven-stage transaction path. The inventory contains nineteen resources and thirteen workbook downloads.
