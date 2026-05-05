# SVG Flow Normalization

_please put all link path absolute from the root of the project_

## Data flow

1. User exports SVG from Gravit Designer to `public/` directory
   ↓
2. Run `node [scripts/normalize-svg.mjs](scripts/normalize-svg.mjs)`
   - Parse each SVG file listed in `SVG_FILES`
   - Map stroke widths to 3 levels: `<4 → 2`, `4-7 → 4`, `>7 → 6`
   - Ensure `vector-effect="non-scaling-stroke"` on all stroked elements
   - Extract `<text>` annotations with positions (x, y as % of viewBox)
   - Remove `<text>` elements and associated `<clipPath>` defs from SVG
   - Write normalized SVG back to `public/`
     ↓
3. Write annotations to [data/flow-annotations.json](data/flow-annotations.json)
   - Positions stored as percentages (x%, y%) relative to viewBox
   - Each annotation has: x, y, text, weight (bold/normal)
     ↓
4. [pages/index.vue](pages/index.vue) renders the flow comparison
   - Import annotations from `data/flow-annotations.json`
   - Display SVG via `<img>` in a relative container
   - Overlay text as absolute-positioned HTML spans
   - Fixed font size (11px) independent of SVG scaling

## Design choices

- Three stroke levels (2, 4, 6) with thresholds `<4`, `4-7`, `>7` to normalize variable exports from Gravit Designer
- Text extracted from SVG and rendered as HTML overlay to keep font size constant regardless of SVG scaling — SVG `<text>` font-size scales with the viewBox, HTML overlay does not
- Positions stored as percentages of viewBox dimensions so annotations stay aligned at any container width
- Script is idempotent: running on already-normalized SVGs produces the same result
