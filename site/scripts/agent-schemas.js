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
    }
};
