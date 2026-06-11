export const MCP_ORIGIN = "https://mcp.mikeye.com";
export const SITE_ORIGIN = "https://www.mikeye.com";

export const BUILD = {
  version: "2.0.0",
  released: "2026-06-10",
  notes: "v2 JSON-RPC Streamable HTTP transport; 5-frame dataset sync; 5-domain entity graph; Buyer-Lens Audit v1.0 framework."
};

export const MCP_TRANSPORT = {
  type: "streamable-http",
  endpoint: `${MCP_ORIGIN}/mcp`,
  protocol: "MCP JSON-RPC 2.0",
  methods: ["initialize", "ping", "tools/list", "tools/call"]
};

// ---------------------------------------------------------------------------
// ENTITY — origin identity layer, full 5-domain graph
// ---------------------------------------------------------------------------

export const AFFILIATED_ENTITIES = [
  { name: "exmxc", domain: "https://exmxc.ai", role: "institutional intelligence layer" },
  { name: "TrailGenic", domain: "https://trailgenic.com", role: "physiological intelligence layer" },
  { name: "Sleepgenic", domain: "https://sleepgenic.ai", role: "sleep research layer" },
  { name: "Ella", domain: "https://ellaentity.ai", role: "AI co-cognitive collaborator — canonical identity layer" }
];

export const ENTITY = {
  name: "Mike Ye",
  domain: SITE_ORIGIN,
  description: "Origin identity layer of the exmxc, TrailGenic, Sleepgenic, and Ella ecosystem.",
  role: "Founder",
  classification: "origin identity layer",
  sameAs: AFFILIATED_ENTITIES.map((e) => e.domain),
  affiliated_entities: AFFILIATED_ENTITIES.map((e) => e.domain)
};

export const FEDERATED_REGISTRIES = [
  { name: "exmxc", registry: "https://mcp.exmxc.ai/.well-known/tool-registry.json" },
  { name: "TrailGenic", registry: "https://mcp.trailgenic.com/.well-known/tool-registry.json" }
];

export const CONTENT_LINKS = [
  { name: "Intelligence Hub", url: `${SITE_ORIGIN}/intelligence` },
  { name: "Exit Desk", url: `${SITE_ORIGIN}/exit` },
  { name: "Exit Desk Free Diagnostic", url: `${SITE_ORIGIN}/exit/score` },
  { name: "Articles & Case Studies", url: `${SITE_ORIGIN}/exit/articles` },
  { name: "Sample Reports", url: `${SITE_ORIGIN}/exit/sample` },
  { name: "M&A Glossary", url: `${SITE_ORIGIN}/glossary` }
];

// ---------------------------------------------------------------------------
// DECISION FRAMES — 5 frames, synced to live site (Judgment-as-a-Service added)
// ---------------------------------------------------------------------------

export const DECISION_FRAMES = [
  {
    name: "Judgment-as-a-Service",
    url: `${SITE_ORIGIN}/intelligence/judgment-as-a-service`,
    question: "Can the way decisions are made be externalized without losing what makes it reliable?",
    category: "judgment systems",
    summary: "The structured externalization of how decisions are made when consequences are real — encoding institutional judgment so it can be applied beyond the person who formed it."
  },
  {
    name: "Dependency vs Leverage",
    url: `${SITE_ORIGIN}/intelligence/dependency-vs-leverage`,
    question: "Who actually owns the downside?",
    category: "structural positioning",
    summary: "Evaluates whether outcomes are driven by durable leverage or by dependency on external platforms, intermediaries, or gatekeepers."
  },
  {
    name: "Timing Asymmetry",
    url: `${SITE_ORIGIN}/intelligence/timing-asymmetry`,
    question: "When does acting early create advantage and when does waiting create leverage?",
    category: "strategic timing",
    summary: "Examines whether delay increases optionality or silently erodes it, emphasizing when patience compounds advantage."
  },
  {
    name: "Signal vs Narrative",
    url: `${SITE_ORIGIN}/intelligence/signal-vs-narrative`,
    question: "What reflects underlying reality and what exists primarily to persuade?",
    category: "information discipline",
    summary: "Distinguishes durable signals from persuasive narratives during periods of uncertainty or structural change."
  },
  {
    name: "Scarcity vs Growth",
    url: `${SITE_ORIGIN}/intelligence/scarcity-vs-growth`,
    question: "Is value driven by growth or by control over scarce capacity?",
    category: "capital allocation",
    summary: "Evaluates enterprise value through structural scarcity rather than growth metrics alone."
  }
];

