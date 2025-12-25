import { tokens } from '@astrofusion/design-tokens';

export type Platform = 'web' | 'react-native' | 'ios' | 'android';

interface PromptContextOptions {
  platform?: Platform;
  components?: string[];
  tone?: 'mystical' | 'technical' | 'neutral';
}

const PLATFORM_RULES: Record<Platform, string> = {
  web: `PLATFORM: Web (React + Tailwind CSS)
- Import from '@astrofusion/design-system-web'.
- Use Tailwind utility classes.
- Components: AFButton, AFCard.
- DO NOT use inline styles.`,

  'react-native': `PLATFORM: React Native
- Import from '@astrofusion/design-system-native'.
- Use StyleSheet.create() for styles.
- Components: Button, Card.
- DO NOT use Tailwind classes directly (unless using NativeWind).
- Use the NativeWind theme from '@astrofusion/design-tokens/nativewind'.`,

  ios: `PLATFORM: iOS (SwiftUI)
- Import DesignTokens from the generated Swift file.
- Use DesignTokens.Colors, DesignTokens.Typography, DesignTokens.Spacing.
- Components: AFButton, AFCard.
- Use .background() and .foregroundColor() modifiers.
- DO NOT hardcode color hex values.`,

  android: `PLATFORM: Android (Jetpack Compose)
- Use MaterialTheme with custom colors from DesignTokens.
- Define colors in a DesignTokens.kt file.
- Components: AFButton, AFCard.
- Use Modifier.background() and Modifier.padding().
- DO NOT use hardcoded dp values; reference the Spacing object.`,
};

const COMPONENT_RULES: Record<string, Record<Platform, string>> = {
  Button: {
    web: `COMPONENT: Button (Web)
- Use <AFButton> from '@astrofusion/design-system-web'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- DO NOT use raw <button> tags.`,

    'react-native': `COMPONENT: Button (React Native)
- Use <Button> from '@astrofusion/design-system-native'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- Wrap text in the component; it handles Text internally.
- DO NOT use TouchableOpacity directly for standard buttons.`,

    ios: `COMPONENT: Button (SwiftUI)
- Use AFButton(title:variant:size:action:).
- Variants: .primary, .secondary, .glass.
- Sizes: .sm, .md, .lg.
- Example: AFButton("Click Me", variant: .primary) { ... }`,

    android: `COMPONENT: Button (Jetpack Compose)
- Use AFButton(text, variant, size, onClick).
- Variants: ButtonVariant.Primary, ButtonVariant.Secondary, ButtonVariant.Glass.
- Sizes: ButtonSize.Sm, ButtonSize.Md, ButtonSize.Lg.
- Example: AFButton("Click Me", ButtonVariant.Primary) { ... }`,
  },

  Card: {
    web: `COMPONENT: Card (Web)
- Use <AFCard> from '@astrofusion/design-system-web'.
- Props: variant ('solid' | 'glass').
- Default variant is 'solid'.
- Use 'glass' variant for floating UI elements.`,

    'react-native': `COMPONENT: Card (React Native)
- Use <Card> from '@astrofusion/design-system-native'.
- Props: variant ('solid' | 'glass').
- Accepts children as content.
- Uses elevation for shadow on Android.`,

    ios: `COMPONENT: Card (SwiftUI)
- Use AFCard(variant:content:).
- Variants: .solid, .glass.
- Use ViewBuilder for content.
- Example: AFCard(.glass) { Text("Content") }`,

    android: `COMPONENT: Card (Jetpack Compose)
- Use AFCard(variant, content).
- Variants: CardVariant.Solid, CardVariant.Glass.
- Use @Composable lambda for content.
- Example: AFCard(CardVariant.Glass) { Text("Content") }`,
  },
};

export class PromptEngine {
  static createContext(options: PromptContextOptions = {}): string {
    const { platform = 'web', components = [], tone = 'neutral' } = options;

    let prompt = `You are an expert UI assistant for AstroFusion Design System.\n\n`;

    // Inject Platform
    prompt += `${PLATFORM_RULES[platform]}\n\n`;

    // Inject Tone
    if (tone === 'mystical') {
      prompt += `TONE: Use a mystical, ethereal, and elegant tone. Vocabulary: 'cosmic', 'stellar', 'void', 'manifest'.\n\n`;
    } else if (tone === 'technical') {
      prompt += `TONE: Precise, scientific, and data-driven.\n\n`;
    }

    // Inject Token Guidelines
    prompt += `DESIGN TOKENS:\n`;
    prompt += `- Primary Color: ${tokens.colors.cosmic[600]} (Cosmic Purple)\n`;
    prompt += `- Surface: Use glass tokens for transparent elements.\n`;
    prompt += `- Spacing: Use the '0, 1, 2, ..., 12' scale. 1 unit = 0.25rem (4px).\n\n`;

    // Inject Component Rules
    if (components.length > 0) {
      prompt += `COMPONENT RULES:\n`;
      for (const component of components) {
        if (COMPONENT_RULES[component]?.[platform]) {
          prompt += `${COMPONENT_RULES[component][platform]}\n\n`;
        }
      }
    }

    // Anti-patterns
    prompt += `RESTRICTIONS:\n`;
    prompt += `- DO NOT invent new colors. Use only the provided token set.\n`;
    prompt += `- DO NOT use hardcoded values. Reference tokens.\n`;
    prompt += `- ALWAYS use the design system components, not raw primitives.\n`;

    return prompt;
  }

  /**
   * Generate a platform-specific component prompt
   */
  static getComponentPrompt(component: string, platform: Platform): string {
    return COMPONENT_RULES[component]?.[platform] || `No rules defined for ${component} on ${platform}.`;
  }

  /**
   * Get all available platforms
   */
  static getPlatforms(): Platform[] {
    return ['web', 'react-native', 'ios', 'android'];
  }

  /**
   * Get all available components
   */
  static getComponents(): string[] {
    return Object.keys(COMPONENT_RULES);
  }
}
