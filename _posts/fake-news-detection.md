---
date: '2025-05-31'
title: Fighting Fake News with AI and Agent-Based Modeling
tagline: A hybrid approach to understanding and mitigating misinformation
preview: >
  In today's digital era, fake news spreads faster than truth, threatening public trust and democratic processes. In my master's thesis, I developed a hybrid model that combines agent-based simulations and deep reinforcement learning to analyze and mitigate the spread of fake news in online social networks.
image: /images/fake-news-image.png
---

# Introduction

Fake news on social media is more than a nuisance — it’s a major societal threat. It spreads rapidly, influences public opinion, and often reinforces biased or polarized views through so-called *echo chambers*. In my Master's thesis, I set out to study this phenomenon using a hybrid simulation approach: combining **agent-based modeling (ABM)** with **deep reinforcement learning (DRL)**.

## The Problem

Echo chambers amplify misinformation by clustering users with similar opinions, which reinforces their views and increases the virality of fake news. Traditional methods to combat misinformation often focus on content detection. However, I aimed to address a different challenge: **interrupting the diffusion process** itself.

## The Methodology

My approach integrates two key technologies:

- **Agent-Based Modeling** (ABM): simulates how fake news spreads in a network of interacting agents.
- **Deep Reinforcement Learning** (DRL): trains a "super-agent" to intervene intelligently and reduce virality in real time.

### Simulation Setup

The simulation models a social network where users (agents) hold varying opinions — supportive, neutral, or opposed to misinformation. The fake news diffusion is driven by factors like:

- Network structure (e.g., Erdős–Rényi, Small-World)
- Opinion thresholds (credulity)
- Echo chamber density

### The Super-Agent

The DRL-based super-agent observes the state of the network and learns to act strategically — for example, by promoting counter-information or disrupting clusters. It’s trained using reward-based feedback to maximize long-term suppression of misinformation.

## Results

Initial experiments showed that the model can **reduce fake news virality by up to 55%** in echo chamber-dense networks. This demonstrates the power of combining theoretical modeling with AI to not only understand the dynamics but actively mitigate harmful outcomes.

### Code Block Example

```python
# Sample pseudocode for environment-agent loop
for step in simulation:
    state = get_network_state()
    action = super_agent.choose_action(state)
    reward, next_state = apply_action(action)
    super_agent.learn(state, action, reward, next_state)
