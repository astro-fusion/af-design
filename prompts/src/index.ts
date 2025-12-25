import { tokens } from '@astrofusion/design-tokens';

interface PromptContextOptions {
  components?: string[];
  tone?: 'mystical' | 'technical' | 'neutral';
}

export class PromptEngine {
  static createContext(options: PromptContextOptions = {}): string {
    const { components = [], tone = 'neutral' } = options;
    
    let prompt = `You are an expert UI assistant for AstroFusion.\n\n`;
    
    // Inject Tone
    if (tone === 'mystical') {
      prompt += `Tone: Use a mystical, ethereal, and elegant tone in your UI copy. Vocabulary should include words like 'cosmic', 'stellar', 'void', 'manifest'.\n`;
    } else if (tone === 'technical') {
      prompt += `Tone: Precise, scientific, and data-driven.\n`;
    }

    // Inject Token Guidelines
    prompt += `\nDESIGN TOKENS:\n`;
    prompt += `- Primary Color: ${tokens.colors.cosmic[600]} (Cosmic Purple)\n`;
    prompt += `- Surface: Use 'bg-surface-glass' for transparent, glass-like elements.\n`;
    prompt += `- Spacing: Use the '0, 1, 2, ..., 12' scale. 1 unit = 0.25rem.\n`;

    // Inject Component Rules
    if (components.length > 0) {
      prompt += `\nCOMPONENT USAGE:\n`;
      if (components.includes('Button')) {
        prompt += `- Buttons: Use <AFButton> component. Avoid raw <button> tags. Variants: primary, secondary, glass.\n`;
      }
      if (components.includes('Card')) {
        prompt += `- Cards: Use <AFCard> component. Default to 'solid' variant for content, 'glass' for overlays.\n`;
      }
    }

    // Anti-patterns
    prompt += `\nRESTRICTIONS:\n`;
    prompt += `- DO NOT invent new colors. Use only the provided token set.\n`;
    prompt += `- DO NOT use inline styles. Use Tailwind utility classes.\n`;

    return prompt;
  }
}
