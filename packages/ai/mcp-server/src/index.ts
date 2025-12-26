#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { tokens } from "@astrofusion/design-tokens";

const server = new Server(
  {
    name: "astrofusion-design-system",
    version: "0.2.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Platform-specific component rules
const COMPONENT_RULES = {
  Button: {
    web: `COMPONENT: Button (Web)
- Use <AFButton> from '@astrofusion/design-system-web'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- DO NOT use raw <button> tags.`,

    "react-native": `COMPONENT: Button (React Native)
- Use <Button> from '@astrofusion/design-system-native'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- DO NOT use TouchableOpacity directly for standard buttons.`,

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
- Use <AFCard> from '@astrofusion/design-system-web'.
- Props: variant ('solid' | 'glass').`,

    "react-native": `COMPONENT: Card (React Native)
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

type Platform = "web" | "react-native" | "ios" | "android";
type Component = keyof typeof COMPONENT_RULES;

// Expose Tokens as Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "design://tokens/colors",
        name: "Design System Colors",
        mimeType: "application/json",
      },
      {
        uri: "design://tokens/typography",
        name: "Design System Typography",
        mimeType: "application/json",
      },
      {
        uri: "design://tokens/spacing",
        name: "Design System Spacing",
        mimeType: "application/json",
      },
      {
        uri: "design://tokens/all",
        name: "All Design Tokens",
        mimeType: "application/json",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "design://tokens/colors") {
    return {
      contents: [
        { uri, mimeType: "application/json", text: JSON.stringify(tokens.colors, null, 2) },
      ],
    };
  }

  if (uri === "design://tokens/typography") {
    return {
      contents: [
        { uri, mimeType: "application/json", text: JSON.stringify(tokens.typography, null, 2) },
      ],
    };
  }

  if (uri === "design://tokens/spacing") {
    return {
      contents: [
        { uri, mimeType: "application/json", text: JSON.stringify(tokens.spacing, null, 2) },
      ],
    };
  }

  if (uri === "design://tokens/all") {
    return {
      contents: [{ uri, mimeType: "application/json", text: JSON.stringify(tokens, null, 2) }],
    };
  }

  throw new Error("Resource not found");
});

// Expose Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_component_prompt",
        description:
          "Get the system prompt rules for a specific component on a specific platform",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              enum: ["Button", "Card"],
              description: "The name of the component",
            },
            platform: {
              type: "string",
              enum: ["web", "react-native", "ios", "android"],
              description: "The target platform",
            },
          },
          required: ["component", "platform"],
        },
      },
      {
        name: "get_platform_context",
        description:
          "Get the full system prompt context for building UI on a specific platform",
        inputSchema: {
          type: "object",
          properties: {
            platform: {
              type: "string",
              enum: ["web", "react-native", "ios", "android"],
              description: "The target platform",
            },
            components: {
              type: "array",
              items: { type: "string", enum: ["Button", "Card"] },
              description: "List of components to include rules for",
            },
          },
          required: ["platform"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_component_prompt") {
    const component = request.params.arguments?.component as Component;
    const platform = request.params.arguments?.platform as Platform;

    const rules = COMPONENT_RULES[component]?.[platform];
    if (!rules) {
      throw new Error(`No rules found for ${component} on ${platform}`);
    }

    return {
      content: [{ type: "text", text: rules }],
    };
  }

  if (request.params.name === "get_platform_context") {
    const platform = request.params.arguments?.platform as Platform;
    const components = (request.params.arguments?.components as Component[]) || [];

    let context = `You are an expert UI assistant for AstroFusion Design System.\n\n`;

    // Platform header
    const platformHeaders: Record<Platform, string> = {
      web: "PLATFORM: Web (React + Tailwind CSS)\n- Import from '@astrofusion/design-system-web'.",
      "react-native":
        "PLATFORM: React Native\n- Import from '@astrofusion/design-system-native'.",
      ios: "PLATFORM: iOS (SwiftUI)\n- Import DesignTokens from the generated Swift file.",
      android:
        "PLATFORM: Android (Jetpack Compose)\n- Use MaterialTheme with custom DesignTokens.",
    };

    context += `${platformHeaders[platform]}\n\n`;

    // Token guidelines
    context += `DESIGN TOKENS:\n`;
    context += `- Primary: ${tokens.colors.cosmic[600]}\n`;
    context += `- Surface Glass: ${tokens.colors.surface.glass}\n`;
    context += `- Spacing Scale: 0-12 (1 unit = 0.25rem)\n\n`;

    // Component rules
    if (components.length > 0) {
      context += `COMPONENT RULES:\n`;
      for (const comp of components) {
        if (COMPONENT_RULES[comp]?.[platform]) {
          context += `${COMPONENT_RULES[comp][platform]}\n\n`;
        }
      }
    }

    // Restrictions
    context += `RESTRICTIONS:\n`;
    context += `- DO NOT invent colors. Use tokens only.\n`;
    context += `- DO NOT use hardcoded values.\n`;
    context += `- ALWAYS use design system components.\n`;

    return {
      content: [{ type: "text", text: context }],
    };
  }

  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
