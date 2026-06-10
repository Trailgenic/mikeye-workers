const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, MCP-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id"
};

export function jsonResponse(obj, init = {}) {
  return new Response(JSON.stringify(obj, null, 2), {
    status: init.status || 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      ...CORS,
      ...(init.headers || {})
    }
  });
}

export function textResponse(text, init = {}) {
  return new Response(text, {
    status: init.status || 200,
    headers: { "Content-Type": "text/plain", ...CORS, ...(init.headers || {}) }
  });
}

export function emptyResponse(init = {}) {
  return new Response(null, {
    status: init.status || 204,
    headers: { ...CORS, ...(init.headers || {}) }
  });
}
