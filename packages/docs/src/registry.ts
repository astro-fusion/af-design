import { Platform } from './platforms';
import { tokens } from '@astrofusion/design-tokens';

// Component source code by platform
export const COMPONENT_SOURCE: Record<string, Record<Platform, string>> = {
  Button: {
    web: `import { Button } from '@astrofusion/design-system-web';

export default function Example() {
  return (
    <Button variant="primary" size="md">
      Click Me
    </Button>
  );
}`,

    'react-native': `import { Button } from '@astrofusion/design-system-native';

export default function Example() {
  return (
    <Button variant="primary" size="md">
      Click Me
    </Button>
  );
}`,

    ios: `import SwiftUI

struct ContentView: View {
    var body: some View {
        AFButton("Click Me", variant: .primary, size: .md) {
            print("Button tapped")
        }
    }
}`,

    android: `import com.astrofusion.design.components.AFButton
import com.astrofusion.design.components.ButtonVariant
import com.astrofusion.design.components.ButtonSize

@Composable
fun Example() {
    AFButton(
        text = "Click Me",
        variant = ButtonVariant.Primary,
        size = ButtonSize.Md,
        onClick = { /* Handle click */ }
    )
}`,
  },

  Card: {
    web: `import { Card } from '@astrofusion/design-system-web';

export default function Example() {
  return (
    <Card variant="glass">
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
    </Card>
  );
}`,

    'react-native': `import { Card } from '@astrofusion/design-system-native';
import { Text } from 'react-native';

export default function Example() {
  return (
    <Card variant="glass">
      <Text>Card content goes here.</Text>
    </Card>
  );
}`,

    ios: `import SwiftUI

struct ContentView: View {
    var body: some View {
        AFCard(.glass) {
            VStack {
                Text("Card Title")
                    .font(.headline)
                Text("Card content goes here.")
            }
        }
    }
}`,

    android: `import com.astrofusion.design.components.AFCard
import com.astrofusion.design.components.CardVariant

@Composable
fun Example() {
    AFCard(variant = CardVariant.Glass) {
        Column {
            Text("Card Title", style = MaterialTheme.typography.headlineSmall)
            Text("Card content goes here.")
        }
    }
}`,
  },
};

// AI Prompts by platform
export const PLATFORM_PROMPTS: Record<Platform, string> = {
  web: `You are an expert UI assistant for AstroFusion Design System.

PLATFORM: Web (React + Tailwind CSS)
- Import from '@astrofusion/design-system-web'.
- Use Tailwind utility classes.
- Components: Button, Card.
- DO NOT use inline styles.

DESIGN TOKENS:
- Primary: ${tokens.colors.cosmic[600]}
- Surface Glass: ${tokens.colors.surface.glass}
- Spacing: 0-12 scale (1 unit = 0.25rem)

RESTRICTIONS:
- DO NOT invent colors. Use tokens only.
- DO NOT use hardcoded values.
- ALWAYS use design system components.`,

  'react-native': `You are an expert UI assistant for AstroFusion Design System.

PLATFORM: React Native
- Import from '@astrofusion/design-system-native'.
- Use StyleSheet.create() for styles.
- Components: Button, Card.
- Use NativeWind theme from '@astrofusion/design-tokens/nativewind'.

DESIGN TOKENS:
- Primary: ${tokens.colors.cosmic[600]}
- Surface Glass: ${tokens.colors.surface.glass}
- Spacing: 0-12 scale (1 unit = 4px)

RESTRICTIONS:
- DO NOT use Tailwind classes directly.
- DO NOT use hardcoded values.
- ALWAYS use design system components.`,

  ios: `You are an expert UI assistant for AstroFusion Design System.

PLATFORM: iOS (SwiftUI)
- Import DesignTokens from the generated Swift file.
- Use DesignTokens.Colors, DesignTokens.Typography, DesignTokens.Spacing.
- Components: AFButton, AFCard.
- Use .background() and .foregroundColor() modifiers.

DESIGN TOKENS:
- Primary: DesignTokens.Colors.Cosmic._600
- Surface Glass: DesignTokens.Colors.Surface.glass
- Spacing: DesignTokens.Spacing._4 etc.

RESTRICTIONS:
- DO NOT hardcode color hex values.
- DO NOT use hardcoded dp/pt values.
- ALWAYS reference DesignTokens.`,

  android: `You are an expert UI assistant for AstroFusion Design System.

PLATFORM: Android (Jetpack Compose)
- Use MaterialTheme with custom DesignTokens.
- Define colors in DesignTokens.kt.
- Components: AFButton, AFCard.
- Use Modifier.background() and Modifier.padding().

DESIGN TOKENS:
- Primary: DesignTokens.Colors.Cosmic._600
- Surface Glass: DesignTokens.Colors.Surface.glass
- Spacing: DesignTokens.Spacing._4 etc.

RESTRICTIONS:
- DO NOT use hardcoded Color() values.
- DO NOT use hardcoded .dp values.
- ALWAYS reference DesignTokens object.`,
};

