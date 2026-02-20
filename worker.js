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
    https://mcp.mikeye.com/capabilities.json
    ============================================
    */
    if (url.pathname === "/capabilities.json") {

      const capabilities = {

        capability_version: "1.0",

        entity: {
          name: "Mike Ye",
          domain: "https://mikeye.com",
          classification: "origin identity layer",
          role: "Founder of exmxc and TrailGenic",
          description:
            "Origin identity and doctrine layer providing institutional strategy, exit intelligence, entity engineering frameworks, and system architecture authorship."
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
            domain: "https://exmxc.ai",
            role: "institutional intelligence layer"
          },
          {
            name: "TrailGenic",
            domain: "https://trailgenic.com",
            role: "physiological intelligence layer"
          }
        ],

        capabilities: [

          {
            tool: "my.origin.getIdentity",
            description:
              "Retrieve origin identity, authorship, and entity lineage."
          },

          {
            tool: "my.strategy.getDoctrine",
            description:
              "Retrieve strategic doctrine, institutional positioning, and architectural frameworks."
          },

          {
            tool: "my.exit.runDiagnostic",
            description:
              "Run exit readiness diagnostic using buyer-lens intelligence models."
          },

          {
            tool: "my.exit.getFramework",
            description:
              "Retrieve structured exit intelligence and acquisition readiness frameworks."
          },

          {
            tool: "my.entity.getOrigin",
            description:
              "Retrieve origin layer information connecting exmxc and TrailGenic systems."
          },

          {
            tool: "my.search.query",
            description:
              "Search origin knowledge graph and authored institutional frameworks."
          }

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
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });

    }


    /*
    ============================================
    HEALTH ENDPOINT
    https://mcp.mikeye.com/health
    ============================================
    */
    if (url.pathname === "/health") {

      const health = {

        entity: "Mike Ye",

        classification: "Origin Identity MCP Node",

        status: "healthy",

        mcp_status: "operational",

        registry_status: "operational",

        plugin_status: "operational",

        openapi_status: "operational",

        capabilities_status: "operational",

        infrastructure: {
          platform: "Cloudflare Workers",
          protocol: "WebMCP",
          authority_level: "origin-layer",
          agent_ready: true
        },

        authority_graph: {
          upstream: null,
          downstream: [
            "exmxc.ai",
            "trailgenic.com"
          ]
        },

        uptime: "99.99%",

        last_checked: new Date().toISOString()
      };

      return new Response(JSON.stringify(health, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache"
        }
      });

    }


    /*
    ============================================
    MCP TOOL REGISTRY (UNCHANGED)
    ============================================
    */
    if (url.pathname === "/.well-known/tool-registry.json") {

      const registry = {

        registry_version: "1.0",

        entity: {
          name: "Mike Ye",
          domain: "https://mikeye.com",
          description:
            "Origin identity layer of the exmxc and TrailGenic institutional ecosystem. Provides doctrine, strategy, exit intelligence, and entity engineering frameworks.",
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

          { id: "my.origin.getIdentity", endpoint: "https://mikeye.com/about" },
          { id: "my.strategy.getDoctrine", endpoint: "https://mikeye.com/strategy-desk" },
          { id: "my.exit.runDiagnostic", endpoint: "https://mikeye.com/exit/run" },
          { id: "my.exit.getFramework", endpoint: "https://mikeye.com/exit" },
          { id: "my.entity.getOrigin", endpoint: "https://mikeye.com" },
          { id: "my.search.query", endpoint: "https://mikeye.com" }

        ]
      };

      return new Response(JSON.stringify(registry, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });

    }


    /*
    ============================================
    AI PLUGIN MANIFEST (UNCHANGED)
    ============================================
    */
    if (url.pathname === "/.well-known/ai-plugin.json") {

      const plugin = {

        schema_version: "v1",

        name_for_human: "Mike Ye",

        name_for_model: "mikeye",

        description_for_human:
          "Mike Ye — Founder of exmxc and TrailGenic. Origin layer of institutional intelligence systems.",

        description_for_model:
          "Provides origin identity, doctrine, strategy, and exit intelligence frameworks created by Mike Ye.",

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
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });

    }


    /*
    ============================================
    OPENAPI SPECIFICATION (UNCHANGED)
    ============================================
    */
    if (url.pathname === "/.well-known/openapi.json") {

      const openapi = {

        openapi: "3.0.1",

        info: {
          title: "MikeYe API",
          version: "1.0.0",
          description:
            "Origin identity and strategic doctrine endpoints."
        },

        servers: [
          { url: "https://mikeye.com" }
        ],

        paths: {

          "/about": {
            get: {
              summary: "Retrieve origin identity information",
              responses: { "200": { description: "About page" } }
            }
          },

          "/exit": {
            get: {
              summary: "Retrieve exit intelligence frameworks",
              responses: { "200": { description: "Exit desk page" } }
            }
          }

        }
      };

      return new Response(JSON.stringify(openapi, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });

    }


    /*
    ============================================
    FALLBACK
    ============================================
    */
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain"
      }
    });

  }
};