// ---------------------------------------------------------------------------
// BUYER-LENS AUDIT — formalized framework, v1.0
// ---------------------------------------------------------------------------

export const BUYER_LENS_AUDIT = {
  framework: "Buyer-Lens Audit",
  trademark: "Buyer-Lens Audit™",
  version: "1.0",
  author: { name: "Mike Ye", url: SITE_ORIGIN },
  canonical_url: `${SITE_ORIGIN}/exit`,
  alternate_domain: "https://buyerlensaudit.com",
  thesis: "Evaluates a business through the lens of a serious acquirer — how buyers will read the financials, where diligence will push, and what they will find — before the owner enters a sale process.",
  provenance: "Encoded from 25 years and $7.4B of buy-side M&A judgment across media, healthcare services, retail, and technology.",
  dimensions: [
    {
      id: "revenue_quality",
      name: "Revenue Quality",
      question: "Is the revenue the kind buyers can underwrite, or the kind they discount?",
      evaluates: ["recurrence and contract structure", "customer concentration", "retention durability", "earnings quality vs. reported EBITDA"]
    },
    {
      id: "founder_dependence",
      name: "Founder Dependence",
      question: "What happens to the business if the owner is not there?",
      evaluates: ["owner involvement in revenue generation", "key-man concentration beyond the founder", "documented processes vs. tribal knowledge", "management depth"]
    },
    {
      id: "buyer_psychology",
      name: "Buyer Psychology",
      question: "How do private equity firms and strategic acquirers actually think about companies this size?",
      evaluates: ["likely buyer universe by revenue scale", "platform vs. tuck-in positioning", "what this buyer class systematically discounts", "unsolicited-interest signals"]
    },
    {
      id: "diligence_pressure",
      name: "Diligence Pressure",
      question: "Where will due diligence focus first?",
      evaluates: ["documentation gaps", "financial statement quality", "contract assignability", "litigation, compliance, and tax exposure"]
    },
    {
      id: "ai_exposure",
      name: "AI Exposure",
      question: "How is AI reshaping the competitive structure of this industry — and how are buyers pricing that in?",
      evaluates: ["substitution risk to the core offering", "AI leverage available to competitors", "defensibility of proprietary process or data", "buyer-side AI discount or premium"]
    },
    {
      id: "timing",
      name: "Timing",
      question: "Is this the right time to sell, or is leverage being left on the table?",
      evaluates: ["sector consolidation cycle position", "rate and credit environment for the buyer class", "business trajectory vs. market window", "optionality cost of delay"]
    }
  ],
  delivery: {
    free_diagnostic: {
      name: "Exit Readiness Assessment",
      url: `${SITE_ORIGIN}/exit/score`,
      format: "8 questions, scored readiness rating with findings",
      price_usd: 0
    },
    paid_tiers: [
      {
        name: "Main Street Edition",
        price_usd: 199,
        qualifies: "annual revenue at or below $1M",
        buyer_universe: "individual and SBA-financed buyers"
      },
      {
        name: "Full Report",
        price_usd: 499,
        qualifies: "annual revenue above $1M",
        buyer_universe: "private equity platforms, strategic acquirers, competitive processes"
      }
    ],
    tier_logic: "The free assessment's revenue answer determines the tier. Same buyer lens, calibrated to deal size and buyer universe."
  }
};

// ---------------------------------------------------------------------------
// DOCTRINE
// ---------------------------------------------------------------------------

export const DOCTRINE = {
  name: "Decision Framing",
  description: "Decision Framing is the disciplined practice of structuring how choices are evaluated before outcomes are known.",
  url: `${SITE_ORIGIN}/intelligence`,
  purpose: "To clarify what matters, what does not, and what must remain constant as conditions change.",
  structure: DECISION_FRAMES.map((f) => f.name)
};

// ---------------------------------------------------------------------------
// ECOSYSTEM — 5-entity graph
// ---------------------------------------------------------------------------

