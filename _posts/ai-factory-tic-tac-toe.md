---
date: '2026-09-08'
title: Building Tic-Tac-Toe Without Frameworks
tagline: A minimal, dependency-free game showcasing what simple tools can do
preview: >
  I built a browser-based tic-tac-toe game with vanilla JavaScript, no build tools, and no frameworks. The project explores how eliminating complexity can sharpen design decisions and make a game both faster to develop and easier to maintain.
image: /images/ai-factory-tic-tac-toe.png
---

# Building Tic-Tac-Toe Without Frameworks

When I set out to build this tic-tac-toe game, I had one constraint: keep it simple enough that someone could open a single HTML file and start playing immediately. No npm install. No build step. No framework overhead.

## The Problem

Most browser games come bundled with frameworks, build tools, and dependencies. But for a small game like tic-tac-toe, that feels like bringing a truck to carry a book. Every dependency adds complexity — not just to the codebase, but to how people consume it. Want to run the game? Clone the repo, npm install, npm start. Want to modify it? Navigate a build pipeline.

I wanted something different: a game you could literally open in a browser, understand completely by reading the code, and modify without tooling.

## The Approach

I separated the code into three concerns:

- **Game logic** (`game.js`): the rules of tic-tac-toe — valid moves, winning conditions, game state. No DOM, no UI. Pure functions tested with Node's built-in test runner.
- **UI logic** (`app.js`): rendering the board, handling clicks, alternating turns, showing results. It calls game.js to validate moves and check wins.
- **AI** (`ai.js`): the CPU opponent. For this version, it picks randomly among available cells. Simple, but good enough for the game's purpose as a learning showcase.

The entire thing runs as vanilla JavaScript modules in the browser. No transpilation, no bundling.

## Why This Mattered

Working without frameworks forced clarity. There's no abstraction to hide behind — every line of code has to justify its existence. I used semantic HTML, CSS Grid for the board layout (responsive down to 375px), and ES modules for organization. The test suite runs with `node --test`, no additional test framework needed.

The lack of dependencies also meant thinking about every decision differently. Should the CPU be smarter? That would mean implementing minimax or alpha-beta pruning — real code I'd have to write and understand. I chose randomness instead, keeping the codebase small enough to follow in a single sitting. This is intentional: the game is useful *because* it's simple.

## What I Learned

This project confirmed something I'd suspected: for small, focused problems, simplicity often beats sophistication. The game doesn't need a state management library. It doesn't need a component framework. It needs clear separation of concerns and code that reads like pseudocode.

The real value emerged when adding features. When a friend asked, "Can the CPU play smarter?", I could hand them `ai.js` and they could modify it without understanding webpack configuration or hooks or the shadow DOM. That's worth something.
