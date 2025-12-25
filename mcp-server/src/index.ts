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
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

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
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  if (uri === "design://tokens/colors") {
    return {
      contents: [{ uri, mimeType: "application/json", text: JSON.stringify(tokens.colors, null, 2) }],
    };
  }
  
  if (uri === "design://tokens/typography") {
    return {
      contents: [{ uri, mimeType: "application/json", text: JSON.stringify(tokens.typography, null, 2) }],
    };
  }

  if (uri === "design://tokens/spacing") {
    return {
      contents: [{ uri, mimeType: "application/json", text: JSON.stringify(tokens.spacing, null, 2) }],
    };
  }

  throw new Error("Resource not found");
});

// Expose Prompt Generator as a Tool
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_component_prompt",
        description: "Get the system prompt rules for a specific component",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              enum: ["Button", "Card"],
              description: "The name of the component",
            },
          },
          required: ["component"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_component_prompt") {
    const component = request.params.arguments?.component;
    
    if (component === "Button") {
      return {
        content: [
          {
            type: "text",
            text: `COMPONENT RULE: Button
- Use 'AFButton' from '@astrofusion/design-system'.
- Props: variant ('primary' | 'secondary' | 'glass'), size ('sm' | 'md' | 'lg').
- Default variant is 'primary'.
- Do NOT use raw <button> tags with Tailwind classes for standard buttons.`,
          },
        ],
      };
    }
    
    if (component === "Card") {
      return {
        content: [
          {
            type: "text",
            text: `COMPONENT RULE: Card
- Use 'AFCard' from '@astrofusion/design-system'.
- Props: variant ('solid' | 'glass').
- Default variant is 'solid'.
- Use 'glass' variant for floating UI elements over backgrounds.`,
          },
        ],
      };
    }
    
    throw new Error("Component not found");
  }

  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