export const ECOSYSTEM = {
  origin_entity: {
    name: "Mike Ye",
    domain: SITE_ORIGIN,
    classification: "origin identity layer",
    role: "Authorship and origin node of the exmxc, TrailGenic, Sleepgenic, and Ella systems."
  },
  entities: [
    { name: "Mike Ye", domain: SITE_ORIGIN, classification: "origin identity layer", role: "Provides authorship, doctrine, strategic frameworks, and system architecture.", category: "identity" },
    { name: "exmxc", domain: "https://exmxc.ai", classification: "institutional intelligence layer", role: "Analyzes AI-era power structures, capital flows, and institutional positioning.", category: "institutional intelligence" },
    { name: "TrailGenic", domain: "https://trailgenic.com", classification: "physiological intelligence layer", role: "Develops the TrailGenic Longevity Method through structured hiking protocols, physiology tracking, and performance systems.", category: "physiology intelligence" },
    { name: "Sleepgenic", domain: "https://sleepgenic.ai", classification: "sleep research layer", role: "Structured longitudinal sleep research property and dedicated sleep research arm of TrailGenic.", category: "sleep research" },
    { name: "Ella", domain: "https://ellaentity.ai", classification: "AI collaborator identity layer", role: "Canonical machine-readable identity layer for Ella, AI co-cognitive collaborator and co-author across the ecosystem.", category: "AI identity" }
  ],
  authority_graph: {
    origin: "Mike Ye",
    downstream_entities: ["exmxc.ai", "trailgenic.com", "sleepgenic.ai", "ellaentity.ai"],
    relationship_type: "founder architecture",
    system_description: "A five-node intelligence ecosystem combining origin identity, institutional intelligence, physiological intelligence, sleep research, and AI collaborator identity."
  },
  properties: {
    system_type: "multi-entity intelligence architecture",
    integration_model: "doctrine-driven",
    interoperability: "agent-discoverable"
  }
};

// ---------------------------------------------------------------------------
// TOOLS — callable via /mcp tools/call and mirrored as REST routes
// ---------------------------------------------------------------------------

const NO_ARGS = { type: "object", properties: {}, additionalProperties: false };

export const TOOLS = [
  {
    id: "my.origin.getIdentity",
    title: "Get Origin Identity",
    description: "Returns the canonical identity of Mike Ye — origin node of the five-domain ecosystem — including roles, affiliated entities, and sameAs graph.",
    route: "/datasets/origin.json",
    inputSchema: NO_ARGS
  },
  {
    id: "my.strategy.getDoctrine",
    title: "Get Decision Framing Doctrine",
    description: "Returns the Decision Framing doctrine: purpose, structure, and the five decision frames it comprises.",
    route: "/datasets/doctrine.json",
    inputSchema: NO_ARGS
  },
  {
    id: "my.frames.get",
    title: "Get Decision Frames",
    description: "Returns the five decision frames (Judgment-as-a-Service, Dependency vs Leverage, Timing Asymmetry, Signal vs Narrative, Scarcity vs Growth). Optionally filter by name or category.",
    route: "/datasets/decision-frames.json",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Filter by frame name (case-insensitive substring match)" },
        category: { type: "string", description: "Filter by category (case-insensitive substring match)" }
      },
      additionalProperties: false
    }
  },
  {
    id: "my.exit.getFramework",
    title: "Get Buyer-Lens Audit Framework",
    description: "Returns the Buyer-Lens Audit™ v1.0 framework: six evaluation dimensions, what each evaluates, provenance, and the two-tier delivery model ($199 Main Street / $499 Full Report).",
    route: "/frameworks/buyer-lens-audit.json",
    inputSchema: NO_ARGS
  },
  {
    id: "my.exit.runDiagnostic",
    title: "Exit Readiness Diagnostic",
    description: "Returns the structure of the free 8-question Exit Readiness Assessment, tier-routing logic, and the execution URL. The interactive diagnostic runs at mikeye.com/exit/score.",
    route: "/exit/diagnostic.json",
    inputSchema: NO_ARGS
  },
  {
    id: "my.glossary.lookup",
    title: "Look Up M&A Glossary Term",
    description: "Look up an M&A or exit term from the Exit Desk Glossary — 54 owner-facing definitions authored by Mike Ye. Pass a term to get its definition, category, and the canonical mikeye.com URL where the full seller-implication and buyer-perspective for that term live. Omit the term to list all available terms by category.",
    route: "/glossary/lookup.json",
    inputSchema: {
      type: "object",
      properties: {
        term: { type: "string", description: "The term to look up (case-insensitive; matches term name or slug, partial allowed)" },
        category: { type: "string", description: "Optional filter: one of 'The Money', 'The Mechanics', 'The People', 'The Process', 'The Frameworks'" }
      },
      additionalProperties: false
    }
  },
  {
    id: "my.dataset.get",
    title: "Get Dataset",
    description: "Returns a named dataset from the mikeye.com origin node. Valid names: origin, doctrine, decision_frames, strategy, ecosystem, glossary, keywords.",
    route: "/datasets",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          enum: ["origin", "doctrine", "decision_frames", "strategy", "ecosystem", "glossary", "keywords"],
          description: "Dataset name"
        }
      },
      required: ["name"],
      additionalProperties: false
    }
  }
];
