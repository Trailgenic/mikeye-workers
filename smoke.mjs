import worker from './worker.js';

const base = 'https://mcp.mikeye.com';
const get = (path) => worker.fetch(new Request(base + path));
const rpc = (body) => worker.fetch(new Request(base + '/mcp', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
}));

let pass = 0, fail = 0;
const check = (name, cond, extra='') => { cond ? pass++ : (fail++, console.log('FAIL:', name, extra)); };

// REST routes
for (const p of ['/', '/.well-known/tool-registry.json', '/.well-known/mcp.json', '/.well-known/ai-plugin.json', '/.well-known/openapi.json', '/capabilities.json', '/health', '/datasets', '/datasets/origin.json', '/datasets/doctrine.json', '/datasets/decision-frames.json', '/datasets/strategy.json', '/datasets/ecosystem.json', '/datasets/glossary.json', '/glossary/lookup.json?term=earnout', '/datasets/keywords.json', '/frameworks/buyer-lens-audit.json', '/exit/diagnostic.json']) {
  const r = await get(p);
  const ok = r.status === 200;
  let body = null;
  try { body = await r.json(); } catch {}
  check(`GET ${p}`, ok && body !== null, `status=${r.status}`);
}

// Content assertions
const frames = await (await get('/datasets/decision-frames.json')).json();
check('frames count == 5', frames.count === 5 && frames.items.length === 5, `got ${frames.count}`);
check('JaaS present', frames.items.some(f => f.name === 'Judgment-as-a-Service'));

const filtered = await (await get('/datasets/decision-frames.json?category=capital')).json();
check('frames filter', filtered.items.length === 1 && filtered.items[0].name === 'Scarcity vs Growth');

const eco = await (await get('/datasets/ecosystem.json')).json();
check('ecosystem 5 entities', eco.entities.length === 5);
check('ecosystem incl sleepgenic+ella', JSON.stringify(eco).includes('sleepgenic.ai') && JSON.stringify(eco).includes('ellaentity.ai'));

const bla = await (await get('/frameworks/buyer-lens-audit.json')).json();
check('BLA 6 dimensions', bla.dimensions.length === 6);
check('BLA tiers 199/499', bla.delivery.paid_tiers[0].price_usd === 199 && bla.delivery.paid_tiers[1].price_usd === 499);

const reg = await (await get('/.well-known/tool-registry.json')).json();
check('registry v2.0', reg.registry_version === '2.0');
check('registry 7 tools', reg.tools.length === 7, `got ${reg.tools.length}`);
check('registry transport', reg.discovery.mcp_transport.endpoint === 'https://mcp.mikeye.com/mcp');
check('registry 4 affiliates', reg.entity.affiliated_entities.length === 4);
check('registry sameAs uses Mike Ye identity profiles', reg.entity.sameAs.includes('https://www.linkedin.com/in/michaelye73/') && reg.entity.sameAs.includes('https://www.exmxc.ai/about-us/mike-ye'));
check('registry sameAs excludes affiliated entity domains', !reg.entity.sameAs.includes('https://exmxc.ai') && !reg.entity.sameAs.includes('https://trailgenic.com'));

const origin = await (await get('/datasets/origin.json')).json();
check('origin domains preserve 5-domain ecosystem', origin.domains.length === 5 && origin.domains.includes('https://sleepgenic.ai'));
check('origin sameAs uses identity profiles', origin.sameAs.includes('https://www.imdb.com/name/nm12653668/'));

const capabilities = await (await get('/capabilities.json')).json();
check('capabilities downstream graph uses affiliates', capabilities.authority_graph.downstream_entities.length === 4 && capabilities.authority_graph.downstream_entities.includes('https://ellaentity.ai'));

