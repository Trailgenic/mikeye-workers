export default {
  async fetch(request) {

    const url = new URL(request.url);

    /*
    ============================================
    ROOT MCP DISCOVERY ENDPOINT
    ============================================
    https://mcp.mikeye.com/
    */
    if (url.pathname === "/" || url.pathname === "") {

      const discovery = {

        name: "MikeYe MCP Endpoint",

        entity: {
          name: "Mike Ye",
          domain: "https://mikeye.com",
          role: "Founder of exmxc and TrailGenic"
        },

        registry:
          "https://mcp.mikeye.com/.well-known/tool-registry.json",

        plugin:
          "https://mcp.mikeye.com/.well-known/ai-plugin.json",

        openapi:
          "https://mcp.mikeye.com/.well-known/openapi.json",

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

          {
            id: "my.origin.getIdentity",
            endpoint: "https://mikeye.com/about"
          },

          {
            id: "my.strategy.getDoctrine",
            endpoint: "https://mikeye.com/strategy-desk"
          },

          {
            id: "my.exit.runDiagnostic",
            endpoint: "https://mikeye.com/exit/run"
          },

          {
            id: "my.exit.getFramework",
            endpoint: "https://mikeye.com/exit"
          },

          {
            id: "my.entity.getOrigin",
            endpoint: "https://mikeye.com"
          },

          {
            id: "my.search.query",
            endpoint: "https://mikeye.com"
          }

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
    AI PLUGIN MANIFEST
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

        auth: {
          type: "none"
        },

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
    OPENAPI SPECIFICATION
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
          {
            url: "https://mikeye.com"
          }
        ],

        paths: {

          "/about": {
            get: {
              summary: "Retrieve origin identity information",
              responses: {
                "200": { description: "About page" }
              }
            }
          },

          "/exit": {
            get: {
              summary: "Retrieve exit intelligence frameworks",
              responses: {
                "200": { description: "Exit desk page" }
              }
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

