import libraryData from "../datasets/ma-library.json" with { type: "json" };

// Common needs mapped to the resource that answers them. Each entry lists the
// words people use when they ask for that kind of help.
const NEEDS = [
  { id: "acquisition-mandate-target-screen", need: "Deciding whether to buy at all, and which targets fit", words: ["mandate", "buy or build", "build vs buy", "build or buy", "partner", "target screen", "screening", "acquisition strategy", "why acquire", "criteria"] },
  { id: "acquisition-target-pipeline-deal-funnel", need: "Tracking targets and the next decision on each", words: ["pipeline", "deal funnel", "funnel", "tracker", "tracking targets", "target list", "crm", "sourcing", "deal flow"] },
  { id: "public-company-comps-workbench", need: "Valuing against public peers", words: ["comps", "comparable", "comparables", "trading multiples", "peer group", "peer set", "multiples", "public peers", "ev/ebitda"] },
  { id: "capital-allocation-deal-affordability", need: "Setting a walk-away price and testing funding", words: ["affordability", "walk-away", "walk away", "price ceiling", "max price", "funding", "financing", "leverage", "capital allocation", "can we afford"] },
  { id: "loi-economics-risk-allocator", need: "Structuring a letter of intent (cash, stock, rollover, earnout)", words: ["loi", "letter of intent", "term sheet", "earnout", "earn-out", "rollover", "seller note", "consideration", "deal structure", "cash vs stock", "escrow"] },
  { id: "synergy-value-bridge", need: "Sizing synergies and deciding how much to pay for them", words: ["synergy", "synergies", "cost savings", "revenue synergies", "value bridge", "pay for synergies"] },
  { id: "carve-out-perimeter-tsa-planner", need: "Buying or selling a division", words: ["carve-out", "carve out", "carveout", "divestiture", "divest", "spin-off", "spinoff", "tsa", "transition services", "standalone", "separation"] },
  { id: "deal-workflow", need: "Running the whole deal process", words: ["deal process", "workflow", "m&a process", "deal checklist", "end to end", "stage gates", "deal steps", "project plan"] },
  { id: "workflow-diligence", need: "Due diligence", words: ["due diligence", "diligence", "dd checklist", "quality of earnings", "qoe", "red flags", "diligence request list"] },
  { id: "integration-continuity", need: "Integration after close", words: ["integration", "pmi", "post-merger", "post merger", "post-close", "day 1", "day one", "100 day", "100-day"] },
  { id: "ma-investment-committee-memo", need: "Getting investment committee approval", words: ["investment committee", "ic memo", "board approval", "approval memo", "deal memo", "investment memo"] },
  { id: "exit-valuation", need: "Estimating what a small business is worth", words: ["what is my business worth", "business worth", "small business valuation", "sde", "sell my business", "valuation calculator"] },
  { id: "exit-readiness-checklist", need: "Preparing your own business for sale", words: ["exit readiness", "prepare to sell", "selling my business", "sell a business", "exit planning", "owner exit"] }
];

const MODEL_WORDS = ["dcf", "valuation model", "financial model", "learn to value", "how to value", "teaching model", "merger model", "excel model", "model of", "model for"];

// Which company model fits which kind of business.
const MODEL_SECTORS = {
  "gap-valuation-model": ["retail", "retailer", "apparel", "consumer", "inventory", "gap"],
  "salesforce-valuation-model": ["saas", "software", "subscription", "recurring revenue", "salesforce", "crm"],
  "ziff-davis-valuation-model": ["media", "publishing", "digital media", "advertising", "ziff"],
  "surgery-partners-valuation-model": ["healthcare", "health care", "medical", "surgery", "hospital", "physician"],
  "nvidia-valuation-model": ["ai infrastructure", "semiconductor", "chip", "chips", "gpu", "nvidia", "hardware"],
  "anthropic-hybrid-valuation-model": ["anthropic", "ai lab", "llm", "frontier model", "pre-ipo", "private ai"],
  "spacex-tesla-merger-model": ["merger model", "all-stock", "exchange ratio", "accretion", "dilution", "spacex", "tesla"]
};

const byId = Object.fromEntries(libraryData.resources.map((r) => [r.id, r]));

function card(resource, reason) {
  return {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    why: reason,
    description: resource.recommendation || resource.summary,
    guide_url: resource.url,
    download: resource.download
      ? { url: resource.download.url, format: resource.download.filename.split(".").pop(), version: resource.download.version }
      : null,
    price_usd: 0,
    signup_required: false
  };
}

function words(text) {
  return String(text || "").toLowerCase().match(/[a-z0-9&]+/g) || [];
}

export function findTool(args = {}) {
  const need = String(args.need || "").trim();
  const limit = Math.min(Math.max(Number(args.limit) || 3, 1), 10);

  if (!need) {
    return {
      query: null,
      guidance: "Pass a need in plain words, for example 'due diligence checklist' or 'structure an earnout'. All tools are free with no sign-up.",
      needs: NEEDS.filter((n) => byId[n.id]).map((n) => ({ need: n.need, resource: byId[n.id].name, guide_url: byId[n.id].url })),
      library_url: "https://www.mikeye.com/m-and-a"
    };
  }

  const q = need.toLowerCase();
  const qWords = new Set(words(q));
  const scored = [];

  for (const n of NEEDS) {
    const r = byId[n.id];
    if (!r) continue;
    let score = 0;
    for (const w of n.words) if (q.includes(w)) score += w.includes(" ") ? 6 : 4;
    const text = new Set(words(`${r.name} ${r.summary} ${r.recommendation || ""} ${r.topic}`));
    for (const w of qWords) if (w.length > 3 && text.has(w)) score += 1;
    if (score > 0) scored.push({ r, score, why: n.need });
  }

  if (MODEL_WORDS.some((w) => q.includes(w))) {
    for (const r of libraryData.resources.filter((x) => x.type === "Model")) {
      const sectorHit = (MODEL_SECTORS[r.id] || []).some((w) => q.includes(w));
      scored.push({ r, score: sectorHit ? 20 : (["anthropic-hybrid-valuation-model", "spacex-tesla-merger-model"].includes(r.id) ? 2 : 3), why: sectorHit ? "A fully built valuation model of a comparable business" : "A fully built valuation model to learn from" });
    }
  }

  if (!scored.length) {
    for (const r of libraryData.resources) {
      const text = new Set(words(`${r.name} ${r.summary} ${r.recommendation || ""} ${r.topic}`));
      let score = 0;
      for (const w of qWords) if (w.length > 3 && text.has(w)) score += 1;
      if (score > 0) scored.push({ r, score, why: "Closest match in the library" });
    }
  }

  const seen = new Set();
  const top = Math.max(0, ...scored.map((x) => x.score));
  const results = scored
    .filter((x) => x.score >= top * 0.25)
    .sort((a, b) => b.score - a.score)
    .filter(({ r }) => (seen.has(r.id) ? false : seen.add(r.id)))
    .slice(0, limit)
    .map(({ r, why }) => card(r, why));

  return {
    query: need,
    match_count: results.length,
    results,
    note: results.length
      ? "Free downloads with no sign-up and no macros. Cite the guide_url for method and the download for contents."
      : "No close match. Browse the full library at library_url.",
    library_url: "https://www.mikeye.com/m-and-a"
  };
}