// Published M&A library and ontology
const library = await (await get('/datasets/ma-library.json')).json();
check('library contains 22 resources', library.resources.length === 22);
check('library contains 16 verified downloads', library.resources.filter(r => r.download).length === 16);
const publicComps = library.resources.find(r => r.id === 'public-company-comps-workbench');
check('Populated public comps is published with verified source snapshot', publicComps?.status === 'published' && publicComps.download.sha256 === '4d36c17be218e059909cee694e8fda603bcac131c49afedb10566dad109ecfc9' && publicComps.download.companyCount === 254 && publicComps.download.sectorCount === 12 && !publicComps.download.sheets.includes('Precedent_MA'));
check('downloads have verified immutable URLs and hashes', library.resources.filter(r => r.download).every(r => r.download.downloadVerified && /^[a-f0-9]{64}$/.test(r.download.sha256) && (/\/[a-f0-9]{40}\/public\/resources\/.+\.(xlsx|md)$/.test(r.download.url) || /^https:\/\/cdn\.prod\.website-files\.com\/[a-f0-9]{24}\/[a-f0-9]{24}_.+\.xlsx$/.test(r.download.url))));
const ontology = await (await get('/ontology.json')).json();
check('ontology topic IDs are unique', new Set(library.topics.map(t => t['@id'])).size === 10);
check('ontology has no placeholder identifiers', !JSON.stringify(ontology).includes('#undefined'));
check('library keeps five company valuation models', library.resources.filter(r => r.type === 'Model').length === 5);
check('library includes the three comprehensive checklists', ['deal-workflow','workflow-diligence','integration-continuity'].every(id => library.resources.some(r => r.id === id && r.download)));
check('synergy reference is classified as a published tool', library.resources.some(r => r.id === 'synergy-value-bridge' && r.type === 'Tool' && r.topic === 'synergies' && r.status === 'published'));
const synergy = library.resources.find(r => r.id === 'synergy-value-bridge');
check('synergy workbook metadata is complete', synergy.download.bytes === 135876 && synergy.download.sha256 === 'f42cd99478f77a8f0664383dd81476dac4218cd5d575e1169c2341353ede48f1' && synergy.download.sheets.length === 6);
check('synergy relates to working checklists and LOI economics', synergy.relatedResources.length > 0 && synergy.relatedResources.every(id => library.resources.some(r => r.id === id && r.relatedResources.includes(synergy.id))));
const stages = ontology['@graph'].find(n => n['@id'] === 'https://www.mikeye.com/m-and-a#transaction-path');
check('transaction path has seven ordered stages', stages?.['@type'] === 'ItemList' && stages.itemListOrder === 'https://schema.org/ItemListOrderAscending' && stages.numberOfItems === 7 && stages.itemListElement.every((s, i) => s.position === i + 1));
check('ontology labels subject taxonomy as knowledge pillars', ontology['@graph'].some(n => n['@type'] === 'DefinedTermSet' && n.name === 'Mike Ye M&A knowledge pillars' && n.hasDefinedTerm.length === 10));
check('inventory and ontology preserve transaction order', library.transactionPath.stages.length === 7 && library.transactionPath.stages.every((s, i) => stages.itemListElement[i].item.name === s.name));

check('machine guide includes all new models', ['Gap','Salesforce','Ziff Davis','Surgery Partners','NVIDIA'].every(n => library.resources.some(r => r.name.includes(n))));
check('machine guide served as text', (await (await get('/llms.txt')).text()).includes('## Machine access'));

const libRpc = await (await rpc({jsonrpc:'2.0',id:20,method:'tools/call',params:{name:'my.dataset.get',arguments:{name:'ma_library'}}})).json();
check('MCP returns library', JSON.stringify(libRpc).includes('nvidia-valuation-model'));
check('MCP exposes synergy resource and transaction path', libRpc.result?.structuredContent?.resources?.some(r => r.id === 'synergy-value-bridge') && libRpc.result?.structuredContent?.transactionPath?.stages?.length === 7);

