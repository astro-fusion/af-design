### **Repository Name:** `astrofusion-design-system`

---

# 🌌 AstroFusion Design System

### The LLM-First Design System. Built for Humans & Agents.

**AstroFusion Design** is an open-source UI library capable of orchestrating Generative UI. It solves the "AI Slop" problem by treating **AI Agents** as first-class users of the design system, right alongside human developers.

**[View Live Documentation](https://astro-fusion.com/design)** | **[Try the Prompt Generator](https://www.google.com/search?q=https://astro-fusion.com/design/prompts)**

> [!NOTE]
> **Using this Template?**  
> If you have forked this repository to build your own Design System, simple run:
> ```bash
> npm run setup
> ```
> This will interactively rename all `@astrofusion` scope references to your own brand (e.g., `@mybrand`).

---

## 🚀 Why This Exists

Most design systems are built for **Human** consumption (CSS, Figma, Docs).
When you ask an AI (ChatGPT, Claude, v0) to "make a card," it hallucinates styles because it hasn't read your system. This creates inconsistent "AI Slop."

**AstroFusion Design fixes this by serving two masters:**

1. **For Humans:** A pixel-perfect React/Tailwind component library.
2. **For Machines:** A structured **MCP (Model Context Protocol)** server that feeds design tokens and prompt rules directly to LLMs.

---

## 🧠 Core Architecture

### 1. The "Hybrid" Token Engine

Our tokens aren't just CSS variables. They are the "Single Source of Truth" that compiles into:

* 🎨 **CSS/Tailwind:** For the browser.
* 📐 **Figma Variables:** For designers.
* 🤖 **System Prompts:** For AI Agents.

### 2. Generative UI (A2UI)

We do not allow AI to write raw JSX/HTML, which is prone to breakage. Instead, we use Google's **A2UI** standard to render safe, JSON-driven interfaces.

* **Input:** Natural Language ("Show me my horoscope")
* **AI Output:** JSON Data (No code injection risk)
* **Renderer:** Maps JSON -> AstroFusion Components

### 3. The MCP Server

Included is a standalone MCP server. Connect this to your AI editor (Cursor, Claude Desktop) to give your AI "eyes."

```bash
# Start the Design Context Server
npx astrofusion-design-mcp start

```

*Now your AI knows exactly what `text-surface-500` means and never invents a random grey color again.*

---

## 🛠 Features

### 💎 For Developers (The Visuals)

* **Stack:** React 19, Tailwind CSS v4, Framer Motion.
* **Atomic Components:** Buttons, Cards, Inputs—all accessible and dark-mode ready.
* **Theme Awareness:** Context-aware switching between "Cosmic Dark" and "Starlight Light" modes.

### 🤖 For Agents (The Intelligence)

* **Prompt Generator:** A built-in utility that converts current component state into optimized LLM prompts.
* *Example:* `generatePrompt(<NatalChart />)` returns a strict set of rules for the AI to replicate that chart's structure.


* **Token Injection:** Automatically injects your brand's color palette and spacing scale into the AI's context window.

---

## 📦 Installation

```bash
npm install @astrofusion/design-system

```

### Usage (React)

```tsx
import { AFButton, AFCard } from '@astrofusion/design-system';

export default function Page() {
  return (
    <AFCard variant="glass">
      <AFButton intent="primary">Generate Chart</AFButton>
    </AFCard>
  );
}

```

### Usage (AI Prompt Generation)

*Level up your GenAI workflow. Use our generator to create strict specs for your AI tools.*

```typescript
import { PromptEngine } from '@astrofusion/design-system/ai';

const systemPrompt = PromptEngine.createContext({
  components: ['Card', 'Button'],
  tone: 'mystical'
});

console.log(systemPrompt);
// Output: "You are a UI assistant. Use 'bg-cosmic-900' for backgrounds.
// Buttons must have 'rounded-xl'. Do not use inline styles..."

```

---

## 📂 Project Structure

This repository is **segregated** from the core [AstroFusion.com](https://astro-fusion.com) product logic.

* `/tokens` - JSON definitions for Colors, Typography, Spacing.
* `/components` - React implementation of the system.
* `/mcp-server` - The bridge that exposes tokens to AI models.
* `/prompts` - Pre-engineered prompts to ensure AI consistency.

---

## 🤝 Contributing

This is the open-source foundation of a closed-source product.
While we primarily maintain this for the AstroFusion ecosystem, we welcome discussions on **LLM-driven Design Architecture**.

**License:** MIT
