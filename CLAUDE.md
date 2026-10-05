# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio and blog for Ciro Perfetto. Next.js 16 (App Router) with React 19, TypeScript, Tailwind CSS 4 and visual effects from React Bits. All content is in English. There is no test suite.

## Commands

Node 24 (`.nvmrc`), Yarn 1.

```bash
yarn install
yarn dev        # dev server on :3000
yarn build      # static export to out/ (also type-checks)
yarn lint       # eslint . (flat config, eslint-config-next)
npx serve out   # preview the production build locally
```

## Deployment

`next.config.ts` sets `output: "export"`: the site is fully static, with no API routes and no server code at runtime. Netlify builds every pushed branch (`netlify.toml`: `yarn build`, publish `out`), so a branch push gives a preview deploy and a merge to `main` deploys production. Anything that requires a Node server (route handlers, `next/image` optimization, dynamic params) will break the export.

## Architecture

**Content is data.** `data/portfolio.json` holds everything shown on the site: identity and hero text, stats, `about` paragraphs, socials, `projects`, `experience`, `education`, `skills`, `certifications`, `spokenLanguages`. `lib/content.ts` re-exports it (types are inferred from the JSON) and owns the small display rules: projects are rendered newest-first (reverse file order), and `projectHref` turns the stored `"blog/<slug>"` form into a root-relative link. To change copy, edit the JSON, not the components.

**Blog.** Markdown posts with gray-matter frontmatter (`date`, `title`, `tagline`, `preview`, `image`) live in `_posts/`; the filename is the slug. `lib/posts.ts` reads them and renders Markdown to HTML at build time (remark + GFM). `app/blog/[slug]` uses `generateStaticParams` with `dynamicParams = false`, so a new post only exists after a rebuild. Post HTML is styled with `@tailwindcss/typography` (`prose` classes).

**Layout.**
- `app/`: routes only (`/`, `/blog`, `/blog/[slug]`), plus `layout.tsx` (fonts, metadata, Google Analytics, Lenis smooth scroll, nav, footer, page-bottom blur) and `globals.css`.
- `components/home/`: one file per homepage section, composed in `app/page.tsx`.
- `components/site/`: pieces shared across pages.
- `components/reactbits/`: vendored React Bits components (see below).

Pages and sections are server components; interactivity lives in the client components they render.

**Theme.** Dark only. Design tokens (colors `ink`/`panel`/`line`/`fg`/`muted`/`accent`/`amber`, Geist Sans/Mono fonts) are defined in the `@theme` block of `app/globals.css` and used as Tailwind utilities (`bg-ink`, `text-accent`, `font-mono`…). There is no `tailwind.config` file.

## React Bits components

Components in `components/reactbits/` come from the React Bits shadcn registry (TS + Tailwind variants) and are kept as published: they are excluded from lint, so customize them via props rather than editing them. `components.json` registers the registry as `@react-bits` (pointing at the React Bits GitHub repo because `reactbits.dev` may be blocked) and installs into `components/reactbits/`. `.mcp.json` registers the shadcn MCP server, which reads the same config. Add a component with:

```bash
npx shadcn@latest add @react-bits/<Name>-TS-TW
```

`components.json` leaves `tailwind.css`/`baseColor` empty on purpose; otherwise the CLI tries to fetch base colors from ui.shadcn.com and patch `globals.css`. Some React Bits components read `window` in default props and fail during static export; pass those props explicitly (e.g. `FaultyTerminal` gets `dpr`).

## Toolchain notes

- TypeScript is pinned to 6.x because typescript-eslint does not support TypeScript 7 yet.
- `eslint.config.mjs` sets `settings.react.version` explicitly, because eslint-plugin-react's auto-detection crashes on ESLint 10.

## Automated project publishing

`.github/workflows/agent-publisher.yml` (comments in Italian) is driven by the AI Factory repo (`ciroperf/ai-factory`, whose `config.yml` hardcodes this repo's paths: `data/portfolio.json`, `_posts`, `public/images`, `blog/{slug}`, and `_posts/fake-news-detection.md` as tone reference, so keep these stable). On `repository_dispatch: publish-project` it opens a PR from `agent/portfolio-<slug>` (never merges) that:
1. appends exactly one entry to the end of `projects` in `data/portfolio.json`: `{ id: <max id + 1, as a string>, title, description, imageSrc: "/images/<slug>.png", url: "blog/<slug>" }`, without touching the rest of the file;
2. adds `_posts/<slug>.md` with the frontmatter above, first-person, in the tone of `_posts/fake-news-detection.md`;
3. downloads the project's screenshot to `public/images/<slug>.png`; if none exists, it must not fabricate one and notes it in the PR.

Follow the same conventions when adding a project by hand.
