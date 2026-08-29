#!/usr/bin/env node
/**
 * Normalizes flow SVGs exported from Gravit Designer:
 * - Maps stroke widths to 2 levels: thin (1.5) and thick (3)
 * - Adds vector-effect="non-scaling-stroke" on all stroked elements
 * - Extracts <text> annotations (any transform format, any wrapper) for HTML overlay
 * - Removes <text> elements and orphaned clipPaths from the SVG
 *
 * Usage: node scripts/normalize-svg.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const SVG_FILES = [
  'assets/images/regular-flow-horizontal.svg',
  'assets/images/onesnap-flow-horizontal.svg',
  'assets/images/regular-flow-vertical.svg',
  'assets/images/onesnap-flow-vertical.svg',
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

// Parse transform="matrix(...)" or "translate(...)" regardless of spacing.
// Returns [x, y] in design coordinates, or null.
function parseTextPosition(transform) {
  if (!transform) return null;
  let m = transform.match(/matrix\(\s*([^)]*)\)/);
  if (m) {
    const nums = m[1].trim().split(/[\s,]+/).map(Number);
    if (nums.length >= 6 && nums.every((n) => !isNaN(n))) {
      // matrix(a b c d e f) -> translation is e, f
      return [nums[4], nums[5]];
    }
    return null;
  }
  m = transform.match(/translate\(\s*([^)]*)\)/);
  if (m) {
    const nums = m[1].trim().split(/[\s,]+/).map(Number);
    if (nums.length >= 1 && nums.every((n) => !isNaN(n))) {
      return [nums[0], nums[1] ?? 0];
    }
  }
  return null;
}

function processFile(filepath) {
  let svg = readFileSync(filepath, 'utf-8');

  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
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

  // 3. Extract ALL text annotations regardless of wrapper structure,
  //    then remove the <text> elements. A text that cannot be parsed is
  //    KEPT in the SVG and reported, never silently deleted.
  const annotations = [];
  const warnings = [];
  const textRe = /<text\b[^>]*>([\s\S]*?)<\/text>/g;
  svg = svg.replace(textRe, (full, inner) => {
    const tag = full.slice(0, full.indexOf('>') + 1);
    const transform = (tag.match(/transform="([^"]*)"/) || [])[1];
    const pos = parseTextPosition(transform);
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const style = (tag.match(/style="([^"]*)"/) || [])[1];
    const wm = style.match(/font-weight:(\d+)/);
    if (pos && text) {
      annotations.push({
        x: +(pos[0] / vw * 100).toFixed(2),
        y: +(pos[1] / vh * 100).toFixed(2),
        text,
        weight: wm && +wm[1] >= 700 ? 'bold' : 'normal',
      });
      return ''; // drop the extracted text element
    }
    if (text) {
      warnings.push(
        `  ⚠ ${filepath}: texte conservé (transform non reconnu) "${text.slice(0, 60)}..." transform="${transform}"`
      );
      return full; // keep it — never delete what we cannot extract
    }
    return ''; // empty text, safe to drop
  });

  // 4. Remove clipPath defs that are no longer referenced
  svg = svg.replace(
    /<clipPath[^>]*id="(_clipPath_[^"]+)"[^>]*>[\s\S]*?<\/clipPath>/g,
    (full, id) => (svg.includes(`url(#${id})`) ? full : '')
  );

  writeFileSync(filepath, svg);
  console.log(`  ${filepath}: ${annotations.length} annotations extracted`);
  for (const w of warnings) console.log(w);

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
