# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Nuxt 3 landing page** for OneSnap — a Swiss accounting/invoice management SaaS targeting freelancers and small businesses in Switzerland. The site is currently a single-page marketing site.

## Common Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build locally
npm run generate # Generate static site
```

## Tech Stack

- **Framework**: Nuxt 3 with Vue 3
- **Styling**: TailwindCSS with custom design tokens
- **Fonts**: Google Fonts (Bree Serif for titles, Inter for body)
- **Plugins**: @nuxtjs/tailwindcss, @tailwindcss/typography

## Architecture

### Pages

- `pages/index.vue` — Single-page site with multiple sections (Hero, Features, Pricing, FAQ, etc.)

### UI Components

All reusable components live in `components/ui/`

### Styling

- Tailwind config at `tailwind.config.ts` with custom colors
- Global CSS variables in `assets/css/main.css` matching Tailwind tokens
- Design uses dark backgrounds (#00281E) with accent highlights (#4CFFC9)

## Design System

| Token      | Value      | Usage                    |
| ---------- | ---------- | ------------------------ |
| accent     | #4CFFC9    | Primary CTAs, highlights |
| middle     | #5E8278    | Secondary text           |
| dark       | #00281E    | Dark backgrounds         |
| light      | #F7FFFD    | Light backgrounds        |
| font-title | Bree Serif | Headings                 |
| font-body  | Inter      | Body text                |

## Debuging

Use `chrome-devtools` MCP for debugging.
**Dev server**: http://localhost:3000/ (already logged in for debugging)
