# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Ciro Perfetto, built from the `react-portfolio-template` (Chetan Verma) on Next.js 12 (pages router), React 18, Tailwind CSS 3, and GSAP. Plain JavaScript, no TypeScript. There is no test suite.

## Commands

Package manager is Yarn 1 (`yarn.lock`, `packageManager` pinned in `package.json`).

```bash
yarn install
yarn dev      # dev server on :3000 — also enables the in-browser editors (see below)
yarn build    # production build; statically generates every blog post
yarn start    # serve the production build
yarn lint     # next lint (eslint-config-next / core-web-vitals)
```

## Architecture

**All site content is data, not code.** `data/portfolio.json` is the single source of truth for the name, header taglines, socials, `projects`, `services`, `aboutpara`, `resume`, and the feature flags `showBlog`, `showResume`, `darkMode`, `showCursor`. Pages and components import it directly at build time (`import data from "../data/portfolio.json"`); `components/Header` reads the flags to decide which nav links / theme toggle to show. To change what the site displays, edit this JSON rather than the components. `data/portfolio copy.json` is a stale backup that nothing imports.

**Blog** posts are Markdown files with gray-matter frontmatter in `_posts/` (`date`, `title`, `tagline`, `preview`, `image`). The filename is the slug. `utils/api.js` (`getPostSlugs`/`getPostBySlug`/`getAllPosts`) reads them from disk; `pages/blog/index.js` and `pages/blog/[slug].js` consume them via `getStaticProps`/`getStaticPaths` (`fallback: false`, so a new post requires a rebuild). Homepage project cards link into the blog with a relative `url` like `"blog/<slug>"`, or to an external URL.

**Dev-only editing UI.** When `NODE_ENV === "development"`:
- `pages/edit.js` (reached via the "Edit Data" button on the homepage) is a dashboard that POSTs the whole data object to `pages/api/portfolio.js`, which overwrites `data/portfolio.json` with un-pretty-printed `JSON.stringify` output — expect large diffs if it is used.
- `components/BlogEditor` + `pages/api/blog/edit.js` rewrite a post's `.md`; `pages/api/blog/index.js` creates (uuid-named) or deletes posts.
These API routes are no-ops in production; never rely on them for runtime behavior.

**Styling/animation.** Tailwind with `darkMode: "class"` (driven by `next-themes` `ThemeProvider` in `pages/_app.js`) and custom breakpoints `mob`/`tablet`/`laptop`/`desktop`/`laptopl` — use these, not Tailwind's default `sm`/`md`/`lg`. Global styles and markdown styles live in `styles/`. Entrance animations use the GSAP `stagger` helper in `animations/index.js` together with `useIsomorphicLayoutEffect` from `utils/index.js`.

`pages/_app.js` also injects Google Analytics (`GA_ID`) and reports route changes.

Static images live in `public/images/` and are referenced as `/images/<file>`.

## Automated project publishing

`.github/workflows/agent-publisher.yml` (comments in Italian) runs Claude Code on `repository_dispatch: publish-project` or manual dispatch with `slug`, `title`, and project repo. It creates branch `agent/portfolio-<slug>` and opens a PR to `main` (never merges) that:
1. appends exactly one entry to the end of `projects` in `data/portfolio.json` — `{ id: <max id + 1, as a string>, title, description, imageSrc: "/images/<slug>.png", url: "blog/<slug>" }` — without reordering or reformatting the rest of the file (keep the diff to a few lines);
2. adds `_posts/<slug>.md` with the frontmatter above, written first-person in the tone of `_posts/fake-news-detection.md` (problem, approach, technical decisions, results; no marketing);
3. downloads the project's screenshot to `public/images/<slug>.png` from `raw.githubusercontent.com` — if none exists, don't fabricate one; note it in the PR description.

Follow the same conventions when adding a project by hand.
