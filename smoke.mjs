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

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