const loi = library.resources.find(r => r.id === 'loi-economics-risk-allocator');
check('LOI resource is published under deal structure', loi?.type === 'Tool' && loi.topic === 'deal-structure' && loi.status === 'published');
check('LOI workbook has complete file metadata', loi?.download?.bytes > 10000 && /^[a-f0-9]{64}$/.test(loi.download.sha256) && loi.download.sheets[0] === 'Dashboard');
check('LOI guide has reciprocal working-resource relationships', loi?.relatedResources?.length > 0 && loi.relatedResources.every(id => library.resources.some(r => r.id === id && r.relatedResources?.includes(loi.id))));
check('LOI and diligence stage points to economics workbook', library.transactionPath.stages[3].url === '/ma-resources/loi-economics-risk-allocator');
const mandate = library.resources.find(r => r.id === 'acquisition-mandate-target-screen');
check('Mandate resource is published under corporate development', mandate?.type === 'Tool' && mandate.topic === 'corporate-development' && mandate.status === 'published');
check('Mandate workbook has complete file metadata', mandate?.download?.bytes > 10000 && /^[a-f0-9]{64}$/.test(mandate.download.sha256) && mandate.download.sheets[0] === 'Dashboard');
check('Mandate relationships are reciprocal', mandate?.relatedResources?.length > 0 && mandate.relatedResources.every(id => library.resources.some(r => r.id === id && r.relatedResources?.includes(mandate.id))));
check('Mandate and target stages use their distinct tools', library.transactionPath.stages[0].url === '/ma-resources/acquisition-mandate-target-screen' && library.transactionPath.stages[1].url === '/ma-resources/acquisition-target-pipeline-deal-funnel');
check('Signing stage uses the IC memo', library.transactionPath.stages[4].url === '/ma-resources/ma-investment-committee-memo');


const carve = library.resources.find(r => r.id === 'carve-out-perimeter-tsa-planner');
check('Carve-out resource is published under divestitures', carve?.type === 'Tool' && carve.topic === 'divestitures' && carve.status === 'published');
check('Carve-out workbook metadata is complete', carve?.download?.bytes > 10000 && /^[a-f0-9]{64}$/.test(carve.download.sha256) && JSON.stringify(carve.download.sheets) === JSON.stringify(['Dashboard','Workflows','Perimeter','Dependencies','TSA','Costs','Guide']));
check('Carve-out relationships are reciprocal', carve?.relatedResources?.length > 0 && carve.relatedResources.every(id => library.resources.some(r => r.id === id && r.relatedResources?.includes(carve.id))));
check('Day 1 primary resource remains integration', library.transactionPath.stages[5].url === '/ma-resources/after-the-deal-keep-the-business-working');
check('MCP exposes carve-out planner', libRpc.result?.structuredContent?.resources?.some(r => r.id === carve.id));

const capital = library.resources.find(r => r.id === 'capital-allocation-deal-affordability');
check('Capital allocation is published under strategic finance', capital?.type === 'Tool' && capital.topic === 'strategic-finance' && capital.status === 'published');
check('Capital allocation workbook metadata is complete', capital?.download?.bytes > 10000 && /^[a-f0-9]{64}$/.test(capital.download.sha256) && JSON.stringify(capital.download.sheets) === JSON.stringify(['Dashboard','Controls','Deal cash flow','Financing','Capacity','Alternatives','Guide']));
check('Capital allocation relationships are reciprocal', capital?.relatedResources?.length > 0 && capital.relatedResources.every(id => library.resources.some(r => r.id === id && r.relatedResources?.includes(capital.id))));
check('MCP exposes capital allocation tool', libRpc.result?.structuredContent?.resources?.some(r => r.id === capital.id));

