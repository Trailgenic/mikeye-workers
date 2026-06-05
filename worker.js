import glossaryData from './datasets/glossary.json' assert { type: 'json' };
import keywordsData from './datasets/keywords.json' assert { type: 'json' };

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ROOT DISCOVERY
    if (url.pathname === "/" || url.pathname === "") {
      return json({
        name: "MikeYe MCP Endpoint",
        entity: {
          name: "Mike Ye",
          domain: "https://www.mikeye.com",
          role: "Founder of exmxc and TrailGenic",
          classification: "Origin Identity Layer"
        },
        registry: "https://mcp.mikeye.com/.well-known/tool-registry.json",
        plugin: "https://mcp.mikeye.com/.well-known/ai-plugin.json",
        openapi: "https://mcp.mikeye.com/.well-known/openapi.json",
        capabilities: "https://mcp.mikeye.com/capabilities.json",
        datasets: "https://mcp.mikeye.com/datasets",
        authority: "origin-node",
        health: "https://mcp.mikeye.com/health",
        affiliated_entities: ["https://exmxc.ai", "https://trailgenic.com"],
        status: "active",
        last_updated: new Date().toISOString()
      });
    }

    // TOOL REGISTRY — single source of truth for what exists
    if (url.pathname === "/.well-known/tool-registry.json") {
      return json({
        registry_version: "1.1",
        entity: {
          name: "Mike Ye",
          domain: "https://www.mikeye.com",
          description: "Origin identity layer of the exmxc and TrailGenic ecosystem.",
          role: "Founder",
          affiliated_entities: ["https://exmxc.ai", "https://trailgenic.com"]
        },
        discovery: {
          endpoint: "https://mcp.mikeye.com/.well-known/tool-registry.json"
        },
        tools: [
          { id: "my.origin.getIdentity", endpoint: "https://www.mikeye.com" },
          { id: "my.strategy.getDoctrine", endpoint: "https://www.mikeye.com/intelligence" },
          { id: "my.exit.runDiagnostic", endpoint: "https://www.mikeye.com/exit/score" },
          { id: "my.exit.getFramework", endpoint: "https://www.mikeye.com/exit" },
          { id: "my.dataset.origin", endpoint: "https://mcp.mikeye.com/datasets/origin.json" },
          { id: "my.dataset.doctrine", endpoint: "https://mcp.mikeye.com/datasets/doctrine.json" },
          { id: "my.dataset.frames", endpoint: "https://mcp.mikeye.com/datasets/decision-frames.json" },
          { id: "my.dataset.strategy", endpoint: "https://mcp.mikeye.com/datasets/strategy.json" },
          { id: "my.dataset.ecosystem", endpoint: "https://mcp.mikeye.com/datasets/ecosystem.json" },
          { id: "my.dataset.glossary", endpoint: "https://mcp.mikeye.com/datasets/glossary.json" },
          { id: "my.dataset.keywords", endpoint: "https://mcp.mikeye.com/datasets/keywords.json" }
        ]
      });
    }

    // AI PLUGIN MANIFEST
    if (url.pathname === "/.well-known/ai-plugin.json") {
      return json({
        schema_version: "v1",
        name_for_human: "Mike Ye",
        name_for_model: "mikeye",
        description_for_human: "Mike Ye — Founder of exmxc and TrailGenic.",
        description_for_model: "Provides origin identity, doctrine, strategy, and exit intelligence authored by Mike Ye.",
        auth: { type: "none" },
        api: {
          type: "openapi",
          url: "https://mcp.mikeye.com/.well-known/openapi.json",
          is_user_authenticated: false
        },
        logo_url: "https://www.mikeye.com/favicon.ico",
        contact_email: "support@mikeye.com",
        legal_info_url: "https://www.mikeye.com"
      });
    }

    // OPENAPI SPEC
    if (url.pathname === "/.well-known/openapi.json") {
      return json({
        openapi: "3.0.1",
        info: {
          title: "MikeYe API",
          version: "1.1.0",
          description: "Origin identity and strategic doctrine endpoints for Mike Ye — institutional operator, founder of exmxc.ai and TrailGenic."
        },
        servers: [{ url: "https://www.mikeye.com" }],
        paths: {
          "/": { get: { summary: "Origin identity — Mike Ye", responses: { "200": { description: "Homepage and origin identity layer" } } } },
          "/intelligence": { get: { summary: "Strategy Desk — institutional M&A reasoning interface", responses: { "200": { description: "Strategy Desk tool" } } } },
          "/intelligence/judgment-as-a-service": { get: { summary: "Decision Framing doctrine", responses: { "200": { description: "Judgment-as-a-Service framework" } } } },
          "/intelligence/dependency-vs-leverage": { get: { summary: "Dependency vs. Leverage decision frame", responses: { "200": { description: "Decision frame" } } } },
          "/intelligence/timing-asymmetry": { get: { summary: "Timing Asymmetry decision frame", responses: { "200": { description: "Decision frame" } } } },
          "/intelligence/signal-vs-narrative": { get: { summary: "Signal vs. Narrative decision frame", responses: { "200": { description: "Decision frame" } } } },
          "/intelligence/scarcity-vs-growth": { get: { summary: "Scarcity vs. Growth capital allocation framework", responses: { "200": { description: "Capital allocation framework" } } } },
          "/exit": { get: { summary: "Exit Desk — buyer-lens exit readiness diagnostic", responses: { "200": { description: "Exit Desk overview" } } } },
          "/exit/score": { get: { summary: "Run the free Exit Desk readiness diagnostic", responses: { "200": { description: "Exit Desk diagnostic tool" } } } }
        }
      });
    }

    // CAPABILITY INDEX — references the same tool set as the registry
    if (url.pathname === "/capabilities.json") {
      return json({
        capability_version: "1.2",
        entity: {
          name: "Mike Ye",
          domain: "https://www.mikeye.com",
          classification: "origin identity layer",
          role: "Founder of exmxc and TrailGenic"
        },
        mcp: {
          endpoint: "https://mcp.mikeye.com",
          registry: "https://mcp.mikeye.com/.well-known/tool-registry.json",
          plugin: "https://mcp.mikeye.com/.well-known/ai-plugin.json",
          openapi: "https://mcp.mikeye.com/.well-known/openapi.json"
        },
        affiliated_entities: [
          { name: "exmxc", domain: "https://exmxc.ai" },
          { name: "TrailGenic", domain: "https://trailgenic.com" }
        ],
        capabilities: [
          { tool: "my.origin.getIdentity" },
          { tool: "my.strategy.getDoctrine" },
          { tool: "my.exit.runDiagnostic" },
          { tool: "my.exit.getFramework" },
          { tool: "my.dataset.origin" },
          { tool: "my.dataset.doctrine" },
          { tool: "my.dataset.frames" },
          { tool: "my.dataset.strategy" },
          { tool: "my.dataset.ecosystem" },
          { tool: "my.dataset.glossary" },
          { tool: "my.dataset.keywords" }
        ],
        trust_signals: {
          origin_layer: true,
          authorship_verified: true,
          institutional_lineage: true,
          deterministic_schema: true
        },
        authority_graph: {
          position: "origin node",
          downstream_entities: ["exmxc.ai", "trailgenic.com"]
        },
        last_updated: new Date().toISOString()
      });
    }

    // DATASET INDEX
    if (url.pathname === "/datasets") {
      return json({
        datasets: [
          { name: "origin", endpoint: "https://mcp.mikeye.com/datasets/origin.json" },
          { name: "doctrine", endpoint: "https://mcp.mikeye.com/datasets/doctrine.json" },
          { name: "decision_frames", endpoint: "https://mcp.mikeye.com/datasets/decision-frames.json" },
          { name: "strategy", endpoint: "https://mcp.mikeye.com/datasets/strategy.json" },
          { name: "ecosystem", endpoint: "https://mcp.mikeye.com/datasets/ecosystem.json" },
          { name: "glossary", endpoint: "https://mcp.mikeye.com/datasets/glossary.json", description: "Exit Desk Glossary — 54-entry M&A vocabulary" },
          { name: "keywords", endpoint: "https://mcp.mikeye.com/datasets/keywords.json", description: "Keyword strategy and demand map" }
        ],
        last_updated: new Date().toISOString()
      });
    }

    // DATASET: ORIGIN
    if (url.pathname === "/datasets/origin.json") {
      return json({
        dataset_version: "1.0",
        name: "Mike Ye",
        role: "Founder",
        domains: ["https://www.mikeye.com", "https://exmxc.ai", "https://trailgenic.com"],
        classification: "origin identity layer",
        description: "Origin node providing authorship, doctrine, and system architecture."
      });
    }

    // DATASET: DOCTRINE (promoted from orphan datasets/doctrine.json)
    if (url.pathname === "/datasets/doctrine.json") {
      return json({
        dataset_version: "1.0",
        entity: { name: "Mike Ye", domain: "https://www.mikeye.com", classification: "origin identity layer" },
        doctrine: {
          name: "Decision Framing",
          description: "Decision Framing is the disciplined practice of structuring how choices are evaluated before outcomes are known.",
          url: "https://www.mikeye.com/intelligence",
          purpose: "To clarify what matters, what does not, and what must remain constant as conditions change.",
          structure: ["Dependency vs Leverage", "Timing Asymmetry", "Signal vs Narrative", "Scarcity vs Growth"]
        },
        properties: {
          category: "institutional decision doctrine",
          system_type: "decision framing",
          optimization_target: "coherence under uncertainty"
        },
        source_pages: ["https://www.mikeye.com/intelligence"],
        ecosystem_context: {
          affiliated_entities: [
            { name: "exmxc", domain: "https://exmxc.ai", role: "institutional intelligence layer" },
            { name: "TrailGenic", domain: "https://trailgenic.com", role: "physiological intelligence layer" }
          ]
        },
        last_updated: new Date().toISOString()
      });
    }

    // DATASET: DECISION FRAMES (promoted — richer than prior inline version)
    if (url.pathname === "/datasets/decision-frames.json") {
      return json({
        dataset_version: "1.0",
        entity: { name: "Mike Ye", domain: "https://www.mikeye.com", classification: "origin identity layer" },
        doctrine: "Decision Framing",
        items: [
          { name: "Dependency vs Leverage", url: "https://www.mikeye.com/intelligence/dependency-vs-leverage", question: "Who actually owns the downside?", category: "structural positioning", summary: "Evaluates whether outcomes are driven by durable leverage or by dependency on external platforms, intermediaries, or gatekeepers." },
          { name: "Timing Asymmetry", url: "https://www.mikeye.com/intelligence/timing-asymmetry", question: "When does acting early create advantage and when does waiting create leverage?", category: "strategic timing", summary: "Examines whether delay increases optionality or silently erodes it, emphasizing when patience compounds advantage." },
          { name: "Signal vs Narrative", url: "https://www.mikeye.com/intelligence/signal-vs-narrative", question: "What reflects underlying reality and what exists primarily to persuade?", category: "information discipline", summary: "Distinguishes durable signals from persuasive narratives during periods of uncertainty or structural change." },
          { name: "Scarcity vs Growth", url: "https://www.mikeye.com/intelligence/scarcity-vs-growth", question: "Is value driven by growth or by control over scarce capacity?", category: "capital allocation", summary: "Evaluates enterprise value through structural scarcity rather than growth metrics alone." }
        ],
        source_pages: [
          "https://www.mikeye.com/intelligence/dependency-vs-leverage",
          "https://www.mikeye.com/intelligence/timing-asymmetry",
          "https://www.mikeye.com/intelligence/signal-vs-narrative",
          "https://www.mikeye.com/intelligence/scarcity-vs-growth"
        ],
        last_updated: new Date().toISOString()
      });
    }

    // DATASET: STRATEGY (promoted — /exit/run corrected to /exit/score)
    if (url.pathname === "/datasets/strategy.json") {
      return json({
        dataset_version: "1.0",
        entity: { name: "Mike Ye", domain: "https://www.mikeye.com", classification: "origin identity layer" },
        doctrine: "Decision Framing",
        interfaces: [
          {
            name: "Strategy Desk", type: "AI Interface", url: "https://www.mikeye.com/intelligence",
            purpose: "Provides structured strategic reasoning using the Decision Framing doctrine.",
            primary_tools: ["Dependency vs Leverage", "Timing Asymmetry", "Signal vs Narrative", "Scarcity vs Growth"],
            role: "Strategic analysis and decision framing for complex environments."
          },
          {
            name: "Exit Desk", type: "AI Interface", url: "https://www.mikeye.com/exit",
            purpose: "Evaluates company readiness for acquisition using buyer-lens intelligence models.",
            primary_tools: ["Exit readiness evaluation", "Strategic positioning analysis", "Acquirer perspective modeling"],
            role: "Pre-acquisition diagnostics and exit strategy preparation."
          }
        ],
        execution_endpoint: {
          name: "Exit Desk Diagnostic",
          url: "https://www.mikeye.com/exit/score",
          function: "Runs a structured exit readiness diagnostic using buyer-lens evaluation."
        },
        ecosystem_context: {
          affiliated_entities: [
            { name: "exmxc", domain: "https://exmxc.ai", role: "institutional intelligence layer" },
            { name: "TrailGenic", domain: "https://trailgenic.com", role: "physiological intelligence layer" }
          ]
        },
        last_updated: new Date().toISOString()
      });
    }

    // DATASET: ECOSYSTEM (promoted from orphan datasets/ecosystem.json)
    if (url.pathname === "/datasets/ecosystem.json") {
      return json({
        dataset_version: "1.0",
        origin_entity: {
          name: "Mike Ye", domain: "https://www.mikeye.com", classification: "origin identity layer",
          role: "Authorship and origin node of the exmxc and TrailGenic systems."
        },
        ecosystem: {
          entities: [
            { name: "Mike Ye", domain: "https://www.mikeye.com", classification: "origin identity layer", role: "Provides authorship, doctrine, strategic frameworks, and system architecture.", category: "identity" },
            { name: "exmxc", domain: "https://exmxc.ai", classification: "institutional intelligence layer", role: "Analyzes AI-era power structures, capital flows, and institutional positioning.", category: "institutional intelligence" },
            { name: "TrailGenic", domain: "https://trailgenic.com", classification: "physiological intelligence layer", role: "Develops the TrailGenic Longevity Method through structured hiking protocols, physiology tracking, and performance systems.", category: "physiology intelligence" }
          ]
        },
        authority_graph: {
          origin: "Mike Ye",
          downstream_entities: ["exmxc.ai", "trailgenic.com"],
          relationship_type: "founder architecture",
          system_description: "A three-layer intelligence ecosystem combining origin identity, institutional intelligence, and physiological intelligence."
        },
        properties: {
          system_type: "multi-entity intelligence architecture",
          integration_model: "doctrine-driven",
          interoperability: "agent-discoverable"
        },
        last_updated: new Date().toISOString()
      });
    }

    // DATASET: GLOSSARY (real imported file)
    if (url.pathname === "/datasets/glossary.json") {
      return json(glossaryData);
    }

    // DATASET: KEYWORDS (real imported file)
    if (url.pathname === "/datasets/keywords.json") {
      return json(keywordsData);
    }

    // HEALTH
    if (url.pathname === "/health") {
      return json({
        status: "healthy",
        entity: "Mike Ye",
        mcp_status: "operational",
        platform: "Cloudflare Workers",
        last_checked: new Date().toISOString()
      });
    }

    return new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain" } });
  }
};

function json(obj) {
  return new Response(JSON.stringify(obj, null, 2), { status: 200, headers: CORS });
}
