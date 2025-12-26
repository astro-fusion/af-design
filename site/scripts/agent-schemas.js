/**
 * AstroFusion Design System - Agent Mode Schemas (JSON)
 * Defines the JSON structure for components when used in Agent Mode (A2UI)
 */

window.AGENT_SCHEMAS = {
    'button': {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "AFButton",
        "type": "object",
        "properties": {
            "children": { "type": "string", "description": "Button label text" },
            "variant": { 
                "type": "string", 
                "enum": ["primary", "secondary", "glass", "destructive", "outline", "ghost"],
                "default": "primary"
            },
            "size": { 
                "type": "string", 
                "enum": ["sm", "md", "lg", "icon"],
                "default": "md"
            },
            "onClick": { "type": "function", "description": "Handler for click events" }
        },
        "required": ["children"]
    },
    'input': {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "AFInput",
        "type": "object",
        "properties": {
            "type": { 
                "type": "string", 
                "enum": ["text", "email", "password", "number", "tel", "url", "search", "date", "time"],
                "default": "text"
            },
            "label": { "type": "string", "description": "Label text displayed above the input" },
            "placeholder": { "type": "string", "description": "Placeholder text" },
            "disabled": { "type": "boolean", "default": false },
            "state": { 
                "type": "string", 
                "enum": ["default", "error", "valid", "warning"],
                "default": "default"
            },
            "errorMessage": { "type": "string", "description": "Error message to display when state is 'error'" }
        },
        "required": ["label"]
    },
    'typography': {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Typography",
        "type": "object",
        "properties": {
            "variant": {
                "type": "string",
                "enum": ["h1", "h2", "h3", "h4", "lead", "body", "small", "mono"],
                "default": "body"
            },
            "children": { "type": "string", "description": "Text content" },
            "className": { "type": "string", "description": "Additional Tailwind classes" }
        },
        "required": ["children"]
    },
    'layout': {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "AFBox",
        "type": "object",
        "properties": {
            "variant": {
                "type": "string",
                "enum": ["default", "card", "glass", "bordered"],
                "default": "default"
            },
            "padding": { "type": "string", "enum": ["none", "sm", "md", "lg"], "default": "md" },
            "children": { "type": "array", "description": "Child components" }
        }
    },
    'data-display': {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "DataDisplay",
        "description": "Schema for various data display components",
        "oneOf": [
            {
                "title": "LabelValue",
                "properties": {
                    "type": { "const": "label-value" },
                    "label": { "type": "string" },
                    "value": { "type": "string" },
                    "layout": { "enum": ["horizontal", "vertical"], "default": "vertical" }
                }
            },
            {
                "title": "DataGrid",
                "properties": {
                    "type": { "const": "grid" },
                    "items": { 
                        "type": "array",
                        "items": { "type": "object", "properties": { "label": {"type": "string"}, "value": {"type": "string"} } }
                    },
                    "columns": { "type": "number", "default": 2 }
                }
            }
        ]
    },
    'icons': {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Icon",
        "type": "object",
        "properties": {
            "name": { "type": "string", "description": "Lucide icon name (kebab-case)" },
            "size": { "type": "number", "default": 24 },
            "color": { "type": "string", "description": "Color name or hex" }
        },
        "required": ["name"]
    }
};
