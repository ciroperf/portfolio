---
date: '2026-10-18'
title: 'right-size: Giving Every Coding Task the Compute It Deserves'
tagline: What a benchmark on real bug fixes taught me about where coding agents waste tokens
preview: >
  Coding agents run renames on the biggest model at the highest effort, and hand work to subagents that cost more than doing it inline. right-size is a set of open-source Agent Skills and a small router that decide whether to delegate, which model tier to use and which effort, for Claude Code and Codex, and a public benchmark that measures whether any of it actually saves money.
image: /images/right-size.svg
---

# Introduction

When I built AI Factory, roughly 80% of the cost came from a single agent, and most of the work I did on cost was about keeping everything else out of its way. That got me looking at my day-to-day sessions with Claude Code and Codex the same way, and the waste was easy to spot: the same model, at the same effort, for a one-line fix and for a payment migration.

Every agent now exposes the controls to do better (model per subagent, reasoning effort per session or per agent), but none of them tells you *what to set*. right-size is my attempt at that missing piece: a few Agent Skills and a small router, open source and multi-harness, with a benchmark in the repo.

## The Problem

Coding agents waste tokens in two predictable ways.

The first is **oversizing**. Everything runs on the biggest model at the highest effort, including renames and boilerplate. It feels safe, and it is slow and expensive.

The second is **delegating when it doesn't pay**. A subagent starts cold: its own system prompt, its own context, re-reading files the main agent already has. On a small change, the briefing and the review cost more than the work itself. Before writing any code I checked what already existed, and found routers that hook every subagent spawn in a single harness, and skills that suggest a tier, but nothing that would say *don't delegate*, nothing that worked across agents, and no published numbers behind the savings everyone claims.

## The Approach

### Tiers, not model names

The skills reason in five abstract tiers: `inline` (do it in the main session), `scout` (read and search), `mechanical` (renames, imports), `standard` (ordinary features and fixes) and `deep` (auth, security, migrations, payments, concurrency). Model names live only in small YAML maps, one per harness, each with the date it was checked against the vendor's docs. When a new model ships, only the map changes, and keeping those maps current is most of the maintenance.

### Three ways to use it

- **`/right-size-defaults`** looks at the project's safety net and risk profile and sets the model and effort new sessions start on. It never picks `high` or above as a default: those are escalation steps.
- **The `right-size` advisor** sizes work inside a session and answers in a four-line block: delegate or not, which tier and effort, why, and when to step up.
- **Router mode** (`route.py`, standard library only) sizes the task with one call on the cheapest tier, about $0.002, then starts Claude Code or Codex on the right model and effort, and resumes the session one or two tiers up if it gets stuck.

```
right-size: delegate=no · tier=deep · effort=medium
why: auth + users schema change (risk floor → deep), no tests, ~3 files
apply: inline; run the session on opus (/model opus) at medium effort (claude-code)
escalate if: a verifiable failure → /effort high; past deep only after you confirm
```

### Risk-aware, and escalation on evidence

Risk sets a floor: auth, payments, migrations and public APIs go to `deep` however small the diff, while a read-only question about them stays cheap. When tests exist, the work starts low and steps up one tier on a verifiable failure, two on a reasoning failure, and raises effort before moving past the top tier. A `.right-size.yaml` at the repo root can cap the tier for a project.

## Results

I ran the benchmark on 10 real [Hono](https://github.com/honojs/hono) bug fixes merged after the models' training cutoff, each scored by its own pull request's tests, with Claude Code headless and Opus as the main model.

| Config | Solved | Total cost | Total time |
| --- | --- | --- | --- |
| default (Opus, default effort) | 10/10 | $3.31 | 9 min |
| max (Opus, effort `max`) | 10/10 | $13.01 | 50 min |
| right-size (advisor + subagents) | 9/10 | $3.77 | 11 min |

Maximum effort cost **3.9× as much and took 5.3× as long**, and solved nothing extra. right-size itself did *not* beat the default: reading the skill and sizing the task is overhead, and it correctly never delegated, so there was nothing to save. That result changed the project. Inside a session, advice can't save much on small fixes, because the session keeps the model it started with, so the decision has to move in front of the session.

A second round, with two prompts of three independent bugs each, confirmed it. A whole session on Sonnet solved **all six bugs for $0.41**, 60% less than the Opus default ($1.03) and about three times faster. Forcing every bug onto a subagent cost $2.09, twice the default. Those numbers are why `/right-size-defaults` and router mode exist, and why the `deep` tier now starts at medium effort.

## What I Learned

The biggest saving wasn't clever routing; it was **the model a session starts on**. Delegation rarely pays on small, related fixes, and maximum effort is the most expensive habit of all.

I also learned to publish the regressions. One task failed under right-size, most likely run-to-run variance, but a single run per configuration can't prove it, so it stays in the README next to the wins. The next benchmark, already prepared, adds harder tasks where a cheaper model should fail, and three runs per configuration.

The code, the benchmark and every run record are on [GitHub](https://github.com/ciroperf/right-size).
