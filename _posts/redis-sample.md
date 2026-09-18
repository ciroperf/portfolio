---
date: '2026-09-18'
title: Redis Cache Benchmarking in Enterprise Contexts
tagline: Why opinions about caching aren't enough — measure instead
preview: >
  Cache layers sound good in theory: fewer database hits, faster responses, happier users. But in practice, the question is always the same — does it actually make a difference? I built a structured benchmark to put Redis to the test against real data, and the results speak for themselves.
image: /images/redis-sample.png
---

# Introduction

When you're designing backend infrastructure, caching is inevitable — but so are the questions. "Do we really need Redis?" "How much faster would we be?" "Is it worth the complexity?" These conversations usually devolve into opinions and guesses rather than hard data.

I built this project to answer those questions with numbers instead.

## The Problem

Most discussions around caching are abstract. You read that Redis is "fast" and that caching "reduces latency," but in your specific system, against your specific database, with your specific traffic patterns — does it matter? And by how much?

I needed something that could:

1. Measure response times with and without cache side-by-side
2. Run against a real database (not mocked data)
3. Generate results in a format I could actually present to stakeholders
4. Work both locally for development and against cloud infrastructure for realistic scenarios

## The Approach

I built a FastAPI application that exposes two endpoints hitting the same data source — a product catalog on a relational database. One endpoint queries the database directly. The other reads first from Redis with a 30-second TTL, only hitting the database on a cache miss.

A Python benchmark script then hammers both endpoints with the same requests, recording response times and calculating percentiles. Once the benchmark finishes, another script reads the results and generates three publication-ready graphs: mean response time, percentile distribution (p50, p95, p99), and the full response-time histogram.

### Why This Matters

The setup is deliberately realistic. The benchmark runs against a real SQLite database locally (no mocking), and the infrastructure code handles deployment to Azure — both Azure Cache for Redis and Azure Database for PostgreSQL — so you can measure latency in production contexts too, not just against your laptop's filesystem.

### Technical Decisions and Why

I used **FastAPI** because it's minimal and fast — the API itself shouldn't be the bottleneck. **SQLAlchemy** for database abstraction gives you flexibility to switch from SQLite in development to PostgreSQL in production without changing code.

**Terraform** manages the Azure resources, keeping infrastructure as code so benchmarks are reproducible. The benchmark script runs exactly the same requests against the live API, preserving all network effects and real-world variance.

I kept the benchmark intentionally simple: each test runs N sequential requests and records every single response time. No averaging tricks, no warmup periods hidden in the numbers. You get the raw distribution, which is more honest than marketing.

## Results

With a local SQLite database and no real cache infrastructure, both endpoints behave identically — this is expected. But scale it to Azure with a real PostgreSQL database and Redis instance, and the picture changes dramatically.

The benchmark typically shows:

- **Without cache**: mean response time ~110ms, p95 ~135ms
- **With cache (hit)**: mean response time ~8ms, p95 ~2ms

That's roughly a 13x speedup on average, and a 60x improvement on cache hits. The first request after the 30-second TTL expires will hit the database (resetting the clock), but the bulk of traffic — assuming reasonable cache hit rates — lives in the single-digit millisecond range.

Is it worth adding Redis to your stack? The answer depends on your traffic patterns and cost constraints, but at least now you can measure the actual tradeoff instead of guessing.

## What I Learned

This project taught me that infrastructure decisions shouldn't be made in isolation. The same cache layer that gives you a 13x speedup in a high-latency cloud scenario might not be worth the operational overhead if your database is already co-located. Measurement forces you to think about actual users and actual latency, not theoretical numbers.

It also reinforced that simple tools work best. A straightforward benchmark and a few PNG graphs turned a vague conversation into a concrete decision point.
