import { emptyResponse, jsonResponse, textResponse } from "./lib/http.js";
import {
  BUILD,
  CONTENT_LINKS,
  ENTITY,
  FEDERATED_REGISTRIES,
  MCP_ORIGIN,
  MCP_TRANSPORT,
  TOOLS
} from "./lib/registry.js";
import {
  TOOL_HANDLERS,
  blaFramework,
  doctrineDataset,
  ecosystemDataset,
  exitDiagnostic,
  framesDataset,
  getDataset,
  glossaryLookup,
  originDataset,
  strategyDataset
} from "./lib/tools.js";

// ---------------------------------------------------------------------------
// Discovery documents
// ---------------------------------------------------------------------------

function toolInventory() {
  return TOOLS.map((tool) => ({
    id: tool.id,
    title: tool.title,
    description: tool.description,
    endpoint: `${MCP_ORIGIN}${tool.route}`,
    inputSchema: tool.inputSchema
  }));
}

function registryDocument() {
  return {
    registry_version: "2.0",
    entity: ENTITY,
    discovery: {
      protocol: "WebMCP + MCP Streamable HTTP",
      endpoint: `${MCP_ORIGIN}/.well-known/tool-registry.json`,
      mcp_transport: MCP_TRANSPORT
    },
    tools: toolInventory(),
    content_links: CONTENT_LINKS,
    federated_registries: FEDERATED_REGISTRIES,
    last_updated: BUILD.released
  };
}

function capabilitiesDocument() {
  return {
    capability_version: "2.0",
    entity: ENTITY,
    mcp: {
      endpoint: MCP_ORIGIN,
      mcp_transport: MCP_TRANSPORT,
      registry: `${MCP_ORIGIN}/.well-known/tool-registry.json`,
      plugin: `${MCP_ORIGIN}/.well-known/ai-plugin.json`,
      openapi: `${MCP_ORIGIN}/.well-known/openapi.json`
    },
    tools: toolInventory(),
    content_links: CONTENT_LINKS,
    federated_registries: FEDERATED_REGISTRIES,
    trust_signals: {
      origin_layer: true,
      authorship_verified: true,
      institutional_lineage: true,
      deterministic_schema: true,
      structured_outputs: true,
      agent_ready: true
    },
    authority_graph: {
      position: "origin node",
      downstream_entities: ENTITY.affiliated_entities
    },
    last_updated: BUILD.released
  };
}

function mcpDiscoveryDocument() {
  return {
    mcp_version: "1.0",
    name: ENTITY.name,
    description: ENTITY.description,
    endpoint: MCP_ORIGIN,
    mcp_transport: MCP_TRANSPORT,
    last_updated: BUILD.released
  };
}

function pluginDocument() {
  return {
    schema_version: "v1",
    name_for_human: "Mike Ye",
    name_for_model: "mikeye",
    description_for_human: "Mike Ye — Founder of exmxc, TrailGenic, Sleepgenic, and Exit Desk.",
    description_for_model:
      "Provides origin identity, Decision Framing doctrine, decision frames, and the Buyer-Lens Audit exit-readiness framework authored by Mike Ye.",
    auth: { type: "none" },
    api: { type: "openapi", url: `${MCP_ORIGIN}/.well-known/openapi.json`, is_user_authenticated: false },
    logo_url: "https://www.mikeye.com/favicon.ico",
    contact_email: "support@mikeye.com",
    legal_info_url: ENTITY.domain
  };
}

