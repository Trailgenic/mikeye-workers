# MikeYe MCP Endpoint

This repository powers the **Model Context Protocol (MCP) endpoint for mikeye.com**, the origin identity layer of the Mike Ye ecosystem.

The MCP node exposes structured discovery, capability definitions, and modular datasets that allow AI agents to interpret the strategic frameworks, doctrine, and ecosystem architecture authored by Mike Ye.

This endpoint operates as the **origin node** connecting:

- https://mikeye.com
- https://exmxc.ai
- https://trailgenic.com

---

## Architecture

The system follows a **thin worker + modular datasets** architecture.

Cloudflare Worker handles:

- discovery
- routing
- registry
- capability definitions
- dataset endpoints

Datasets are modular and expandable without modifying the worker core.

**MCP Endpoint**
- https://mcp.mikeye.com

---

## Discovery

Root MCP discovery endpoint:

- https://mcp.mikeye.com/

This endpoint exposes:

- registry
- plugin
- openapi
- capabilities
- datasets index
- health
- affiliated ecosystem entities

---

## Core MCP Endpoints

### Tool Registry
- https://mcp.mikeye.com/.well-known/tool-registry.json

Defines available tools and their corresponding endpoints.

### AI Plugin Manifest
- https://mcp.mikeye.com/.well-known/ai-plugin.json

Provides plugin metadata used by AI agents and tool integrations.

### OpenAPI Specification
- https://mcp.mikeye.com/.well-known/openapi.json

Machine-readable API specification describing accessible endpoints.

### Capabilities
- https://mcp.mikeye.com/capabilities.json

Describes available tools and system capabilities including:

- origin identity
- strategic doctrine
- exit intelligence
- ecosystem graph
- dataset access

### Health Check
- https://mcp.mikeye.com/health

Infrastructure status endpoint.

---

## Dataset Index

All datasets are discoverable through:

- https://mcp.mikeye.com/datasets

Current datasets:

| Dataset | Endpoint | Description |
|--------|----------|-------------|
| Origin | https://mcp.mikeye.com/datasets/origin.json | Identity and authorship node |
| Doctrine | https://mcp.mikeye.com/datasets/doctrine.json | Decision framing doctrine |
| Decision Frames | https://mcp.mikeye.com/datasets/decision-frames.json | Core strategic lenses |
| Strategy | https://mcp.mikeye.com/datasets/strategy.json | Strategic interfaces |
| Ecosystem | https://mcp.mikeye.com/datasets/ecosystem.json | Entity graph |

---

## Ecosystem Architecture

The Mike Ye MCP node functions as the **origin identity layer** of a broader system:
