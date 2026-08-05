#!/usr/bin/env node
/**
 * Normalizes flow SVGs exported from Gravit Designer:
 * - Maps stroke widths to 2 levels: thin (1.5) and thick (3)
 * - Adds vector-effect="non-scaling-stroke" on all stroked elements
 * - Extracts <text> annotations for HTML overlay
 * - Removes <text> elements and their clipPaths from the SVG
 *
 * Usage: node scripts/normalize-svg.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const SVG_FILES = [
  'assets/images/regular-flow.svg',
  'assets/images/onesnap-flow.svg',
];

const NORMALIZE_ONLY = [
  'assets/images/home-2.svg',
  'assets/images/how-it-works.svg',
];

function mapStrokeWidth(raw) {
  const w = parseFloat(raw);
  if (isNaN(w)) return raw;
  if (w < 4) return '2';
  if (w <= 7) return '4';
  return '6';
}

function processFile(filepath) {
  let svg = readFileSync(filepath, 'utf-8');

  const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!vb) throw new Error(`No viewBox in ${filepath}`);
  const vw = +vb[1], vh = +vb[2];

  // 1. Normalize stroke widths: <=3 → 1.5, >3 → 3
  svg = svg.replace(
    /stroke-width="([^"]+)"/g,
    (_, v) => `stroke-width="${mapStrokeWidth(v)}"`
  );

  // 2. Ensure vector-effect="non-scaling-stroke" on stroked elements
  svg = svg.replace(
    /(<(?:path|line|polyline|polygon|rect|ellipse|circle)\b[^>]*?stroke="[^"]*")([^>]*?)(\/?>)/g,
    (full, before, mid, end) => {
      if (full.includes('vector-effect')) return full;
      return before + mid + ' vector-effect="non-scaling-stroke"' + end;
    }
  );

  // 3. Extract text annotations and mark blocks for removal
  const annotations = [];
  const blocksToRemove = [];

  const blockRe = /<g\s+clip-path="url\(#([^"]+)\)"[^>]*>([\s\S]*?)<\/g>\s*<defs>[\s\S]*?<clipPath[^>]*?id="\1"[^>]*?>[\s\S]*?<\/clipPath>\s*<\/defs>/g;

  let m;
  while ((m = blockRe.exec(svg)) !== null) {
    const inner = m[2];
    if (!inner.includes('<text')) continue;

    blocksToRemove.push(m[0]);

    const textRe = /<text\s+transform="matrix\(1,0,0,1,([\d.]+),([\d.]+)\)"\s+style="([^"]*)">(.*?)<\/text>/g;
    let t;
    while ((t = textRe.exec(inner)) !== null) {
      const wm = t[3].match(/font-weight:(\d+)/);
      annotations.push({
        x: +(parseFloat(t[1]) / vw * 100).toFixed(2),
        y: +(parseFloat(t[2]) / vh * 100).toFixed(2),
        text: t[4].trim(),
        weight: wm && +wm[1] >= 700 ? 'bold' : 'normal',
      });
    }
  }

  // 4. Remove text blocks and their clipPath defs
  for (const block of blocksToRemove) {
    svg = svg.replace(block, '');
  }

  writeFileSync(filepath, svg);
  console.log(`  ${filepath}: ${annotations.length} annotations extracted`);

  return { viewBox: { width: vw, height: vh }, annotations };
}

// Load existing annotations to preserve them on re-run
let existing = {};
if (existsSync('data/flow-annotations.json')) {
  existing = JSON.parse(readFileSync('data/flow-annotations.json', 'utf-8'));
}

console.log('Normalizing flow SVGs...\n');

// Normalize-only files (no annotations to extract)
for (const f of NORMALIZE_ONLY) {
  processFile(f);
}

const result = {};
for (const f of SVG_FILES) {
  const fresh = processFile(f);
  // Keep existing annotations if no new ones were extracted (already processed)
  if (fresh.annotations.length === 0 && existing[f]?.annotations?.length > 0) {
    result[f] = existing[f];
  } else {
    result[f] = fresh;
  }
}

mkdirSync('data', { recursive: true });
writeFileSync('data/flow-annotations.json', JSON.stringify(result, null, 2));
console.log('\nDone. Annotations written to data/flow-annotations.json');