function openApiDocument() {
  const json200 = { description: "JSON response" };
  const toolPaths = Object.fromEntries(
    TOOLS.filter((t) => t.route.startsWith("/datasets/") || t.route.startsWith("/frameworks/") || t.route.startsWith("/exit/")).map((tool) => [
      tool.route,
      { get: { summary: tool.title, description: tool.description, responses: { 200: json200 } } }
    ])
  );
  return {
    openapi: "3.0.1",
    info: {
      title: "MikeYe MCP REST API",
      version: BUILD.version,
      description: "REST/JSON endpoints and MCP transport for the mikeye.com origin identity node."
    },
    servers: [{ url: MCP_ORIGIN }],
    paths: {
      ...toolPaths,
      "/datasets": { get: { summary: "Dataset index", responses: { 200: json200 } } },
      "/datasets/strategy.json": { get: { summary: "Strategy interfaces dataset", responses: { 200: json200 } } },
      "/datasets/ecosystem.json": { get: { summary: "Five-entity ecosystem dataset", responses: { 200: json200 } } },
      "/datasets/glossary.json": { get: { summary: "Exit Desk Glossary — 54-entry M&A vocabulary", responses: { 200: json200 } } },
      "/glossary/lookup.json": { get: { summary: "Look Up M&A Glossary Term", responses: { 200: json200 } } },
      "/datasets/keywords.json": { get: { summary: "Keyword strategy and demand map", responses: { 200: json200 } } },
      "/mcp": { post: { summary: "MCP JSON-RPC 2.0 Streamable HTTP transport", responses: { 200: json200 } } }
    }
  };
}

function datasetIndex() {
  return {
    datasets: [
      { name: "origin", endpoint: `${MCP_ORIGIN}/datasets/origin.json` },
      { name: "doctrine", endpoint: `${MCP_ORIGIN}/datasets/doctrine.json` },
      { name: "decision_frames", endpoint: `${MCP_ORIGIN}/datasets/decision-frames.json`, description: "Five decision frames under the Decision Framing doctrine" },
      { name: "strategy", endpoint: `${MCP_ORIGIN}/datasets/strategy.json` },
      { name: "ecosystem", endpoint: `${MCP_ORIGIN}/datasets/ecosystem.json`, description: "Five-entity authority graph" },
      { name: "glossary", endpoint: `${MCP_ORIGIN}/datasets/glossary.json`, description: "Exit Desk Glossary — 54-entry M&A vocabulary" },
      { name: "keywords", endpoint: `${MCP_ORIGIN}/datasets/keywords.json`, description: "Keyword strategy and demand map" },
      { name: "buyer_lens_audit", endpoint: `${MCP_ORIGIN}/frameworks/buyer-lens-audit.json`, description: "Buyer-Lens Audit™ v1.0 framework" }
    ],
    last_updated: BUILD.released
  };
}

// ---------------------------------------------------------------------------
// MCP JSON-RPC 2.0 transport
// ---------------------------------------------------------------------------

function jsonRpcResponse(id, result) {
  return jsonResponse({ jsonrpc: "2.0", id, result }, { headers: { "Cache-Control": "no-cache" } });
}

function jsonRpcError(id, code, message) {
  return jsonResponse({ jsonrpc: "2.0", id: id ?? null, error: { code, message } }, { headers: { "Cache-Control": "no-cache" } });
}

