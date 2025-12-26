# 🌌 AstroFusion Design System

### The LLM-First Design System. Built for Humans & Agents.

**AstroFusion Design** is an open-source UI library capable of orchestrating Generative UI. It solves the "AI Slop" problem by treating **AI Agents** as first-class users of the design system, right alongside human developers.

**[📖 View Documentation](https://astro-fusion.github.io/af-design)** | **[🧩 Try Components](https://astro-fusion.github.io/af-design#components)** | **[🤖 Copy AI Prompts](https://astro-fusion.github.io/af-design#ai)**

---

## 🚀 Quick Start

> [!NOTE]
> **Using this Template?**  
> If you have forked this repository, run `npm run setup` to rename all `@astrofusion` references to your own brand.

### Installation

```bash
# Install the tokens
npm install @astrofusion/design-tokens

# Install platform-specific components
npm install @astrofusion/design-system-web     # React + Tailwind
npm install @astrofusion/design-system-native  # React Native
```

### Usage (HTML/CSS)

No build step required! Just include the CSS:

```html
<link rel="stylesheet" href="https://astro-fusion.github.io/af-design/styles/tokens.css">
<link rel="stylesheet" href="https://astro-fusion.github.io/af-design/styles/components.css">

<button class="af-button af-button--primary">Click Me</button>
```

### Usage (React)

```tsx
import { Button, Card } from '@astrofusion/design-system-web';

export default function App() {
  return (
    <Card variant="glass">
      <Button variant="primary">Generate Chart</Button>
    </Card>
  );
}
```

---

## 📂 Project Structure

```
af-design/
├── packages/
│   ├── core/                    # 🧠 Design Philosophy
│   │   └── tokens/              # Colors, typography, spacing
│   │
│   ├── ui/                      # 🎨 Platform Components
│   │   ├── components-web/      # React + Tailwind
│   │   ├── components-native/   # React Native
│   │   ├── components-ios/      # SwiftUI (reference)
│   │   └── components-android/  # Jetpack Compose (reference)
│   │
│   ├── ai/                      # 🤖 AI Layer
│   │   ├── mcp-server/          # Model Context Protocol server
│   │   └── prompts/             # Prompt engineering utilities
│   │
│   └── docs/                    # 📚 Documentation utilities
│
├── site/                        # 🌐 GitHub Pages (static HTML)
│   ├── index.html
│   ├── styles/
│   └── scripts/
│
└── scripts/                     # 🔧 Template utilities
```

---

## 🧠 AI-First Development

### MCP Server

Connect to your AI editor (Cursor, Claude Desktop) to give your AI "eyes":

```bash
npx @astrofusion/design-mcp-server start
```

### Prompt Engine

Generate platform-specific AI prompts:

```typescript
import { PromptEngine } from '@astrofusion/design-prompts';

const prompt = PromptEngine.createContext({
  platform: 'react-native',
  components: ['Button', 'Card'],
  tone: 'mystical'
});
```

---

## 🛠 Token Compilation

Build tokens for all platforms:

```bash
cd packages/core/tokens
npm run build
```

| Output | Platform |
|--------|----------|
| `dist/css/tokens.css` | Web |
| `dist/nativewind/theme.ts` | React Native |
| `dist/swift/DesignTokens.swift` | iOS |
| `dist/tokens.json` | MCP Server / AI |

---

## 🧪 Testing

```bash
npm test
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📜 License

MIT © AstroFusion
