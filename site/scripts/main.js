/**
 * AstroFusion Design System - Main JavaScript
 * Handles sidebar, theming, navigation, prompts
 */

// ============================================================================
// STATE
// ============================================================================

const state = {
  platform: 'web',
  section: 'overview',
  promptType: 'simple',
  currentPrompt: '',
  theme: 'light'
};

// ============================================================================
// URL PARAMETERS
// ============================================================================

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    tab: params.get('tab') || 'overview',
    os: params.get('os') || 'web'
  };
}

function updateURLParams() {
  const url = new URL(window.location);
  url.searchParams.set('tab', state.section);
  url.searchParams.set('os', state.platform);
  window.history.replaceState({}, '', url);
}

// ============================================================================
// THEME
// ============================================================================

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('af-theme', theme);
  
  // Update toggle icons
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  const label = document.querySelector('.theme-label');
  
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    label.textContent = 'Dark Mode';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    label.textContent = 'Light Mode';
  }
}

function initTheme() {
  const saved = localStorage.getItem('af-theme');
  const theme = saved || 'light'; // Default to light
  setTheme(theme);
  
  document.getElementById('theme-toggle').addEventListener('click', () => {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  });
}

// ============================================================================
// MOBILE SIDEBAR
// ============================================================================

function initMobileSidebar() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuIcon = toggle.querySelector('.icon-menu');
  const closeIcon = toggle.querySelector('.icon-close');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }

  toggle.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close on nav item click (mobile)
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  });
}

// ============================================================================
// SECTION NAVIGATION
// ============================================================================

function setSection(sectionId) {
  state.section = sectionId;
  
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('nav-item--active', item.dataset.section === sectionId);
  });
  
  // Show/hide sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.toggle('section--active', section.id === sectionId);
  });
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update URL
  updateURLParams();
}

function initNavigation() {
  document.querySelectorAll('.nav-item, .card__link').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section || item.getAttribute('href')?.replace('#', '');
      if (section) {
        setSection(section);
      }
    });
  });
}

// ============================================================================
// PLATFORM SELECTION
// ============================================================================

function setPlatform(platform) {
  state.platform = platform;
  
  // Update platform buttons
  document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.classList.toggle('platform-btn--active', btn.dataset.platform === platform);
  });
  
  // Update platform tabs in source viewer
  document.querySelectorAll('.platform-tab').forEach(tab => {
    tab.classList.toggle('platform-tab--active', tab.dataset.platform === platform);
  });
  
  // Update code content
  updateSourceCode();
  
  // Update prompts
  updatePrompts();
  
  // Update URL
  updateURLParams();
}

function initPlatformSelector() {
  document.querySelectorAll('.platform-btn, .platform-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      setPlatform(btn.dataset.platform);
    });
  });
}

// ============================================================================
// SOURCE CODE VIEWER
// ============================================================================

const SOURCE_CODE = {
  button: {
    web: `import React from "react";
import { cn } from "../lib/utils";

export interface AFButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "glass";
  size?: "default" | "sm" | "lg" | "icon";
}

export function AFButton({ className, variant = "default", size = "default", ...props }: AFButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        variant === "default" && "bg-primary text-white hover:bg-primary/90",
        variant === "secondary" && "bg-muted text-foreground hover:bg-muted/80",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
        variant === "outline" && "border border-border bg-transparent hover:bg-muted",
        variant === "ghost" && "bg-transparent hover:bg-muted",
        variant === "glass" && "bg-white/10 backdrop-blur-md border border-white/20 text-white",
        size === "default" && "px-4 py-2 text-sm",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "lg" && "px-6 py-3 text-base",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}`,

    'react-native': `import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onPress?: () => void;
}

export function Button({ variant = "primary", size = "md", children, onPress }: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        styles[variant],
        styles[\`size_\${size}\`]
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === "secondary" && styles.textDark]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 8, alignItems: "center", justifyContent: "center" },
  primary: { backgroundColor: "#6366f1" },
  secondary: { backgroundColor: "#f1f5f9" },
  glass: { backgroundColor: "rgba(255,255,255,0.1)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  size_sm: { paddingVertical: 6, paddingHorizontal: 12 },
  size_md: { paddingVertical: 8, paddingHorizontal: 16 },
  size_lg: { paddingVertical: 12, paddingHorizontal: 24 },
  text: { color: "#fff", fontWeight: "600" },
  textDark: { color: "#0f172a" }
});`,

    ios: `import SwiftUI

struct AFButton: View {
    let title: String
    let variant: ButtonVariant
    let size: ButtonSize
    let action: () -> Void
    
    enum ButtonVariant {
        case primary, secondary, glass
        
        var backgroundColor: Color {
            switch self {
            case .primary: return Color(hex: "#6366f1")
            case .secondary: return Color(hex: "#f1f5f9")
            case .glass: return Color.white.opacity(0.1)
            }
        }
    }
    
    enum ButtonSize {
        case sm, md, lg
        
        var padding: EdgeInsets {
            switch self {
            case .sm: return EdgeInsets(top: 6, leading: 12, bottom: 6, trailing: 12)
            case .md: return EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
            case .lg: return EdgeInsets(top: 12, leading: 24, bottom: 12, trailing: 24)
            }
        }
    }
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .fontWeight(.semibold)
                .foregroundColor(variant == .secondary ? .black : .white)
        }
        .padding(size.padding)
        .background(variant.backgroundColor)
        .cornerRadius(8)
    }
}`,

    android: `package com.astrofusion.design.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

enum class ButtonVariant { Primary, Secondary, Glass }
enum class ButtonSize { Sm, Md, Lg }

@Composable
fun AFButton(
    text: String,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.Md,
    onClick: () -> Unit
) {
    val containerColor = when (variant) {
        ButtonVariant.Primary -> Color(0xFF6366F1)
        ButtonVariant.Secondary -> Color(0xFFF1F5F9)
        ButtonVariant.Glass -> Color.White.copy(alpha = 0.1f)
    }
    
    val contentColor = when (variant) {
        ButtonVariant.Secondary -> Color(0xFF0F172A)
        else -> Color.White
    }
    
    val padding = when (size) {
        ButtonSize.Sm -> PaddingValues(horizontal = 12.dp, vertical = 6.dp)
        ButtonSize.Md -> PaddingValues(horizontal = 16.dp, vertical = 8.dp)
        ButtonSize.Lg -> PaddingValues(horizontal = 24.dp, vertical = 12.dp)
    }
    
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(containerColor = containerColor, contentColor = contentColor),
        shape = RoundedCornerShape(8.dp),
        contentPadding = padding
    ) {
        Text(text)
    }
}`
  }
};

