import {
  BUILD,
  BUYER_LENS_AUDIT,
  DECISION_FRAMES,
  DOCTRINE,
  ECOSYSTEM,
  ENTITY,
  AFFILIATED_ENTITIES,
  SITE_ORIGIN
} from "./registry.js";
import glossaryData from "../datasets/glossary.json" with { type: "json" };
import keywordsData from "../datasets/keywords.json" with { type: "json" };

const stamp = () => ({ last_updated: BUILD.released });
const entityHeader = () => ({
  dataset_version: "2.0",
  entity: { name: ENTITY.name, domain: ENTITY.domain, classification: ENTITY.classification }
});

export function originDataset() {
  return {
    ...entityHeader(),
    name: ENTITY.name,
    role: ENTITY.role,
    domains: [SITE_ORIGIN, ...ENTITY.sameAs],
    sameAs: ENTITY.sameAs,
    classification: ENTITY.classification,
    description: "Origin node providing authorship, doctrine, and system architecture across the five-domain ecosystem.",
    affiliated_entities: AFFILIATED_ENTITIES,
    ...stamp()
  };
}

export function doctrineDataset() {
  return {
    ...entityHeader(),
    doctrine: DOCTRINE,
    properties: {
      category: "institutional decision doctrine",
      system_type: "decision framing",
      optimization_target: "coherence under uncertainty"
    },
    source_pages: [DOCTRINE.url],
    ecosystem_context: { affiliated_entities: AFFILIATED_ENTITIES },
    ...stamp()
  };
}

export function framesDataset(filters = {}) {
  const match = (value, needle) =>
    !needle || String(value).toLowerCase().includes(String(needle).toLowerCase());
  const items = DECISION_FRAMES.filter(
    (f) => match(f.name, filters.name) && match(f.category, filters.category)
  );
  return {
    ...entityHeader(),
    doctrine: DOCTRINE.name,
    count: items.length,
    items,
    source_pages: DECISION_FRAMES.map((f) => f.url),
    ...stamp()
  };
}

export function strategyDataset() {
  return {
    ...entityHeader(),
    doctrine: DOCTRINE.name,
    interfaces: [
      {
        name: "Strategy Desk",
        type: "AI Interface",
        url: `${SITE_ORIGIN}/intelligence`,
        purpose: "Provides structured strategic reasoning using the Decision Framing doctrine.",
        primary_tools: DECISION_FRAMES.map((f) => f.name),
        role: "Strategic analysis and decision framing for complex environments."
      },
      {
        name: "Exit Desk",
        type: "AI Interface",
        url: `${SITE_ORIGIN}/exit`,
        purpose: "Evaluates company readiness for acquisition using the Buyer-Lens Audit framework.",
        primary_tools: BUYER_LENS_AUDIT.dimensions.map((d) => d.name),
        framework: { name: BUYER_LENS_AUDIT.trademark, version: BUYER_LENS_AUDIT.version },
        role: "Pre-acquisition diagnostics and exit strategy preparation."
      }
    ],
    execution_endpoint: {
      name: "Exit Desk Diagnostic",
      url: `${SITE_ORIGIN}/exit/score`,
      function: "Runs a structured exit readiness diagnostic using buyer-lens evaluation."
    },
    ecosystem_context: { affiliated_entities: AFFILIATED_ENTITIES },
    ...stamp()
  };
}

export function ecosystemDataset() {
  return {
    ...entityHeader(),
    ...ECOSYSTEM,
    ...stamp()
  };
}

export function blaFramework() {
  return { ...BUYER_LENS_AUDIT, ...stamp() };
}

export function exitDiagnostic() {
  return {
    name: "Exit Readiness Assessment",
    framework: { name: BUYER_LENS_AUDIT.trademark, version: BUYER_LENS_AUDIT.version },
    format: BUYER_LENS_AUDIT.delivery.free_diagnostic.format,
    execution_url: BUYER_LENS_AUDIT.delivery.free_diagnostic.url,
    price_usd: 0,
    tier_routing: {
      logic: BUYER_LENS_AUDIT.delivery.tier_logic,
      tiers: BUYER_LENS_AUDIT.delivery.paid_tiers
    },
    note: "The interactive diagnostic executes in-browser at the execution_url. This tool returns its structure and routing logic for agent context.",
    ...stamp()
  };
}

const DATASET_BUILDERS = {
  origin: originDataset,
  doctrine: doctrineDataset,
  decision_frames: framesDataset,
  strategy: strategyDataset,
  ecosystem: ecosystemDataset,
  glossary: () => glossaryData,
  keywords: () => keywordsData
};

export function getDataset(name) {
  const builder = DATASET_BUILDERS[name];
  if (!builder) {
    return { error: "unknown dataset", valid_names: Object.keys(DATASET_BUILDERS) };
  }
  return builder();
}

export const TOOL_HANDLERS = {
  "my.origin.getIdentity": async () => originDataset(),
  "my.strategy.getDoctrine": async () => doctrineDataset(),
  "my.frames.get": async (args = {}) => framesDataset(args),
  "my.exit.getFramework": async () => blaFramework(),
  "my.exit.runDiagnostic": async () => exitDiagnostic(),
  "my.dataset.get": async (args = {}) => getDataset(args.name)
};