// Component-specific prompts
export const COMPONENT_PROMPTS: Record<string, Record<Platform, string>> = {
  Button: {
    web: `COMPONENT: Button (Web)
- Use <Button> from '@astrofusion/design-system-web'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- DO NOT use raw <button> tags.`,

    'react-native': `COMPONENT: Button (React Native)
- Use <Button> from '@astrofusion/design-system-native'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- DO NOT use TouchableOpacity for standard buttons.`,

    ios: `COMPONENT: Button (SwiftUI)
- Use AFButton(title:variant:size:action:).
- Variants: .primary, .secondary, .glass.
- Sizes: .sm, .md, .lg.`,

    android: `COMPONENT: Button (Jetpack Compose)
- Use AFButton(text, variant, size, onClick).
- Variants: ButtonVariant.Primary, ButtonVariant.Secondary, ButtonVariant.Glass.
- Sizes: ButtonSize.Sm, ButtonSize.Md, ButtonSize.Lg.`,
  },

  Card: {
    web: `COMPONENT: Card (Web)
- Use <Card> from '@astrofusion/design-system-web'.
- Props: variant ('solid' | 'glass').`,

    'react-native': `COMPONENT: Card (React Native)
- Use <Card> from '@astrofusion/design-system-native'.
- Props: variant ('solid' | 'glass').`,

    ios: `COMPONENT: Card (SwiftUI)
- Use AFCard(variant:content:).
- Variants: .solid, .glass.`,

    android: `COMPONENT: Card (Jetpack Compose)
- Use AFCard(variant, content).
- Variants: CardVariant.Solid, CardVariant.Glass.`,
  },
};

/**
 * Get source code for a component on a specific platform
 */
export function getComponentSource(component: string, platform: Platform): string {
  return COMPONENT_SOURCE[component]?.[platform] || `// No source available for ${component} on ${platform}`;
}

/**
 * Get the full AI prompt for a specific platform
 */
export function getPlatformPrompt(platform: Platform): string {
  return PLATFORM_PROMPTS[platform];
}

/**
 * Get the component-specific AI prompt for a platform
 */
export function getComponentPrompt(component: string, platform: Platform): string {
  return COMPONENT_PROMPTS[component]?.[platform] || `// No prompt available for ${component} on ${platform}`;
}

/**
 * Get combined AI prompt (platform + component rules)
 */
export function getFullPrompt(platform: Platform, components: string[]): string {
  let prompt = PLATFORM_PROMPTS[platform] + '\n\n';
  
  if (components.length > 0) {
    prompt += 'COMPONENT RULES:\n';
    for (const comp of components) {
      if (COMPONENT_PROMPTS[comp]?.[platform]) {
        prompt += COMPONENT_PROMPTS[comp][platform] + '\n\n';
      }
    }
  }
  
  return prompt;
}