function updateSourceCode() {
  const component = 'button'; // For buttons section
  const platform = state.platform;
  const code = SOURCE_CODE[component]?.[platform] || '// No code available for this platform';
  
  const codeElement = document.getElementById('button-source-code');
  if (codeElement) {
    codeElement.textContent = code;
  }
}

window.copyCurrentCode = function() {
  const code = document.getElementById('button-source-code')?.textContent || '';
  navigator.clipboard.writeText(code).then(() => {
    alert('Code copied to clipboard!');
  });
};

// ============================================================================
// PROMPTS
// ============================================================================

function updatePrompts() {
  const platform = state.platform;
  const PROMPTS = window.PROMPTS;
  
  if (!PROMPTS) return;
  
  // Simple prompt
  const simplePrompt = PROMPTS.SIMPLE_PROMPTS?.['button-primary']?.[platform] || 'No prompt available';
  const simpleEl = document.getElementById('prompt-simple');
  if (simpleEl) simpleEl.textContent = simplePrompt;
  
  // Full prompt
  const fullPrompt = PROMPTS.FULL_PROMPTS?.button || 'No prompt available';
  const fullEl = document.getElementById('prompt-full');
  if (fullEl) fullEl.textContent = fullPrompt;
  
  // System prompt
  const systemPrompt = PROMPTS.SYSTEM_PROMPTS?.[platform] || 'No prompt available';
  const systemEl = document.getElementById('prompt-system');
  if (systemEl) systemEl.textContent = systemPrompt;
  
  // Update label
  const labels = { web: 'Web', 'react-native': 'React Native', ios: 'iOS (SwiftUI)', android: 'Android (Compose)' };
  const labelEl = document.getElementById('system-prompt-label');
  if (labelEl) labelEl.textContent = `System Prompt (${labels[platform]})`;
}

function setPromptType(type) {
  state.promptType = type;
  
  document.querySelectorAll('.prompt-type-tab').forEach(tab => {
    tab.classList.toggle('prompt-type-tab--active', tab.dataset.type === type);
  });
  
  document.querySelectorAll('.prompt-card').forEach(card => {
    card.hidden = card.dataset.type !== type;
  });
}

function initPromptTypes() {
  document.querySelectorAll('.prompt-type-tab').forEach(tab => {
    tab.addEventListener('click', () => setPromptType(tab.dataset.type));
  });
}

window.copyPrompt = function(type) {
  const el = document.getElementById(`prompt-${type}`);
  if (el) {
    navigator.clipboard.writeText(el.textContent).then(() => {
      alert('Prompt copied to clipboard!');
    });
  }
};

// ============================================================================
// COMPONENT COPY ICONS
// ============================================================================

function initCopyIcons() {
  document.querySelectorAll('.copy-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const component = icon.dataset.component;
      const platform = state.platform;
      const PROMPTS = window.PROMPTS;
      
      const prompt = PROMPTS?.SIMPLE_PROMPTS?.[component]?.[platform] 
        || `No prompt for ${component} on ${platform}`;
      
      navigator.clipboard.writeText(prompt);
      
      // Show in prompt display
      const display = document.getElementById('prompt-display');
      const content = document.getElementById('prompt-content');
      if (display && content) {
        content.textContent = prompt;
        display.hidden = false;
        state.currentPrompt = prompt;
        display.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Visual feedback
      icon.textContent = '✓';
      setTimeout(() => icon.textContent = '📋', 2000);
    });
  });
}

function initPromptDisplay() {
  const clearBtn = document.getElementById('clear-prompt');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.getElementById('prompt-display').hidden = true;
    });
  }
  
  const copyBtn = document.getElementById('copy-prompt');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(state.currentPrompt);
      copyBtn.textContent = '✓';
      setTimeout(() => copyBtn.textContent = '📋', 2000);
    });
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Read URL params
  const params = getURLParams();
  state.section = params.tab;
  state.platform = params.os;
  
  // Initialize everything
  initTheme();
  initMobileSidebar();
  initNavigation();
  initPlatformSelector();
  initPromptTypes();
  initCopyIcons();
  initPromptDisplay();
  
  // Set initial state
  setSection(state.section);
  setPlatform(state.platform);
  updatePrompts();
  updateSourceCode();
  
  console.log('🌌 AstroFusion Design System loaded');
  console.log(`Section: ${state.section}, Platform: ${state.platform}`);
});
