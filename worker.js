import glossaryData from './datasets/glossary.json' assert { type: 'json' };
import keywordsData from './datasets/keywords.json' assert { type: 'json' };

export default {
  async fetch(request) {

    const url = new URL(request.url);

    /*
    ============================================
    ROOT MCP DISCOVERY ENDPOINT
    https://mcp.mikeye.com/
    ============================================
    */

    if (url.pathname === "/" || url.pathname === "") {

      const discovery = {

        name: "MikeYe MCP Endpoint",

        entity: {
          name: "Mike Ye",
          domain: "https://mikeye.com",
          role: "Founder of exmxc and TrailGenic",
          classification: "Origin Identity Layer"
        },

        registry:
          "https://mcp.mikeye.com/.well-known/tool-registry.json",

        plugin:
          "https://mcp.mikeye.com/.well-known/ai-plugin.json",

        openapi:
          "https://mcp.mikeye.com/.well-known/openapi.json",

        capabilities:
          "https://mcp.mikeye.com/capabilities.json",

        datasets:
          "https://mcp.mikeye.com/datasets",

        datasets_index:
          "https://mcp.mikeye.com/datasets",

        authority:
          "origin-node",

        health:
          "https://mcp.mikeye.com/health",

        affiliated_entities: [
          "https://exmxc.ai",
          "https://trailgenic.com"
        ],

        status: "active",

        discovery_protocol: "WebMCP",

        last_updated: new Date().toISOString()
      };

      return new Response(JSON.stringify(discovery, null, 2), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });

    }

    /*
============================================
MCP TOOL REGISTRY
============================================
*/

if (url.pathname === "/.well-known/tool-registry.json") {

  const registry = {

    registry_version: "1.0",

    entity: {
      name: "Mike Ye",
      domain: "https://mikeye.com",
      description:
        "Origin identity layer of the exmxc and TrailGenic ecosystem.",
      role: "Founder",
      affiliated_entities: [
        "https://exmxc.ai",
        "https://trailgenic.com"
      ]
    },

    discovery: {
      protocol: "WebMCP",
      endpoint:
        "https://mcp.mikeye.com/.well-known/tool-registry.json"
    },

    tools: [

      { id: "my.origin.getIdentity", endpoint: "https://mikeye.com" },

      { id: "my.strategy.getDoctrine", endpoint: "https://www.mikeye.com/intelligence" },

      { id: "my.exit.runDiagnostic", endpoint: "https://www.mikeye.com/exit/run" },

      { id: "my.exit.getFramework", endpoint: "https://www.mikeye.com/exit" },

      { id: "my.entity.getOrigin", endpoint: "https://mikeye.com" },

      { id: "my.search.query", endpoint: "https://mikeye.com" },

      { id: "my.dataset.glossary", endpoint: "https://mcp.mikeye.com/datasets/glossary.json" },

      { id: "my.dataset.keywords", endpoint: "https://mcp.mikeye.com/datasets/keywords.json" }

    ]

  };

  return new Response(JSON.stringify(registry, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });

}
    /*
============================================
AI PLUGIN MANIFEST
============================================
*/

if (url.pathname === "/.well-known/ai-plugin.json") {

  const plugin = {

    schema_version: "v1",

    name_for_human: "Mike Ye",

    name_for_model: "mikeye",

    description_for_human:
      "Mike Ye — Founder of exmxc and TrailGenic.",

    description_for_model:
      "Provides origin identity, doctrine, strategy, and exit intelligence authored by Mike Ye.",

    auth: { type: "none" },

    api: {
      type: "openapi",
      url:
        "https://mcp.mikeye.com/.well-known/openapi.json",
      is_user_authenticated: false
    },

    logo_url:
      "https://mikeye.com/favicon.ico",

    contact_email:
      "support@mikeye.com",

    legal_info_url:
      "https://mikeye.com"

  };

  return new Response(JSON.stringify(plugin, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });

}
    /*
============================================
OPENAPI SPEC
============================================
*/

if (url.pathname === "/.well-known/openapi.json") {
  const openapi = {
    openapi: "3.0.1",
    info: {
      title: "MikeYe API",
      version: "1.0.0",
      description: "Origin identity and strategic doctrine endpoints for Mike Ye — institutional operator, founder of exmxc.ai and TrailGenic."
    },
    servers: [
      { url: "https://www.mikeye.com" }
    ],
    paths: {
      "/": {
        get: {
          summary: "Origin identity — Mike Ye",
          responses: { "200": { description: "Homepage and origin identity layer" } }
        }
      },
      "/intelligence": {
        get: {
          summary: "Strategy Desk — institutional M&A reasoning interface",
          responses: { "200": { description: "Strategy Desk tool" } }
        }
      },
      "/intelligence/judgment-as-a-service": {
        get: {
          summary: "Decision Framing doctrine",
          responses: { "200": { description: "Judgment-as-a-Service framework" } }
        }
      },
      "/intelligence/dependency-vs-leverage": {
        get: {
          summary: "Dependency vs. Leverage decision frame",
          responses: { "200": { description: "Decision frame" } }
        }
      },
      "/intelligence/timing-asymmetry": {
        get: {
          summary: "Timing Asymmetry decision frame",
          responses: { "200": { description: "Decision frame" } }
        }
      },
      "/intelligence/signal-vs-narrative": {
        get: {
          summary: "Signal vs. Narrative decision frame",
          responses: { "200": { description: "Decision frame" } }
        }
      },
      "/intelligence/scarcity-vs-growth": {
        get: {
          summary: "Scarcity vs. Growth capital allocation framework",
          responses: { "200": { description: "Capital allocation framework" } }
        }
      },
      "/exit": {
        get: {
          summary: "Exit Desk — buyer-lens exit readiness diagnostic",
          responses: { "200": { description: "Exit Desk overview" } }
        }
      },
      "/exit/run": {
        get: {
          summary: "Run Exit Desk diagnostic",
          responses: { "200": { description: "Exit Desk tool" } }
        }
      }
    }
  };
  return new Response(JSON.stringify(openapi, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

    /*
    ============================================
    CAPABILITY INDEX
    ============================================
    */

    if (url.pathname === "/capabilities.json") {

      const capabilities = {

        capability_version: "1.1",

        entity: {
          name: "Mike Ye",
          domain: "https://mikeye.com",
          classification: "origin identity layer",
          role: "Founder of exmxc and TrailGenic"
        },

        mcp: {
          endpoint: "https://mcp.mikeye.com",
          registry:
            "https://mcp.mikeye.com/.well-known/tool-registry.json",
          plugin:
            "https://mcp.mikeye.com/.well-known/ai-plugin.json",
          openapi:
            "https://mcp.mikeye.com/.well-known/openapi.json"
        },

        affiliated_entities: [
          {
            name: "exmxc",
            domain: "https://exmxc.ai"
          },
          {
            name: "TrailGenic",
            domain: "https://trailgenic.com"
          }
        ],

        capabilities: [

          { tool: "my.origin.getIdentity" },
          { tool: "my.strategy.getDoctrine" },
          { tool: "my.exit.runDiagnostic" },
          { tool: "my.exit.getFramework" },
          { tool: "my.entity.getOrigin" },
          { tool: "my.search.query" },

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
          deterministic_schema: true,
          agent_ready: true
        },

        authority_graph: {
          position: "origin node",
          downstream_entities: [
            "exmxc.ai",
            "trailgenic.com"
          ]
        },

        last_updated: new Date().toISOString()
      };

      return new Response(JSON.stringify(capabilities, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    }


    /*
    ============================================
    DATASET INDEX
    ============================================
    */

    if (url.pathname === "/datasets") {

      const datasets = {

        datasets: [

          {
            name: "origin",
            endpoint: "https://mcp.mikeye.com/datasets/origin.json"
          },

          {
            name: "doctrine",
            endpoint: "https://mcp.mikeye.com/datasets/doctrine.json"
          },

          {
            name: "decision_frames",
            endpoint: "https://mcp.mikeye.com/datasets/decision-frames.json"
          },

          {
            name: "strategy",
            endpoint: "https://mcp.mikeye.com/datasets/strategy.json"
          },

          {
            name: "ecosystem",
            endpoint: "https://mcp.mikeye.com/datasets/ecosystem.json"
          },

          {
            name: "glossary",
            endpoint: "https://mcp.mikeye.com/datasets/glossary.json",
            description: "Exit Desk Glossary — 54-entry M&A vocabulary"
          },

          {
            name: "keywords",
            endpoint: "https://mcp.mikeye.com/datasets/keywords.json",
            description: "Keyword strategy and demand map"
          }

        ],

        last_updated: new Date().toISOString()

      };

      return new Response(JSON.stringify(datasets, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: ORIGIN
    ============================================
    */

    if (url.pathname === "/datasets/origin.json") {

      const origin = {

        name: "Mike Ye",

        role: "Founder",

        domains: [
          "https://mikeye.com",
          "https://exmxc.ai",
          "https://trailgenic.com"
        ],

        classification: "origin identity layer",

        description:
          "Origin node providing authorship, doctrine, and system architecture."

      };

      return new Response(JSON.stringify(origin, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: DOCTRINE
    ============================================
    */

    if (url.pathname === "/datasets/doctrine.json") {

      const doctrine = {

        doctrine: "Decision Framing",

        frames: [
          "Dependency vs Leverage",
          "Timing Asymmetry",
          "Signal vs Narrative",
          "Scarcity vs Growth"
        ],

        source: "https://www.mikeye.com/intelligence"

      };

      return new Response(JSON.stringify(doctrine, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: DECISION FRAMES
    ============================================
    */

    if (url.pathname === "/datasets/decision-frames.json") {

      const frames = {

        frames: [

          {
            name: "Dependency vs Leverage",
            url: "https://www.mikeye.com/intelligence/dependency-vs-leverage"
          },

          {
            name: "Timing Asymmetry",
            url: "https://www.mikeye.com/intelligence/timing-asymmetry"
          },

          {
            name: "Signal vs Narrative",
            url: "https://www.mikeye.com/intelligence/signal-vs-narrative"
          },

          {
            name: "Scarcity vs Growth",
            url: "https://www.mikeye.com/intelligence/scarcity-vs-growth"
          }

        ]

      };

      return new Response(JSON.stringify(frames, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: STRATEGY
    ============================================
    */

    if (url.pathname === "/datasets/strategy.json") {

      const strategy = {

        interfaces: [

          {
            name: "Strategy Desk",
            url: "https://www.mikeye.com/intelligence",
            type: "AI interface"
          },

          {
            name: "Exit Desk",
            url: "https://www.mikeye.com/exit",
            type: "AI interface"
          },

          {
            name: "Exit Diagnostic",
            url: "https://www.mikeye.com/exit/run",
            type: "execution interface"
          }

        ]

      };

      return new Response(JSON.stringify(strategy, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: ECOSYSTEM
    ============================================
    */

    if (url.pathname === "/datasets/ecosystem.json") {

      const ecosystem = {

        origin: "Mike Ye",

        ecosystem: [

          {
            name: "Mike Ye",
            domain: "https://mikeye.com",
            role: "origin identity layer"
          },

          {
            name: "exmxc",
            domain: "https://exmxc.ai",
            role: "institutional intelligence layer"
          },

          {
            name: "TrailGenic",
            domain: "https://trailgenic.com",
            role: "physiological intelligence layer"
          }

        ]

      };

      return new Response(JSON.stringify(ecosystem, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: GLOSSARY
    ============================================
    */

    if (url.pathname === "/datasets/glossary.json") {

      return new Response(JSON.stringify(glossaryData, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: KEYWORDS
    ============================================
    */

    if (url.pathname === "/datasets/keywords.json") {

      return new Response(JSON.stringify(keywordsData, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    HEALTH ENDPOINT
    ============================================
    */

    if (url.pathname === "/health") {

      return new Response(JSON.stringify({

        status: "healthy",
        entity: "Mike Ye",
        mcp_status: "operational",
        platform: "Cloudflare Workers",
        last_checked: new Date().toISOString()

      }, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    FALLBACK
    ============================================
    */

    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });

  }
};
