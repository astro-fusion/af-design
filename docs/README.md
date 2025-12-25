# @astrofusion/design-docs

Documentation utilities for the AstroFusion Design System. Provides React components for building design system documentation pages with multi-platform support.

## Installation

```bash
npm install @astrofusion/design-docs
```

## Usage

### ComponentDoc (Full Documentation Block)

The easiest way to document a component with platform switching, code viewing, and AI prompt copying:

```tsx
import { ComponentDoc } from '@astrofusion/design-docs';

export default function ButtonPage() {
  return (
    <ComponentDoc
      component="Button"
      title="Button"
      description="A versatile button component with multiple variants."
    />
  );
}
```

This renders:
- Platform switcher (Web, React Native, iOS, Android)
- Source code viewer with copy button
- AI prompt viewer with copy button

### Individual Components

For more control, use the individual components:

```tsx
import {
  PlatformSwitcher,
  usePlatform,
  CodeViewer,
  PromptViewer
} from '@astrofusion/design-docs';

export default function CustomDoc() {
  const { platform, setPlatform } = usePlatform('web');

  return (
    <div>
      <PlatformSwitcher value={platform} onChange={setPlatform} />
      
      <CodeViewer component="Button" platform={platform} />
      
      <PromptViewer platform={platform} components={['Button', 'Card']} />
    </div>
  );
}
```

### Programmatic Access

Get source code and prompts programmatically:

```tsx
import {
  getComponentSource,
  getPlatformPrompt,
  getComponentPrompt,
  getFullPrompt
} from '@astrofusion/design-docs';

// Get Button source code for React Native
const source = getComponentSource('Button', 'react-native');

// Get full AI prompt for iOS
const prompt = getPlatformPrompt('ios');

// Get combined prompt (platform + component rules)
const fullPrompt = getFullPrompt('android', ['Button', 'Card']);
```

## Components

| Component | Description |
|-----------|-------------|
| `PlatformSwitcher` | Tab-like switcher for platforms |
| `CodeViewer` | Syntax-highlighted code with copy button |
| `PromptViewer` | AI prompt display with copy button |
| `ComponentDoc` | Full documentation block combining all above |

## Platforms Supported

- 🌐 Web (React + Tailwind)
- 📱 React Native
- 🍎 iOS (SwiftUI)
- 🤖 Android (Jetpack Compose)
