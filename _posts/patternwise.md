---
date: '2026-10-23'
title: 'patternwise: Design Patterns Only Where They Pay Off'
tagline: Teaching a coding agent to refactor like the literature, not like a pattern catalogue
preview: >
  Ask an AI agent to refactor with design patterns and you usually get pattern cosplay or vague advice. patternwise is an open-source agent skill for Claude Code and Codex that judges the patterns already in your code, finds smells with file:line evidence, and refactors in small test-backed steps only after you approve the plan.
image: /images/patternwise.svg
---

# Introduction

Code review is part of my job, and the design problems I point out most often are not missing patterns. They are patterns in the wrong place: a Singleton used as global state, a `Factory` that only ever builds one thing, an interface with a single implementation. When I started asking coding agents to help with refactoring, they made the same mistakes, only faster.

patternwise is an Agent Skill that makes the agent reason the way the refactoring literature does: start from a concrete problem, pick a named technique, and reach for a design pattern only if it fixes something that hurts today.

## The Problem

Ask an agent to "refactor with design patterns" and you get one of two answers.

The first is **pattern cosplay**: an `AbstractNotifierFactory`, an `INotifier` with one implementation, an event bus between two functions. More files, same problems.

The second is **vague advice**: "consider applying SOLID principles", with no line numbers and no plan.

Neither is something I'd accept from a colleague in a review.

## The Approach

### Smell → technique → pattern

The skill reasons in chains: a *code smell* (the symptom) points to a *refactoring technique* (the treatment), which sometimes converges on a *design pattern* (the target structure). A `switch` on `customer_type` repeated in three places leads to *Replace Conditional with Polymorphism*, and maybe to Strategy, written as a dict of functions in Python rather than a class hierarchy.

### A verdict for every pattern it finds

Every pattern occurrence gets exactly one verdict: **sound**, **misapplied**, **name only** (called `*Factory` without the structure), **over-engineered** (machinery with one variant) or **uncertain**, with the evidence that would settle it. Over-engineering is reported as seriously as any smell, and techniques like *Remove Middle Man* and *Collapse Hierarchy* are first-class remedies: the skill deletes as readily as it adds.

### Explicit commands, and nothing edited without a plan

patternwise never starts on its own. There are three commands: `analyze`, `suggest` and `fix`. Only `fix` edits code, and only after the user has seen and approved a numbered plan. It runs the tests before the first edit and after every step; when there are no tests, the first step is writing characterization tests, and when the tests can't run, it doesn't edit at all.

I made it explicit-only after testing implicit triggering: another installed skill could win the match on a prompt like "clean this up" and start editing without a plan.

### Knowledge on demand

`SKILL.md` is about 200 lines. The knowledge base (23 smells, 66 refactoring techniques, all 22 GoF patterns with misuse signs and per-language idioms) lives in reference files the agent loads only when it needs them, so a quick analysis doesn't pay for the whole catalogue. A zero-dependency Python scanner maps hotspots first, by git churn, file size and repeated type-code comparisons, in about 10 seconds on Django's 124k lines.

## Results

The repo ships with hand-built cases, answer keys and a checker that flags any `file:line` or identifier the agent made up.

- On the `py-orders` case, Claude Code got both pattern verdicts and **8 of 8 smells**, and found and reproduced a real pricing bug, which it reported instead of quietly "fixing" it inside the refactoring.
- In Fix mode, across three eval rounds, it always showed the plan first, edited only after approval, and kept the tests green after every step while their count went up (6 → 16, and 0 → 22 where there were none).
- On real codebases (axios, httpie and Django), Claude Code produced 104 citations with one off-by-one line range, and Codex produced 64, with **no invented files** from either.

Every finding I quote was checked by hand against the code, and every run on a real repository fed something back into the skill, such as fallbacks for sandboxes without Python or ripgrep, and reports that stay proportional to the code.

## What I Learned

Writing a skill is closer to writing a review checklist than writing a prompt: the hard part is the rules that hold under pressure, like *never plan and apply in the same turn*, or *a bug found during a refactoring is reported, not fixed*. Evals with answer keys turned "it seems to work" into a list of concrete failures, and each one became a rule.

The code, the evals and the knowledge base are on [GitHub](https://github.com/ciroperf/patternwise).
