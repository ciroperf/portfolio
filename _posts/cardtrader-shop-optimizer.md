---
date: '2026-09-09'
title: Optimizing Magic Card Purchases on CardTrader
tagline: Finding the cheapest combination of sellers to build a deck
preview: >
  Building a Magic: The Gathering deck often requires buying singles from multiple sellers. I built a desktop app that automatically searches CardTrader's marketplace and finds the optimal combination of vendors to minimize shipping costs while getting all the cards you need.
image: /images/cardtrader-shop-optimizer.png
---

# Introduction

When you want to build a Magic: The Gathering deck, you typically need to buy cards that you don't own. One popular way is to purchase singles from CardTrader, a marketplace connecting players and sellers worldwide. However, browsing and comparing prices across different sellers is tedious. You end up with a decision problem: if I buy from seller A, I save on card X but pay more on card Y; if I buy from seller B, the shipping is cheaper but cards are more expensive. This quickly becomes overwhelming.

I built **CardTrader Deck Optimizer** to solve this: paste a decklist, let the app find the cheapest combination of sellers, and reduce your shipping costs.

## The Problem

When buying cards from multiple sellers, you face two competing concerns:

1. **Card prices vary widely** across sellers, depending on condition, language, and availability.
2. **Shipping costs are a fixed overhead per seller**, not per card. Buying all cards from one seller saves shipping, but that seller might be expensive. Splitting orders among cheaper sellers multiplies shipping costs.

This is a classic **optimization problem**, and doing it by hand is error-prone and time-consuming.

## The Solution

The app works in three stages:

### Stage 1: Parse the Decklist

I use `parse_decklist()` to convert a decklist — pasted from Moxfield or a similar site — into a simple list of card names and quantities. The parser handles markdown links (`[Card Name](url)` → `Card Name`), comments, and various formatting styles.

### Stage 2: Resolve Card Names

Card names in decklists often differ slightly from how they appear in marketplace catalogs (e.g., split cards formatted as `Fire // Ice` vs `Fire/Ice`). I built a two-step resolution:

1. **Exact match** (case-insensitive) against a local index of all Magic cards and their metadata (expansion ID, card ID).
2. **Fuzzy matching** using `rapidfuzz` with a score cutoff of 60, which handles typos and formatting variations.

The fuzzy matching is crucial — it catches edge cases without requiring the user to manually correct every card name.

### Stage 3: Optimize the Purchase Plan

Once we know which cards we need and their prices from all sellers, I use a **greedy optimization algorithm**:

1. Sort cards by their minimum price (across all sellers).
2. For each card, decide: should I buy from the cheapest seller overall, or from a seller I'm already buying from?
3. If the cheapest seller's price is within `overprice_threshold` (default 5%) of the minimum price, buy from a seller already in the plan (to consolidate). Otherwise, add the cheapest seller.

This approach is not optimal in a mathematical sense, but it's fast, predictable, and works well in practice.

## Technical Decisions

**Python + tkinter**: I chose Python for rapid development and `tkinter` with the `ttkbootstrap` theme for a native desktop look without the overhead of web frameworks. The `darkly` theme provides a modern, dark interface that looks good on all platforms.

**CardTrader API rate limiting**: The CardTrader API limits us to 10 requests per second. I implemented a sliding-window rate limiter shared across all client instances, which ensures we never hammer the API even if the UI feels responsive.

**Error handling during checkout**: If a listing becomes unavailable during checkout (HTTP 422 from CardTrader), the app doesn't fail. Instead, it searches for an alternative listing with the same language and condition, degrading gracefully if needed. Each card is retried up to 10 times before flagging it as unavailable.

**Headless testing**: The test suite runs with `pytest`, and tests that require a GUI use `Tk().withdraw()` to run in headless mode. On CI systems without an X display, these tests are automatically skipped.

## Results

The optimizer typically reduces the final cost by 15–25% compared to buying from a single seller, depending on deck composition and card availability. For a typical 60-card deck, this translates to real savings — often €5–€15 per purchase.

The app has proven useful for both casual deck builders and competitive players who buy multiple decks. The fuzzy matching catches most card name variations, and the optimization algorithm keeps shopping times reasonable (usually under 30 seconds for a full deck).

## What's Next

The app currently doesn't automatically submit the purchase plan to your cart — that's a manual step for now to let you review and adjust before committing. Adding one-click checkout (with proper user confirmation) would be the natural next step, but the current workflow keeps you in control.

