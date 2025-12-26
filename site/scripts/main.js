/**
 * AstroFusion Design System - Site Scripts
 * Enhanced with URL parameters, platform switching, and prompt types
 */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const state = {
  platform: 'web',
  tab: 'buttons',
  promptType: 'simple',
  currentPrompt: ''
};

// ============================================================================
// URL PARAMETER HANDLING
// ============================================================================

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    platform: params.get('os') || params.get('platform') || 'web',
    tab: params.get('tab') || 'buttons'
  };
}

function updateURLParams() {
  const url = new URL(window.location);
  url.searchParams.set('os', state.platform);
  url.searchParams.set('tab', state.tab);
  window.history.replaceState({}, '', url);
}

// ============================================================================
// PLATFORM SWITCHING
// ============================================================================

function setPlatform(platform) {
  state.platform = platform;
  
  // Update UI
  document.querySelectorAll('.af-platform-btn').forEach(btn => {
    btn.classList.toggle('af-platform-btn--active', btn.dataset.platform === platform);
  });
  
  // Update code examples
  updateCodeBlock();
  
  // Update system prompt
  updateSystemPrompt();
  
  // Update URL
  updateURLParams();
}

function initPlatformSelector() {
  document.querySelectorAll('.af-platform-btn').forEach(btn => {
    btn.addEventListener('click', () => setPlatform(btn.dataset.platform));
  });
}

// ============================================================================
// TAB SWITCHING
// ============================================================================

function setTab(tab) {
  state.tab = tab;
  
  // Update nav links
  document.querySelectorAll('.af-nav__links a[data-tab]').forEach(link => {
    link.classList.toggle('af-nav__link--active', link.dataset.tab === tab);
  });
  
  // Show/hide sections
  document.querySelectorAll('.af-section[data-tab]').forEach(section => {
    section.hidden = section.dataset.tab !== tab;
  });
  
  // Update URL
  updateURLParams();
}

function initTabSwitching() {
  document.querySelectorAll('.af-nav__links a[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setTab(link.dataset.tab);
    });
  });
}

// ============================================================================
// PROMPT TYPE SWITCHING
// ============================================================================

function setPromptType(type) {
  state.promptType = type;
  
  // Update tabs
  document.querySelectorAll('.af-prompt-tab').forEach(tab => {
    tab.classList.toggle('af-prompt-tab--active', tab.dataset.promptType === type);
  });
  
  // Show/hide prompt blocks
  document.querySelectorAll('.af-prompt-block').forEach(block => {
    block.hidden = block.dataset.promptType !== type;
  });
}

function initPromptTypeTabs() {
  document.querySelectorAll('.af-prompt-tab').forEach(tab => {
    tab.addEventListener('click', () => setPromptType(tab.dataset.promptType));
  });
}

// ============================================================================
// PROMPT DISPLAY (matches localhost:3000/design)
// ============================================================================

function showPromptDisplay(text) {
  state.currentPrompt = text;
  
  const display = document.getElementById('prompt-display');
  const content = document.getElementById('prompt-content');
  
  content.textContent = text;
  display.hidden = false;
  
  // Scroll to prompt
  setTimeout(() => {
    display.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function clearPromptDisplay() {
  state.currentPrompt = '';
  document.getElementById('prompt-display').hidden = true;
}

function initPromptDisplay() {
  // Clear button
  document.getElementById('clear-prompt').addEventListener('click', clearPromptDisplay);
  
  // Copy button
  document.getElementById('copy-current-prompt').addEventListener('click', () => {
    navigator.clipboard.writeText(state.currentPrompt).then(() => {
      const btn = document.getElementById('copy-current-prompt');
      btn.textContent = '✓';
      setTimeout(() => btn.textContent = '📋', 2000);
    });
  });
  
  // Edit button (toggle contenteditable)
  document.getElementById('edit-prompt').addEventListener('click', () => {
    const content = document.getElementById('prompt-content');
    const isEditing = content.contentEditable === 'true';
    content.contentEditable = !isEditing;
    content.classList.toggle('af-prompt-display__content--editing', !isEditing);
    document.getElementById('edit-prompt').textContent = isEditing ? '✏️' : '✓';
    
    if (!isEditing) {
      content.focus();
    } else {
      state.currentPrompt = content.textContent;
    }
  });
}

// ============================================================================
// COMPONENT PROMPT COPYING (📋 icons)
// ============================================================================

function getSimplePromptForComponent(component) {
  const platform = state.platform;
  const prompts = window.PROMPTS?.SIMPLE_PROMPTS;
  
  if (prompts && prompts[component] && prompts[component][platform]) {
    return prompts[component][platform];
  }
  
  // Fallback
  return `No prompt available for ${component} on ${platform}`;
}

function initComponentPromptCopy() {
  document.querySelectorAll('.af-copy-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const component = icon.dataset.component;
      const prompt = getSimplePromptForComponent(component);
      
      // Copy to clipboard
      navigator.clipboard.writeText(prompt);
      
      // Show in display
      showPromptDisplay(prompt);
      
      // Visual feedback
      icon.textContent = '✓';
      setTimeout(() => icon.textContent = '📋', 2000);
    });
  });
}

// ============================================================================
// CODE BLOCK UPDATES
// ============================================================================

function updateCodeBlock() {
  const platform = state.platform;
  const tab = state.tab;
  
  // Determine component from tab
  let component = 'button';
  if (tab === 'cards') component = 'card';
  
  const code = window.PROMPTS?.CODE_EXAMPLES?.[component]?.[platform] || '// No code available';
  
  // Update label
  const labels = {
    web: 'HTML/CSS + React',
    'react-native': 'React Native',
    ios: 'SwiftUI',
    android: 'Jetpack Compose'
  };
  
  document.getElementById('code-label').textContent = labels[platform] || 'Code';
  document.getElementById('code-content').querySelector('code').textContent = code;
}

// ============================================================================
// SYSTEM PROMPT UPDATES
// ============================================================================

function updateSystemPrompt() {
  const platform = state.platform;
  const systemPrompt = window.PROMPTS?.SYSTEM_PROMPTS?.[platform] || '';
  
  const labels = {
    web: 'Web',
    'react-native': 'React Native',
    ios: 'iOS (SwiftUI)',
    android: 'Android (Compose)'
  };
  
  document.getElementById('system-prompt-label').textContent = `System Prompt (${labels[platform]})`;
  document.getElementById('prompt-system').textContent = systemPrompt;
}

// ============================================================================
// PROMPT BLOCK COPYING
// ============================================================================

window.copyPromptBlock = function(type) {
  const elementId = `prompt-${type}`;
  const text = document.getElementById(elementId).textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    // Find the button and show feedback
    const block = document.querySelector(`.af-prompt-block[data-prompt-type="${type}"]`);
    const btn = block.querySelector('.af-copy-btn');
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
};

window.copyCodeBlock = function() {
  const code = document.getElementById('code-content').querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('#code-block-buttons .af-copy-btn');
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Read URL params
  const params = getURLParams();
  state.platform = params.platform;
  state.tab = params.tab;
  
  // Initialize all handlers
  initPlatformSelector();
  initTabSwitching();
  initPromptTypeTabs();
  initPromptDisplay();
  initComponentPromptCopy();
  
  // Set initial state
  setPlatform(state.platform);
  setTab(state.tab);
  updateSystemPrompt();
  
  console.log('🌌 AstroFusion Design System loaded');
  console.log(`Platform: ${state.platform}, Tab: ${state.tab}`);
});