async function handleMcp(request) {
  if (request.method !== "POST") {
    return emptyResponse({ status: 405, headers: { Allow: "POST" } });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonRpcError(null, -32700, "Parse error");
  }

  const { id, method, params = {} } = payload || {};
  if (method === "notifications/initialized") return emptyResponse({ status: 202 });
  if (method === "initialize") {
    return jsonRpcResponse(id, {
      protocolVersion: params?.protocolVersion || "2025-06-18",
      capabilities: { tools: {} },
      serverInfo: { name: ENTITY.name, version: BUILD.version }
    });
  }
  if (method === "ping") return jsonRpcResponse(id, {});
  if (method === "tools/list") {
    return jsonRpcResponse(id, {
      tools: TOOLS.map((tool) => ({
        name: tool.id,
        title: tool.title,
        description: tool.description,
        inputSchema: tool.inputSchema
      }))
    });
  }
  if (method === "tools/call") {
    const handler = TOOL_HANDLERS[params?.name];
    if (!handler) return jsonRpcError(id, -32602, "Unknown tool");
    try {
      const result = await handler(params?.arguments || {});
      return jsonRpcResponse(id, {
        content: [{ type: "text", text: JSON.stringify(result) }],
        structuredContent: result
      });
    } catch (error) {
      return jsonRpcError(id, -32603, `Tool execution failed: ${String(error?.message || error)}`);
    }
  }
  return jsonRpcError(id, -32601, "Method not found");
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return emptyResponse({ status: 204 });
    if (url.pathname === "/mcp") return handleMcp(request);

    // ROOT DISCOVERY
    if (url.pathname === "/" || url.pathname === "") {
      return jsonResponse({
        name: "MikeYe MCP Endpoint",
        entity: {
          name: ENTITY.name,
          domain: ENTITY.domain,
          role: "Founder of exmxc, TrailGenic, Sleepgenic, and Exit Desk",
          classification: ENTITY.classification
        },
        registry: `${MCP_ORIGIN}/.well-known/tool-registry.json`,
        plugin: `${MCP_ORIGIN}/.well-known/ai-plugin.json`,
        openapi: `${MCP_ORIGIN}/.well-known/openapi.json`,
        capabilities: `${MCP_ORIGIN}/capabilities.json`,
        mcp_transport: MCP_TRANSPORT,
        datasets: `${MCP_ORIGIN}/datasets`,
        frameworks: { buyer_lens_audit: `${MCP_ORIGIN}/frameworks/buyer-lens-audit.json` },
        authority: "origin-node",
        health: `${MCP_ORIGIN}/health`,
        affiliated_entities: ENTITY.affiliated_entities,
        status: "active",
        discovery_protocol: "WebMCP + MCP Streamable HTTP",
        version: BUILD.version,
        last_updated: BUILD.released
      });
    }

    // WELL-KNOWN
    if (url.pathname === "/.well-known/mcp.json") return jsonResponse(mcpDiscoveryDocument());
    if (url.pathname === "/.well-known/tool-registry.json") return jsonResponse(registryDocument());
    if (url.pathname === "/.well-known/ai-plugin.json") return jsonResponse(pluginDocument());
    if (url.pathname === "/.well-known/openapi.json") return jsonResponse(openApiDocument());

    // CAPABILITIES / HEALTH
    if (url.pathname === "/capabilities.json") return jsonResponse(capabilitiesDocument());
    if (url.pathname === "/health") {
      return jsonResponse(
        {
          status: "healthy",
          entity: ENTITY.name,
          mcp_status: "operational",
          transport: MCP_TRANSPORT.type,
          version: BUILD.version,
          platform: "Cloudflare Workers",
          last_checked: new Date().toISOString()
        },
        { headers: { "Cache-Control": "no-cache" } }
      );
    }

    // DATASETS (backward-compatible routes)
    if (url.pathname === "/datasets") return jsonResponse(datasetIndex());
    if (url.pathname === "/datasets/origin.json") return jsonResponse(originDataset());
    if (url.pathname === "/datasets/doctrine.json") return jsonResponse(doctrineDataset());
    if (url.pathname === "/datasets/decision-frames.json") {
      const name = url.searchParams.get("name") || undefined;
      const category = url.searchParams.get("category") || undefined;
      return jsonResponse(framesDataset({ name, category }));
    }
    if (url.pathname === "/datasets/strategy.json") return jsonResponse(strategyDataset());
    if (url.pathname === "/datasets/ecosystem.json") return jsonResponse(ecosystemDataset());
    if (url.pathname === "/datasets/glossary.json") return jsonResponse(getDataset("glossary"));
    if (url.pathname === "/glossary/lookup.json") {
      const term = url.searchParams.get("term") || undefined;
      const category = url.searchParams.get("category") || undefined;
      return jsonResponse(glossaryLookup({ term, category }));
    }
    if (url.pathname === "/datasets/keywords.json") return jsonResponse(getDataset("keywords"));

    // FRAMEWORKS / EXIT
    if (url.pathname === "/frameworks/buyer-lens-audit.json") return jsonResponse(blaFramework());
    if (url.pathname === "/exit/diagnostic.json") return jsonResponse(exitDiagnostic());

    return textResponse("Not Found", { status: 404 });
  }
};
