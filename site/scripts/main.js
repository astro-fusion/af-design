/**
 * AstroFusion Design System - Documentation Site Scripts
 */

// Platform tab switching
document.querySelectorAll('.af-platform-tabs').forEach(tabContainer => {
  const tabs = tabContainer.querySelectorAll('.af-tab');
  const card = tabContainer.closest('.af-component-card');
  const codeBlocks = card.querySelectorAll('.af-code-block[data-platform]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('af-tab--active'));
      tab.classList.add('af-tab--active');

      // Show/hide code blocks
      const platform = tab.dataset.platform;
      codeBlocks.forEach(block => {
        if (block.dataset.platform === platform) {
          block.hidden = false;
        } else {
          block.hidden = true;
        }
      });
    });
  });
});

// Copy code to clipboard
function copyCode(button) {
  const codeBlock = button.closest('.af-code-block');
  const code = codeBlock.querySelector('code').textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  });
}

// Copy prompt to clipboard
function copyPrompt(type) {
  const promptElement = document.getElementById(`prompt-${type}`);
  const text = promptElement.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const button = promptElement.closest('.af-prompt-card').querySelector('.af-copy-btn');
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

console.log('🌌 AstroFusion Design System loaded');
