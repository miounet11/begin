#!/usr/bin/env node
/**
 * family-router MCP server
 * 
 * A routing MCP for the miounet11 family of standards.
 * This is a query-only router — the authoritative sources remain on GitHub.
 * 
 * Fetches LIVE from GitHub raw on each call (with 5-min in-memory TTL).
 * No secrets, no tokens, no host addresses.
 * 
 * Run: node mcp/family-router.mjs
 */

import { createInterface } from 'readline';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const CATALOG_URLS = {
  begin: 'https://raw.githubusercontent.com/miounet11/begin/main/catalog.json',
  ship: 'https://raw.githubusercontent.com/miounet11/ship-standard/main/gates.json',
  shipCatalog: 'https://raw.githubusercontent.com/miounet11/ship-standard/main/catalog.json',
  buildCatalog: 'https://raw.githubusercontent.com/miounet11/build-standard/main/catalog.json',
};

const cache = new Map();

async function fetchWithCache(url) {
  const now = Date.now();
  const cached = cache.get(url);
  if (cached && now - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const data = await res.json();
  cache.set(url, { data, ts: now });
  return data;
}

const FAMILY_MAP = {
  repos: [
    { repo: 'begin', question: '新产品怎么开工 / 给执行面的第一份合同', url: 'https://github.com/miounet11/begin' },
    { repo: 'begin', question: '方案怎么被系统制定成合同', url: 'https://github.com/miounet11/begin', path: 'practices/formulate.md' },
    { repo: 'build-standard', question: '怎么创建（七步）/ 成熟度规则', url: 'https://github.com/miounet11/build-standard' },
    { repo: 'ship-standard', question: '能不能上线 / 门禁 id / stage / severity', url: 'https://github.com/miounet11/ship-standard' },
    { repo: 'creativity-is-engineering', question: '洞察有没有落成定律', url: 'https://github.com/miounet11/creativity-is-engineering' },
    { repo: 'ability-harness', question: '这个模型能不能修交接本', url: 'https://github.com/miounet11/ability-harness' },
    { repo: 'review-harness', question: '这轮迭代有没有漏审', url: 'https://github.com/miounet11/review-harness' },
  ],
  modes: {
    A: {
      name: '新产品（还没有产品仓）',
      instruction: '只发 https://github.com/miounet11/begin 一个链接。执行面读 AGENTS.md → 跑 practices/formulate.md → 产出开工包。禁止同时贴另外五本全文。',
    },
    B: {
      name: '已有产品仓（默认、推荐）',
      instruction: '产品仓根目录放 AGENTS.md（抄 templates/product-AGENTS.md）。之后打开产品仓即可，不要再贴任何家族链接。',
    },
    C: {
      name: 'Cursor 可选 MCP',
      instruction: '一个路由器，不是六套标准 MCP。工具只做查询，正文仍以 GitHub 为准。',
    },
  },
};

const PACKET_CHECKLIST = [
  { file: 'product/README.md', required: ['一句话做成', '级别', '升级到期日', '主柱', '适用纬度'] },
  { file: 'product/roadmap.md', required: ['北极星', '本季度里程碑', '本季度不做'] },
  { file: 'product/competitors.md', required: ['竞品', 'job', '学到的门禁', '不抄什么'] },
  { file: 'product/tech-decision.md', required: ['选定方案', '理由', '延后'] },
  { file: 'agent-brief.md', required: ['第一轮七步计划'] },
];

const TOOLS = [
  {
    name: 'family_map',
    description: '返回一问一仓表 + USAGE 三种模式 (A/B/C)。用来了解家族结构和正确使用方式。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'authority_for',
    description: '输入一个问题或任务，返回应该打开哪个仓、哪个路径、以及这个仓不回答什么。',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: '问题或任务（中文或英文）' },
      },
      required: ['question'],
    },
  },
  {
    name: 'get_gate',
    description: '查询 ship-standard gates.json 中的某条门禁。输入门禁 id（如 LAUNCH-5、COMPOUND-1）。',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '门禁 id（如 LAUNCH-5）' },
      },
      required: ['id'],
    },
  },
  {
    name: 'packet_checklist',
    description: '返回 begin 方案制定（formulate）的开工包清单：哪些文件必须存在、必须填哪些字段。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

function matchRepo(question) {
  const q = question.toLowerCase();
  const keywords = {
    'begin': ['开工', '合同', 'formulate', '制定', '开始', 'start', 'onboard', '产品仓', 'templates'],
    'build-standard': ['七步', 'loop', '创建', 'build', 'scheme', '成熟度', 'maturity', 'l0', 'l1', 'l2', 'l3'],
    'ship-standard': ['上线', 'ship', 'launch', '门禁', 'gate', 'preship', 'compound', 'path-', '发布', 'release'],
    'creativity-is-engineering': ['洞察', 'insight', '定律', 'law', 'creativity', '创造'],
    'ability-harness': ['模型', 'model', '交接本', 'handoff', 'ability', '能力', '评测'],
    'review-harness': ['审查', 'review', '迭代', 'iteration', '漏审'],
  };
  for (const [repo, kws] of Object.entries(keywords)) {
    for (const kw of kws) {
      if (q.includes(kw)) {
        const entry = FAMILY_MAP.repos.find(r => r.repo === repo);
        return entry || FAMILY_MAP.repos.find(r => r.repo === 'begin');
      }
    }
  }
  return FAMILY_MAP.repos.find(r => r.repo === 'begin');
}

const NOT_ANSWERED_BY = {
  'begin': '七步细节、门禁判定、洞察落成、模型评测、审查循环',
  'build-standard': '开工合同、门禁 id 含义、上线判定',
  'ship-standard': '七步怎么跑、开工合同、洞察落成',
  'creativity-is-engineering': '七步、门禁、上线判定、开工',
  'ability-harness': '门禁含义、七步、上线判定',
  'review-harness': '门禁含义、七步细节、开工合同',
};

async function handleFamilyMap() {
  return { repos: FAMILY_MAP.repos, modes: FAMILY_MAP.modes };
}

async function handleAuthorityFor(question) {
  const match = matchRepo(question);
  return {
    repo: match.repo,
    url: match.url,
    path: match.path || null,
    question_answered: match.question,
    not_answered_by_this_repo: NOT_ANSWERED_BY[match.repo] || '见 FAMILY.md',
  };
}

async function handleGetGate(id) {
  try {
    const data = await fetchWithCache(CATALOG_URLS.ship);
    const gates = data.gates || [];
    const gate = gates.find(g => g.id === id.toUpperCase());
    if (!gate) {
      return { found: false, id, message: `门禁 ${id} 不存在于 gates.json。检查 id 拼写或查看 ship-standard。` };
    }
    return { found: true, gate };
  } catch (e) {
    return { found: false, id, error: e.message };
  }
}

async function handlePacketChecklist() {
  return {
    checklist: PACKET_CHECKLIST,
    authority: 'https://github.com/miounet11/begin/blob/main/practices/formulate.md',
  };
}

async function callTool(name, args) {
  switch (name) {
    case 'family_map':
      return await handleFamilyMap();
    case 'authority_for':
      return await handleAuthorityFor(args.question || '');
    case 'get_gate':
      return await handleGetGate(args.id || '');
    case 'packet_checklist':
      return await handlePacketChecklist();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// MCP stdio protocol implementation
const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: false });

let pendingRequests = 0;
let stdinClosed = false;

function sendResponse(id, result) {
  const response = { jsonrpc: '2.0', id, result };
  process.stdout.write(JSON.stringify(response) + '\n');
}

function sendError(id, code, message) {
  const response = { jsonrpc: '2.0', id, error: { code, message } };
  process.stdout.write(JSON.stringify(response) + '\n');
}

function maybeExit() {
  if (stdinClosed && pendingRequests === 0) {
    process.exit(0);
  }
}

async function handleMessage(line) {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  const { id, method, params } = msg;

  // Handle notifications (no id)
  if (id === undefined || id === null) {
    return;
  }

  pendingRequests++;
  try {
    switch (method) {
      case 'initialize':
        sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'family-router', version: '0.3.0' },
        });
        break;

      case 'tools/list':
        sendResponse(id, { tools: TOOLS });
        break;

      case 'tools/call': {
        const { name, arguments: args } = params || {};
        if (!name) {
          sendError(id, -32602, 'Missing tool name');
          break;
        }
        const result = await callTool(name, args || {});
        sendResponse(id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] });
        break;
      }

      default:
        sendError(id, -32601, `Method not found: ${method}`);
    }
  } catch (e) {
    sendError(id, -32603, e.message);
  } finally {
    pendingRequests--;
    maybeExit();
  }
}

rl.on('line', (line) => {
  handleMessage(line);
});

rl.on('close', () => {
  stdinClosed = true;
  maybeExit();
});
