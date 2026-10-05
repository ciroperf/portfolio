---
date: '2026-10-05'
title: 'AI Factory: Five Agents, One Human Merge Button'
tagline: What happens when GitHub is the whole backend and no agent is allowed to merge
preview: >
  I wanted AI agents that do more than autocomplete: pick an idea, build it on a branch, open a pull request, publish it here and then explain it back to me. AI Factory is that system, built entirely on GitHub Actions, Pages and a JSON file, with guardrails that keep it from turning into forty junk PRs and a surprise bill.
image: /images/ai-factory.svg
---

# Introduction

I use Claude Code and GitHub Copilot every day at work, and at some point the editor started to feel like the smallest place I could use them. If an agent can write a feature, it can also open the pull request. If it can open the pull request, it can work while I'm on the train. The interesting question stopped being *can it write code* and became *how do I let it run without losing control of what ends up on `main`*.

AI Factory (I call it *Officina Agenti*, "the agents' workshop") is my answer. It is a set of five agents that propose side projects, build them, publish them to this portfolio, and finish by teaching me what I'd need to defend the work in an interview.

## The Problem

Autonomous coding agents fail in two boring ways long before they fail in interesting ones.

The first is **volume**. An agent that runs on a schedule and opens pull requests will happily open more of them than anyone can review. Unreviewed PRs pile up, the signal disappears, and you end up approving things you haven't read.

The second is **cost**. Every run spends tokens, and an agent stuck in a loop spends them fast. A system that is cheap on a good day and expensive on a bad one is not something I want running unattended.

There's a third, quieter problem: a portfolio full of projects you can't explain is worth less than three projects you built yourself. If the agents do the work, I still need to understand it.

## The Approach

### GitHub is the backend

The central decision was to not build a backend at all. GitHub already has everything a system like this needs:

| I needed | GitHub already gives me |
| --- | --- |
| A prompt queue | Issues |
| Progress tracking | Workflow runs, with logs and timings |
| Reviewable output | Pull requests |
| A database | A JSON file in the repo |
| Quality control | Branch protection |
| An API for my phone | REST, CORS-enabled, free |

An issue is the prompt. A workflow run is the progress bar. A pull request is the result. The infrastructure bill is zero: Actions are free on public repositories, the control panel is served by GitHub Pages, and state lives in `state/projects.json`.

### Five agents, one job each

Each agent is a GitHub Actions workflow that runs Claude Code with its own prompt, model, turn limit and timeout:

- **Scout** wakes up on a Monday cron and proposes three project ideas as issues, each tied to a skill worth showing.
- **Architect** runs when I approve an idea: it creates the repository, writes its `CLAUDE.md` and breaks the work into 5–8 ordered build tasks.
- **Builder** picks up a build issue and delivers working code on a branch, with passing tests, as one pull request.
- **Publisher** opens a pull request on this portfolio with the project entry, a blog post and a screenshot.
- **Mentor** reads the finished project and writes down the key decisions, likely interview questions and the gaps in my understanding.

The rule for choosing models is simple: the smallest model that can do the job. Scout and Publisher run on Haiku, the agents that write or read real code run on Sonnet.

### No agent can merge

This is the guardrail that matters most, and it is enforced by GitHub, not by a prompt. Branch protection on `main` means agents can only produce branches and pull requests; a human moves code to `main`. The loop stops and waits for me exactly twice: when I approve an idea, and when I merge a PR.

The same goes for this site. The Publisher never touches `main` of the portfolio: it opens a PR, the branch gets a preview deploy, and production only updates after I merge.

## Technical Decisions

**Guardrails run before the model wakes up.** A Python preflight script checks a monthly run budget per repository, a cap on open pull requests and a global kill switch. If any of them says no, the job exits before a single token is spent. The cap on open PRs is the one I like most: no new work starts while my review queue is backed up.

**Hard ceilings on every run.** Each workflow has a `concurrency` group (one run per repository at a time), a `timeout-minutes`, and a `--max-turns` limit. I treat `max_turns` as a brake against loops rather than a budget: wide enough that a normal task never hits it, tight enough that a stuck agent stops quickly. Agents also can't trigger each other, so there are no chain reactions.

**One config file, three model providers.** Everything lives in `config.yml`. Switching between my Claude subscription, a pay-as-you-go API key and my own Azure AI Foundry resource (authenticated via OIDC) is one line plus the right secret.

**Token efficiency as a design constraint.** Roughly 80% of the cost is the Builder, so the rest of the system is built to stay out of the way: Scout never browses the web but receives a digest of release notes prepared by a script, `--allowedTools` is kept narrow because every tool costs prompt space on every turn, and `CLAUDE.md` files are short because every agent re-reads them on every run. The biggest lever, though, is boring: issue templates that demand verifiable acceptance criteria. A precise task closes in fewer turns.

**A control panel with zero dependencies.** I drive the whole thing from my phone through a PWA written in vanilla JavaScript, with no framework, no build step and nothing loaded from a CDN. It's password-gated, and the GitHub token is encrypted at rest with AES-GCM using a key derived via PBKDF2, instead of sitting in plain `localStorage`.

## Results

The system runs with zero servers and zero infrastructure cost; the only real spend is model usage, and the preflight checks keep that predictable. Projects go from an approved idea to a reviewed pull request without me opening an editor, and this portfolio is part of the loop: the *Redis Cache Benchmark* entry arrived here as a Publisher PR that I reviewed and merged.

The part I didn't expect to value most is the Mentor. Reading its notes is how I make sure every project on this site is one I can actually talk about.

The code is on [GitHub](https://github.com/ciroperf/ai-factory).
