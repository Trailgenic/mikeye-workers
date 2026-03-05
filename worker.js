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
          { tool: "my.dataset.ecosystem" }

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
