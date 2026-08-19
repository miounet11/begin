#!/usr/bin/env node
/**
 * verify.mjs — dependency-free self-check for begin repo
 * 
 * Run: node checks/verify.mjs
 * Or:  npm run verify
 * 
 * Checks:
 * 1. All entry files in catalog.json exist
 * 2. FAMILY.md links all 5 family repos + begin USAGE
 * 3. No BEGIN-* gate ids anywhere in the repo
 * 4. templates/tech-options.md exists (source); product/tech-decision.md exists (filled decision)
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

let errors = [];
let warnings = [];

function error(msg) {
  errors.push(`ERROR: ${msg}`);
}

function warn(msg) {
  warnings.push(`WARN: ${msg}`);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    return null;
  }
}

function readText(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch (e) {
    return null;
  }
}

function walkDir(dir, callback, ignoreDirs = ['.git', 'node_modules']) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.includes(entry.name)) {
        walkDir(fullPath, callback, ignoreDirs);
      }
    } else {
      callback(fullPath);
    }
  }
}

// Check 1: All entry files in catalog.json exist
function checkEntryFilesExist() {
  const catalogPath = join(ROOT, 'catalog.json');
  const catalog = readJson(catalogPath);
  
  if (!catalog) {
    error('catalog.json does not exist or is invalid JSON');
    return;
  }
  
  if (!Array.isArray(catalog.entry)) {
    error('catalog.json missing "entry" array');
    return;
  }
  
  for (const entry of catalog.entry) {
    const fullPath = join(ROOT, entry);
    if (!existsSync(fullPath)) {
      error(`Entry file does not exist: ${entry}`);
    }
  }
}

// Check 2: FAMILY.md links all 5 family repos + begin USAGE
function checkFamilyLinks() {
  const familyPath = join(ROOT, 'FAMILY.md');
  const content = readText(familyPath);
  
  if (!content) {
    error('FAMILY.md does not exist');
    return;
  }
  
  const requiredRepos = [
    { name: 'build-standard', pattern: /github\.com\/miounet11\/build-standard/ },
    { name: 'ship-standard', pattern: /github\.com\/miounet11\/ship-standard/ },
    { name: 'creativity-is-engineering', pattern: /github\.com\/miounet11\/creativity-is-engineering/ },
    { name: 'ability-harness', pattern: /github\.com\/miounet11\/ability-harness/ },
    { name: 'review-harness', pattern: /github\.com\/miounet11\/review-harness/ },
  ];
  
  const requiredBeginLinks = [
    { name: 'USAGE.md', pattern: /\[USAGE\.md\]\(\.\/USAGE\.md\)|USAGE\.md/ },
  ];
  
  for (const repo of requiredRepos) {
    if (!repo.pattern.test(content)) {
      error(`FAMILY.md missing link to ${repo.name}`);
    }
  }
  
  for (const link of requiredBeginLinks) {
    if (!link.pattern.test(content)) {
      error(`FAMILY.md missing link to ${link.name}`);
    }
  }
}

// Check 3: No BEGIN-* gate ids anywhere
function checkNoBeginGateIds() {
  const beginGatePattern = /BEGIN-\d+/gi;
  
  walkDir(ROOT, (filePath) => {
    if (!filePath.endsWith('.md') && !filePath.endsWith('.json') && !filePath.endsWith('.mjs')) {
      return;
    }
    
    const content = readText(filePath);
    if (!content) return;
    
    const matches = content.match(beginGatePattern);
    if (matches) {
      const relPath = relative(ROOT, filePath);
      error(`Found BEGIN-* gate id in ${relPath}: ${matches.join(', ')}`);
    }
  });
}

// Check 4: templates/tech-options.md and product/tech-decision.md both exist
function checkTechFiles() {
  const techOptionsPath = join(ROOT, 'templates', 'tech-options.md');
  const techDecisionPath = join(ROOT, 'product', 'tech-decision.md');
  
  if (!existsSync(techOptionsPath)) {
    error('templates/tech-options.md does not exist (source template)');
  }
  
  if (!existsSync(techDecisionPath)) {
    error('product/tech-decision.md does not exist (filled decision for begin itself)');
  }
}

// Check 5: templates/competitors.md and product/competitors.md both exist
function checkCompetitorsFiles() {
  const competitorsTemplatePath = join(ROOT, 'templates', 'competitors.md');
  const competitorsFillPath = join(ROOT, 'product', 'competitors.md');
  
  if (!existsSync(competitorsTemplatePath)) {
    error('templates/competitors.md does not exist (source template)');
  }
  
  if (!existsSync(competitorsFillPath)) {
    error('product/competitors.md does not exist (filled for begin itself)');
  }
}

// Check 6: catalog.json family URLs match FAMILY.md
function checkCatalogFamilySync() {
  const catalogPath = join(ROOT, 'catalog.json');
  const catalog = readJson(catalogPath);
  
  if (!catalog || !catalog.family) {
    return;
  }
  
  const expectedRepos = {
    create: 'build-standard',
    ship: 'ship-standard',
    create_law: 'creativity-is-engineering',
    ability: 'ability-harness',
    review: 'review-harness',
  };
  
  for (const [key, expectedName] of Object.entries(expectedRepos)) {
    const url = catalog.family[key];
    if (!url) {
      warn(`catalog.json family missing key: ${key}`);
    } else if (!url.includes(expectedName)) {
      warn(`catalog.json family.${key} expected to contain ${expectedName}, got: ${url}`);
    }
  }
}

// Run all checks
console.log('begin verify: checking repo consistency...\n');

checkEntryFilesExist();
checkFamilyLinks();
checkNoBeginGateIds();
checkTechFiles();
checkCompetitorsFiles();
checkCatalogFamilySync();

// Report results
if (warnings.length > 0) {
  console.log('Warnings:');
  for (const w of warnings) {
    console.log(`  ${w}`);
  }
  console.log('');
}

if (errors.length > 0) {
  console.log('Errors:');
  for (const e of errors) {
    console.log(`  ${e}`);
  }
  console.log(`\nverify: FAILED (${errors.length} error(s))`);
  process.exit(1);
} else {
  console.log('verify: PASSED');
  process.exit(0);
}