// MCP transport
const init = await (await rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18' } })).json();
check('initialize', init.result?.serverInfo?.name === 'Mike Ye' && init.result?.protocolVersion === '2025-06-18');

const notif = await rpc({ jsonrpc: '2.0', method: 'notifications/initialized' });
check('notifications/initialized 202', notif.status === 202);

const ping = await (await rpc({ jsonrpc: '2.0', id: 2, method: 'ping' })).json();
check('ping', !!ping.result);

const list = await (await rpc({ jsonrpc: '2.0', id: 3, method: 'tools/list' })).json();
check('tools/list 7', list.result?.tools?.length === 7, `got ${list.result?.tools?.length}`);
check('tools have inputSchema', list.result.tools.every(t => t.inputSchema?.type === 'object'));

for (const [name, args] of [['my.origin.getIdentity', {}], ['my.strategy.getDoctrine', {}], ['my.frames.get', { category: 'timing' }], ['my.exit.getFramework', {}], ['my.exit.runDiagnostic', {}], ['my.dataset.get', { name: 'glossary' }]]) {
  const r = await (await rpc({ jsonrpc: '2.0', id: 9, method: 'tools/call', params: { name, arguments: args } })).json();
  check(`tools/call ${name}`, !!r.result?.structuredContent && !r.error, JSON.stringify(r.error || ''));
}

const callRes = await (await rpc({ jsonrpc: '2.0', id: 10, method: 'tools/call', params: { name: 'my.frames.get', arguments: { category: 'timing' } } })).json();
check('frames.get filter via MCP', callRes.result.structuredContent.items.length === 1 && callRes.result.structuredContent.items[0].name === 'Timing Asymmetry');

const glossaryTerm = await (await rpc({ jsonrpc: '2.0', id: 14, method: 'tools/call', params: { name: 'my.glossary.lookup', arguments: { term: 'ebitda' } } })).json();
check('glossary.lookup EBITDA via MCP', glossaryTerm.result?.structuredContent?.match_count >= 1 && glossaryTerm.result.structuredContent.entries.some((entry) => entry.url.includes('/glossary/')));

const glossaryIndex = await (await rpc({ jsonrpc: '2.0', id: 15, method: 'tools/call', params: { name: 'my.glossary.lookup', arguments: {} } })).json();
check('glossary.lookup index via MCP', glossaryIndex.result?.structuredContent?.entries?.length === 54, `got ${glossaryIndex.result?.structuredContent?.entries?.length}`);

const glossaryRest = await get('/glossary/lookup.json?term=earnout');
const glossaryRestBody = await glossaryRest.json();
check('GET /glossary/lookup.json term', glossaryRest.status === 200 && glossaryRestBody.match_count >= 1, `status=${glossaryRest.status} count=${glossaryRestBody.match_count}`);

const badTool = await (await rpc({ jsonrpc: '2.0', id: 11, method: 'tools/call', params: { name: 'nope' } })).json();
check('unknown tool -32602', badTool.error?.code === -32602);

const badMethod = await (await rpc({ jsonrpc: '2.0', id: 12, method: 'wat' })).json();
check('unknown method -32601', badMethod.error?.code === -32601);

const parseErr = await worker.fetch(new Request(base + '/mcp', { method: 'POST', body: '{bad' }));
check('parse error -32700', (await parseErr.json()).error?.code === -32700);

const getMcp = await worker.fetch(new Request(base + '/mcp', { method: 'GET' }));
check('GET /mcp 405', getMcp.status === 405);

const nf = await get('/nonexistent');
check('404 route', nf.status === 404);

const ds = await (await rpc({ jsonrpc: '2.0', id: 13, method: 'tools/call', params: { name: 'my.dataset.get', arguments: { name: 'bogus' } } })).json();
check('dataset.get bogus name returns error payload', ds.result.structuredContent.error === 'unknown dataset');

const diagnostic = await (await get('/exit/diagnostic.json')).json();
check('Diagnostic maps five scores to six report lenses', diagnostic.dimension_model.total_dimensions === 5 && diagnostic.dimension_model.total_report_dimensions === 6);
check('Revenue boundaries agree', diagnostic.tier_routing.tiers[0].qualifies.includes('under $1M') && diagnostic.tier_routing.tiers[1].qualifies.includes('$1M or more'));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
