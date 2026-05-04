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
            description: "Exit Desk Glossary — 53-entry M&A vocabulary"
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

      const glossary = {
  "name": "Exit Desk Glossary",
  "description": "M&A and exit-readiness vocabulary defined for small business owners — 52 entries authored by Mike Ye from twenty-five years and $7.4B of buy-side and sell-side judgment. Every term includes a definition, a seller-perspective implication, and a buyer-perspective observation.",
  "hub_url": "https://www.mikeye.com/glossary",
  "schema_type": "DefinedTermSet",
  "categories": [
    "The Money",
    "The Mechanics",
    "The People",
    "The Process",
    "The Frameworks"
  ],
  "voice": "Plain English, seller-focused, buyer-perspective. Definitions are citation-friendly. Implications and lens observations are factual without being prescriptive — the diagnostic work lives in the Exit Desk report.",
  "audience": "Small business owners considering a sale, including sub-$1M owner-operated businesses where the median deal size is approximately $350,000.",
  "entries": [
    {
      "name": "Add-backs",
      "slug": "add-backs",
      "url": "https://www.mikeye.com/glossary/add-backs",
      "category": "The Money",
      "summary": "Expenses on your books that don't really belong to the business — added back to show your true earnings."
    },
    {
      "name": "AI Exposure Assessment",
      "slug": "ai-exposure-assessment",
      "url": "https://www.mikeye.com/glossary/ai-exposure-assessment",
      "category": "The Frameworks",
      "summary": "A buyer-perspective evaluation of how artificial intelligence is reshaping your industry — and what that means for the value of your business at exit."
    },
    {
      "name": "Asset Sale vs Stock Sale",
      "slug": "asset-sale-vs-stock-sale",
      "url": "https://www.mikeye.com/glossary/asset-sale-vs-stock-sale",
      "category": "The Mechanics",
      "summary": "The two ways a business changes hands — and one of them usually saves the buyer hundreds of thousands in taxes at your expense."
    },
    {
      "name": "Buyer-Lens Analysis",
      "slug": "buyer-lens-analysis",
      "url": "https://www.mikeye.com/glossary/buyer-lens-analysis",
      "category": "The Frameworks",
      "summary": "The methodology behind Exit Desk — looking at your business the way a serious buyer will, before you sit down with one."
    },
    {
      "name": "Buyer-Ready Business",
      "slug": "buyer-ready-business",
      "url": "https://www.mikeye.com/glossary/buyer-ready-business",
      "category": "The People",
      "summary": "A business that's been deliberately prepared for sale — clean financials, documented systems, transferable customer relationships, a real management team."
    },
    {
      "name": "CIM (Confidential Information Memorandum)",
      "slug": "cim-confidential-information-memorandum",
      "url": "https://www.mikeye.com/glossary/cim-confidential-information-memorandum",
      "category": "The Process",
      "summary": "The marketing document that sells your business to qualified buyers — your story, your numbers, your case for the price you want."
    },
    {
      "name": "Customer Concentration",
      "slug": "customer-concentration",
      "url": "https://www.mikeye.com/glossary/customer-concentration",
      "category": "The People",
      "summary": "How much of your revenue depends on your biggest customers — and why buyers care more than you'd expect."
    },
    {
      "name": "Customer Concentration Discount",
      "slug": "customer-concentration-discount",
      "url": "https://www.mikeye.com/glossary/customer-concentration-discount",
      "category": "The People",
      "summary": "The amount buyers knock off your price because they're worried about losing a key customer after the sale."
    },
    {
      "name": "Deal Fatigue",
      "slug": "deal-fatigue",
      "url": "https://www.mikeye.com/glossary/deal-fatigue",
      "category": "The Process",
      "summary": "The exhaustion that sets in during a long deal process — and one of the most common reasons sellers accept worse terms than they should."
    },
    {
      "name": "Diligence Pressure Map",
      "slug": "diligence-pressure-map",
      "url": "https://www.mikeye.com/glossary/diligence-pressure-map",
      "category": "The Frameworks",
      "summary": "A buyer-perspective view of where due diligence will focus first on your business — one of the four core deliverables of an Exit Desk report."
    },
    {
      "name": "Disallowed Add-backs",
      "slug": "disallowed-add-backs",
      "url": "https://www.mikeye.com/glossary/disallowed-add-backs",
      "category": "The Money",
      "summary": "The add-backs buyers refuse to accept — and how they cost you more than the line item."
    },
    {
      "name": "DSO and Vertical Roll-Ups",
      "slug": "dso-and-vertical-roll-ups",
      "url": "https://www.mikeye.com/glossary/dso-and-vertical-roll-ups",
      "category": "The Mechanics",
      "summary": "Industry-specific roll-up vehicles — DSO for dental, MSO for medical, others for HVAC, plumbing, vet, and accounting — increasingly the dominant buyer for small practices."
    },
    {
      "name": "Due Diligence (What Kills the Deal)",
      "slug": "due-diligence",
      "url": "https://www.mikeye.com/glossary/due-diligence",
      "category": "The Process",
      "summary": "The 30–90 day period where the buyer verifies everything you said about the business — and where the most deals fall apart."
    },
    {
      "name": "Earnout",
      "slug": "earnout",
      "url": "https://www.mikeye.com/glossary/earnout",
      "category": "The Mechanics",
      "summary": "A piece of your sale price you only get paid if the business hits future targets after closing."
    },
    {
      "name": "Earnout vs Cash at Close",
      "slug": "earnout-vs-cash-at-close",
      "url": "https://www.mikeye.com/glossary/earnout-vs-cash-at-close",
      "category": "The Mechanics",
      "summary": "A higher headline price with an earnout often beats a lower all-cash offer — until you do the math."
    },
    {
      "name": "EBITDA",
      "slug": "ebitda",
      "url": "https://www.mikeye.com/glossary/ebitda",
      "category": "The Money",
      "summary": "The earnings number buyers use to value mid-sized businesses. Stands for Earnings Before Interest, Taxes, Depreciation, and Amortization."
    },
    {
      "name": "Escrow",
      "slug": "escrow",
      "url": "https://www.mikeye.com/glossary/escrow",
      "category": "The Mechanics",
      "summary": "A neutral third-party account that holds money during a deal — so neither side can grab it if things go sideways."
    },
    {
      "name": "ESOP vs Strategic Sale",
      "slug": "esop-vs-strategic-sale",
      "url": "https://www.mikeye.com/glossary/esop-vs-strategic-sale",
      "category": "The Mechanics",
      "summary": "Selling to your employees through an Employee Stock Ownership Plan vs. selling to an outside buyer — different tax treatment, different price, different legacy."
    },
    {
      "name": "Financial Buyer",
      "slug": "financial-buyer",
      "url": "https://www.mikeye.com/glossary/financial-buyer",
      "category": "The People",
      "summary": "An investor (usually a private equity firm) buying your business as an investment — pays based on return, not strategic fit."
    },
    {
      "name": "Founder Dependence",
      "slug": "founder-dependence",
      "url": "https://www.mikeye.com/glossary/founder-dependence",
      "category": "The Frameworks",
      "summary": "The specific form of owner dependency unique to founder-led businesses — where the founder is also the original visionary, the relationship hub, and the operational center."
    },
    {
      "name": "Going to Market",
      "slug": "going-to-market",
      "url": "https://www.mikeye.com/glossary/going-to-market",
      "category": "The Process",
      "summary": "The point at which a business actively starts engaging buyers — and the moment the seller's leverage peaks or collapses depending on preparation."
    },
    {
      "name": "Holdback",
      "slug": "holdback",
      "url": "https://www.mikeye.com/glossary/holdback",
      "category": "The Mechanics",
      "summary": "Money the buyer keeps from your sale price for a set period — in case something goes wrong after closing."
    },
    {
      "name": "Indemnification",
      "slug": "indemnification",
      "url": "https://www.mikeye.com/glossary/indemnification",
      "category": "The Mechanics",
      "summary": "Your contractual promise to make the buyer whole if something you said about the business turns out to be wrong."
    },
    {
      "name": "Independent Sponsor",
      "slug": "independent-sponsor",
      "url": "https://www.mikeye.com/glossary/independent-sponsor",
      "category": "The People",
      "summary": "A buyer who finds the deal first, then raises the capital to do it — flexible, often credible, but harder to validate than a traditional PE buyer."
    },
    {
      "name": "Key-Person Risk",
      "slug": "key-person-risk",
      "url": "https://www.mikeye.com/glossary/key-person-risk",
      "category": "The People",
      "summary": "The risk that the business depends too heavily on one person — usually the owner, sometimes a key employee — to keep functioning."
    },
    {
      "name": "LOI (Letter of Intent)",
      "slug": "loi-letter-of-intent",
      "url": "https://www.mikeye.com/glossary/loi-letter-of-intent",
      "category": "The Process",
      "summary": "The non-binding document where a buyer puts their offer in writing — and where most of the deal actually gets decided."
    },
    {
      "name": "Management Buy-In (MBI)",
      "slug": "management-buy-in-mbi",
      "url": "https://www.mikeye.com/glossary/management-buy-in-mbi",
      "category": "The Mechanics",
      "summary": "When an outside executive (or team) buys the business and steps in to run it — common with search funders and turnaround buyers."
    },
    {
      "name": "Management Buyout (MBO)",
      "slug": "management-buyout-mbo",
      "url": "https://www.mikeye.com/glossary/management-buyout-mbo",
      "category": "The Mechanics",
      "summary": "When your existing management team buys the business from you — sometimes the cleanest exit, sometimes the most complicated."
    },
    {
      "name": "Material Adverse Change (MAC)",
      "slug": "material-adverse-change-mac",
      "url": "https://www.mikeye.com/glossary/material-adverse-change-mac",
      "category": "The Mechanics",
      "summary": "A clause that lets the buyer walk away from the deal if something really bad happens to your business between LOI and closing."
    },
    {
      "name": "NDA (Non-Disclosure Agreement)",
      "slug": "nda-non-disclosure-agreement",
      "url": "https://www.mikeye.com/glossary/nda-non-disclosure-agreement",
      "category": "The Process",
      "summary": "The first document a buyer signs before seeing your numbers — and the only thing protecting your business from competitive damage."
    },
    {
      "name": "Owner Dependency",
      "slug": "owner-dependency",
      "url": "https://www.mikeye.com/glossary/owner-dependency",
      "category": "The People",
      "summary": "How much the business needs you personally to keep running — the single biggest valuation killer in small-business sales."
    },
    {
      "name": "Owner Dependency Discount",
      "slug": "owner-dependency-discount",
      "url": "https://www.mikeye.com/glossary/owner-dependency-discount",
      "category": "The People",
      "summary": "The price cut buyers apply when the business depends too much on you — usually 20%–40% off the multiple."
    },
    {
      "name": "PE Roll-Up",
      "slug": "pe-roll-up",
      "url": "https://www.mikeye.com/glossary/pe-roll-up",
      "category": "The Mechanics",
      "summary": "A private equity strategy that buys many small businesses in the same industry and combines them into one larger company — often the buyer behind small-business sales today."
    },
    {
      "name": "Pre-Market Action Plan",
      "slug": "pre-market-action-plan",
      "url": "https://www.mikeye.com/glossary/pre-market-action-plan",
      "category": "The Frameworks",
      "summary": "A ranked, sequenced list of the specific work to do before going to market — one of the four core deliverables of an Exit Desk report."
    },
    {
      "name": "Pre-Market Preparation",
      "slug": "pre-market-preparation",
      "url": "https://www.mikeye.com/glossary/pre-market-preparation",
      "category": "The Process",
      "summary": "The work done before going to market to maximize valuation, attract better buyers, and reduce the risk of a deal falling apart in diligence."
    },
    {
      "name": "Quality of Earnings (QoE)",
      "slug": "quality-of-earnings",
      "url": "https://www.mikeye.com/glossary/quality-of-earnings",
      "category": "The Money",
      "summary": "A formal report that rebuilds your earnings from scratch — what serious buyers commission before they close."
    },
    {
      "name": "Recasting Financials",
      "slug": "recasting-financials",
      "url": "https://www.mikeye.com/glossary/recasting-financials",
      "category": "The Mechanics",
      "summary": "Restating your financial statements to show what the business really earns — the work behind every credible add-back."
    },
    {
      "name": "Recurring Revenue",
      "slug": "recurring-revenue",
      "url": "https://www.mikeye.com/glossary/recurring-revenue",
      "category": "The Mechanics",
      "summary": "Revenue that automatically continues each period under contract or subscription — the highest-quality form of revenue for valuation purposes."
    },
    {
      "name": "Rep and Warranty Insurance",
      "slug": "rep-and-warranty-insurance",
      "url": "https://www.mikeye.com/glossary/rep-and-warranty-insurance",
      "category": "The Mechanics",
      "summary": "A policy that covers the buyer if they discover problems after closing — and lets you keep more of your sale price up front."
    },
    {
      "name": "Re-trade",
      "slug": "re-trade",
      "url": "https://www.mikeye.com/glossary/re-trade",
      "category": "The Mechanics",
      "summary": "When a buyer lowers the price after the LOI is signed — usually citing something they 'found' during diligence."
    },
    {
      "name": "Rollover Equity",
      "slug": "rollover-equity",
      "url": "https://www.mikeye.com/glossary/rollover-equity",
      "category": "The Mechanics",
      "summary": "When the seller keeps a piece of the business by reinvesting some of the sale proceeds into the new ownership structure."
    },
    {
      "name": "SDE (Seller's Discretionary Earnings)",
      "slug": "sde-sellers-discretionary-earnings",
      "url": "https://www.mikeye.com/glossary/sde-sellers-discretionary-earnings",
      "category": "The Money",
      "summary": "The earnings number that matters for most small businesses. Includes the owner's salary, benefits, and personal expenses."
    },
    {
      "name": "SDE vs EBITDA",
      "slug": "sde-vs-ebitda",
      "url": "https://www.mikeye.com/glossary/sde-vs-ebitda",
      "category": "The Money",
      "summary": "Which earnings number applies to your business — and why most small businesses use SDE, not EBITDA."
    },
    {
      "name": "Search Fund Buyer",
      "slug": "search-fund-buyer",
      "url": "https://www.mikeye.com/glossary/search-fund-buyer",
      "category": "The People",
      "summary": "An entrepreneur-investor pair raising capital specifically to buy and run one small business — a fast-growing buyer type for $1M–$10M deals."
    },
    {
      "name": "Sellability / Exit Readiness",
      "slug": "sellability-exit-readiness",
      "url": "https://www.mikeye.com/glossary/sellability-exit-readiness",
      "category": "The People",
      "summary": "The measure of how prepared your business is to be sold — and what buyers will see when they evaluate it."
    },
    {
      "name": "Seller Financing",
      "slug": "seller-financing",
      "url": "https://www.mikeye.com/glossary/seller-financing",
      "category": "The Mechanics",
      "summary": "When you, the seller, lend the buyer part of the purchase price — common in small-business deals, and not always optional."
    },
    {
      "name": "Strategic Buyer",
      "slug": "strategic-buyer",
      "url": "https://www.mikeye.com/glossary/strategic-buyer",
      "category": "The People",
      "summary": "A company in your industry buying yours for synergy, not just financial return — usually pays the highest price."
    },
    {
      "name": "Strategic vs Financial Buyer",
      "slug": "strategic-vs-financial-buyer",
      "url": "https://www.mikeye.com/glossary/strategic-vs-financial-buyer",
      "category": "The People",
      "summary": "The two big categories of business buyers — and why knowing which one you're talking to changes everything."
    },
    {
      "name": "Transferability",
      "slug": "transferability",
      "url": "https://www.mikeye.com/glossary/transferability",
      "category": "The Mechanics",
      "summary": "How easily your business — its customers, operations, contracts, and relationships — can move to a new owner."
    },
    {
      "name": "Value Drags",
      "slug": "value-drags",
      "url": "https://www.mikeye.com/glossary/value-drags",
      "category": "The Mechanics",
      "summary": "The structural features of your business that knock down what buyers will pay — the exact opposite of value drivers, and usually fixable."
    },
    {
      "name": "Value Drivers",
      "slug": "value-drivers",
      "url": "https://www.mikeye.com/glossary/value-drivers",
      "category": "The Mechanics",
      "summary": "The specific characteristics of your business that make buyers willing to pay a higher multiple — and what to invest in before going to market."
    },
    {
      "name": "Value Gap",
      "slug": "value-gap",
      "url": "https://www.mikeye.com/glossary/value-gap",
      "category": "The People",
      "summary": "The difference between what your business is worth today and what you need it to be worth to fund your retirement — and the work required to close it."
    },
    {
      "name": "Working Capital Peg",
      "slug": "working-capital-peg",
      "url": "https://www.mikeye.com/glossary/working-capital-peg",
      "category": "The Mechanics",
      "summary": "The amount of operating cash and inventory you have to leave in the business at closing — often a surprise to sellers."
    }
  ]
};

      return new Response(JSON.stringify(glossary, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    }


    /*
    ============================================
    DATASET: KEYWORDS
    ============================================
    */

    if (url.pathname === "/datasets/keywords.json") {

      const keywords = {
  "name": "Exit Desk Keyword Strategy",
  "description": "Keyword research synthesis underlying the Exit Desk Glossary and paid search strategy. Demand map of seller search behavior, prioritized keyword tiers by competition and intent quality, and the wedge thesis differentiating Exit Desk from legacy M&A advisory firms.",
  "strategic_frame": {
    "branded_layer": "mikeye.com wins definitional queries for 'Exit Desk' across AI engines (ChatGPT cites mikeye.com as source). Branded entity discovery is functional.",
    "category_layer": "Generic M&A category queries (e.g., 'exit readiness assessment') are owned by legacy firms with 10+ years domain authority — wrong fight, wrong click intent.",
    "wedge": "Long-tail proprietary and specific-vocabulary phrases where competition is low, AI engines need canonical definitions, and click intent maps directly to a $499 product."
  },
  "demand_buckets": [
    { "rank": 1, "name": "Valuation vocabulary", "description": "Highest search volume cluster. SDE vs EBITDA, multiples, add-backs, normalization, recasting, QoE.", "anxiety_level": "moderate" },
    { "rank": 2, "name": "Deal mechanics and risk-shifting", "description": "Second highest, highest anxiety. Earnout, holdback, escrow, working capital peg, seller financing, equity rollover, indemnification.", "anxiety_level": "high" },
    { "rank": 3, "name": "Process and document vocabulary", "description": "LOI, NDA, CIM, due diligence, QoE, asset sale vs stock sale.", "anxiety_level": "moderate" },
    { "rank": 4, "name": "Readiness concepts", "description": "Owner dependency, customer concentration, recurring revenue, key person risk, transferability.", "anxiety_level": "low_to_moderate" }
  ],
  "prioritized_tiers": {
    "tier_a_buy_side": {
      "description": "Highest priority, lowest competition. Buy-side language sellers search but generic glossaries don't define from the buyer's seat.",
      "keywords": [
        "What private equity looks for in acquisitions",
        "EBITDA add-backs (disallowed add-backs)",
        "Quality of earnings",
        "Customer concentration discount",
        "Owner dependency discount",
        "Rep and warranty insurance",
        "Earnout vs cash at close",
        "Seller financing",
        "Working capital peg",
        "Private equity vs strategic buyer",
        "Due diligence (what kills a business sale)",
        "LOI to close (price drop / re-trade)",
        "Re-trade"
      ]
    },
    "tier_b_diligence_and_prep": {
      "description": "Diligence and pre-sale preparation vocabulary.",
      "keywords": [
        "Due diligence checklist (seller-side)",
        "Preparing financials for business sale",
        "Add-backs for business sale",
        "Quality of earnings report (seller-commissioned)",
        "Business sale red flags",
        "Increase business value before selling",
        "Fix owner dependency",
        "Value gap analysis"
      ]
    },
    "tier_c_vertical_buyer_intent": {
      "description": "Vertical roll-up and buyer-side specific terms.",
      "keywords": [
        "PE roll-up",
        "DSO (Dental Service Organization)",
        "Selling to private equity",
        "ESOP vs strategic buyer",
        "Search fund buyer",
        "Independent sponsor"
      ]
    }
  },
  "tam_expansion": {
    "context": "Exit Desk TAM expanded mid-research to include sub-$1M businesses (the modal seller, not edge case).",
    "data": "Approximately 80% of US small businesses with employees are sub-$1M. Median deal size is $329K–$352K. Underserved segment because every existing exit-readiness product excludes them.",
    "voice_implication": "SDE became default earnings metric. EBITDA framed as 'what comes next when you grow.' Examples default to $400K SDE / $200K profit ranges. Sparing use of '$X and $X' scale comparisons demonstrates the lens applies across all deal sizes."
  },
  "competitive_moat": "Legacy firms can't compete in this layer. Their content libraries lack structural specificity, buyer-perspective framing, and proprietary framework names (Buyer-Lens Analysis, Diligence Pressure Map, AI Exposure Assessment, Pre-Market Action Plan, Founder Dependence)."
};

      return new Response(JSON.stringify(keywords, null, 2), {
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
