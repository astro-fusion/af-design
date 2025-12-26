// Main JavaScript for AstroFusion Design System static site

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // 1. Load all content sections
    await loadAllSections();

    // 2. Initialize UI components (after content is loaded)
    initNavigation();
    initMobileMenu();
    initThemeToggle();
    initCopyButtons();
    initPromptSystem();
    initTokenTabs();
    initAnimationTriggers();
    initSourceViewers();
    
    // 3. Handle initial route
    handleInitialRoute();
}

/**
 * Dynamically loads all section HTML files
 */
async function loadAllSections() {
    const sections = [
        'overview', 'typography', 'colors', 'tokens', 'icons', 
        'theming', 'buttons', 'layout', 'forms', 'data-display', 
        'animation', 'generative', 'mcp', 'integrations', 'prompts'
    ];

    const loadingIndicator = document.getElementById('loading-indicator');
    
    try {
        const fetchPromises = sections.map(id => fetchSection(id));
        await Promise.all(fetchPromises);
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error('Error loading sections:', error);
        if (loadingIndicator) {
            loadingIndicator.innerHTML = '<p class="text-red-600">Error loading content. Please run via a local server.</p>';
        }
    }
}

async function fetchSection(id) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
        const response = await fetch(`sections/${id}.html`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error(`Failed to load section: ${id}`, error);
        container.innerHTML = `<div class="p-4 border border-red-200 bg-red-50 text-red-800 rounded">Failed to load ${id} content. Ensure you are running on a server (http://) not file://</div>`;
    }
}

// --- Navigation & Routing ---

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Intersection Observer for ScrollSpy
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const scrollY = window.scrollY; // Avoid triggering on rapid scroll up
                
                // Only update if we are not manually navigating
                if (!window.isNavigating) {
                    updateActiveNavLink(id);
                    // Update URL without scrolling
                    history.replaceState(null, null, `#${id}`);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Click handling
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function updateActiveNavLink(id) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('nav-item--active');
        if (nav.dataset.section === id) {
            nav.classList.add('nav-item--active');
        }
    });

    // Also update mobile header if needed
    // ...
}

function scrollToSection(id) {
    if (!id) return;
    window.isNavigating = true;
    
    // 1. Hide all sections, Show Target
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('section--active');
    });
    
    const section = document.getElementById(id);
    if (section) {
        section.classList.add('section--active');
        
        // 2. Update Nav State
        updateActiveNavLink(id);
        
        // 3. Update URL (support both hash for anchor and tab param for compatibility)
        const url = new URL(window.location);
        url.hash = id;
        url.searchParams.set('tab', id);
        history.pushState(null, null, url);
        
        // 4. Scroll to top of content
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Close mobile menu if open
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) sidebar.classList.remove('sidebar--active');
        if (overlay) overlay.classList.remove('sidebar-overlay--active');

        // Reset navigation lock
        setTimeout(() => {
            window.isNavigating = false;
        }, 500);
    }
}

function handleInitialRoute() {
    // Priority: 1. Hash (#colors), 2. Search Param (?tab=colors), 3. Default (overview)
    let target = 'overview';
    
    const hash = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    if (hash) {
        target = hash;
    } else if (tabParam) {
        target = tabParam;
    }
    
    // Give a small buffer for content to settle
    setTimeout(() => scrollToSection(target), 100);
}


// --- Mobile Menu ---

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const iconMenu = toggle.querySelector('.icon-menu');
    const iconClose = toggle.querySelector('.icon-close');

    function toggleMenu() {
        const isActive = sidebar.classList.toggle('sidebar--active');
        overlay.classList.toggle('sidebar-overlay--active');
        
        iconMenu.style.display = isActive ? 'none' : 'block';
        iconClose.style.display = isActive ? 'block' : 'none';
        
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}


// --- Theme Toggle ---

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const iconSun = toggle.querySelector('.icon-sun');
    const iconMoon = toggle.querySelector('.icon-moon');
    const label = toggle.querySelector('.theme-label');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    toggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
            label.textContent = 'Dark Mode';
        } else {
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
            label.textContent = 'Light Mode';
        }
    }
}


// --- Copy Functionality ---

function initCopyButtons() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.copy-icon');
        if (!btn) return;

        const componentId = btn.dataset.component;
        if (!componentId) return;

        // In a real app, this would get specific code
        // For now, we simulate copying a prompt
        const prompt = getPromptForComponent(componentId);
        copyToClipboard(prompt, btn);
    });
}

function getPromptForComponent(id) {
    return `Generate a ${id} component following AstroFusion design system guidelines. Use 'af-' prefix classes and proper accessibility attributes.`;
}

async function copyToClipboard(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const originalContent = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.classList.add('text-green-500');
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.classList.remove('text-green-500');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
}


// --- Prompt System ---

function initPromptSystem() {
    // Platform switching
    const platformBtns = document.querySelectorAll('.platform-btn');
    if (platformBtns.length > 0) {
        platformBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                platformBtns.forEach(b => b.classList.remove('platform-btn--active'));
                btn.classList.add('platform-btn--active');
                
                const platform = btn.dataset.platform;
                updatePromptsForPlatform(platform);
            });
        });
        
        // Init with Web
        updatePromptsForPlatform('web');
    }
    
    
    // Prompt Type switching
    const typeTabs = document.querySelectorAll('.prompt-type-tab');
    if (typeTabs.length > 0) {
        typeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                typeTabs.forEach(t => t.classList.remove('prompt-type-tab--active'));
                tab.classList.add('prompt-type-tab--active');
                
                const type = tab.dataset.type;
                document.querySelectorAll('.prompt-card').forEach(card => {
                    card.hidden = card.dataset.type !== type;
                });
            });
        });
    }

    // Attach global function for inline onclicks
    window.copyPrompt = (type) => {
        const content = document.getElementById(`prompt-${type}`).textContent;
        navigator.clipboard.writeText(content).then(() => {
            alert('Prompt copied to clipboard!');
        });
    };
    
    // Add global scope for copyCurrentCode
    window.copyCurrentCode = () => {
        const code = document.querySelector('.source-viewer__content code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied!');
        });
    };
}

function updatePromptsForPlatform(platform) {
    // Update URL param
    const url = new URL(window.location);
    url.searchParams.set('platform', platform);
    window.history.replaceState({}, '', url);

    // Get prompts from prompts.js global object
    if (typeof window.PROMPTS !== 'undefined') {
        const { SYSTEM_PROMPTS, SIMPLE_PROMPTS, FULL_PROMPTS } = window.PROMPTS;
        
        const safeSet = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };
        
        // 1. System Prompt
        // Valid platforms in prompts.js are: web, react-native, ios, android
        // Map 'native' to 'react-native' if needed, though buttons use 'react-native'
        const sysPrompt = SYSTEM_PROMPTS[platform];
        safeSet('prompt-system', sysPrompt || 'System prompt not available for this platform.');

        // 2. Simple Prompt (Use Button Primary as default example)
        // SIMPLE_PROMPTS is keyed by component -> platform
        const simplePrompt = SIMPLE_PROMPTS['button-primary']?.[platform];
        safeSet('prompt-simple', simplePrompt || 'Simple prompt not available.');

        // 3. Full Prompt (Use Button as default example)
        // FULL_PROMPTS is keyed by component only (generic/web focused currently)
        const fullPrompt = FULL_PROMPTS['button'];
        safeSet('prompt-full', fullPrompt || 'Full prompt not available.');
    }
}


// --- Token Tabs ---

function initTokenTabs() {
    const tabs = document.querySelectorAll('.token-tab-btn');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('token-tab-btn--active'));
            // Add to clicked
            tab.classList.add('token-tab-btn--active');

            const target = tab.dataset.tokenTab;
            
            // Hide all contents
            document.querySelectorAll('.token-tab-content').forEach(content => {
                content.hidden = true;
            });
            
            // Show target
            const targetContent = document.querySelector(`.token-tab-content[data-token-tab="${target}"]`);
            if (targetContent) {
                targetContent.hidden = false;
            }
        });
    });
}
// --- Source Viewer ---

function initSourceViewers() {
    // Delegate click for platform tabs (since they might be loaded dynamically)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('platform-tab')) {
            const btn = e.target;
            const container = btn.closest('.source-viewer');
            const platform = btn.dataset.platform;
            
            // 1. Update active tab state
            container.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('platform-tab--active'));
            btn.classList.add('platform-tab--active');
            
            // 2. Identify component type from container ID or title
            // Pattern: id="input-platform-tabs" -> component="input"
            // Pattern: id="button-platform-tabs" -> component="button"
            const tabsId = container.querySelector('.platform-tabs').id;
            const component = tabsId.replace('-platform-tabs', '');
            
            // 3. Update Content
            updateSourceContent(container, component, platform);
        }
    });

    // Initialize viewers when sections load
    // This is handled by the initial load, but we can also trigger a refresh if needed
}

function updateSourceContent(container, component, platform) {
    const codeBlock = container.querySelector('code');
    let content = '';

    if (platform === 'agent') {
        // Fetch JSON Schema
        const schema = window.AGENT_SCHEMAS?.[component];
        content = schema ? JSON.stringify(schema, null, 2) : '// Schema not defined';
    } else {
        // Fetch Code Example (utilizing code from prompts.js or a new object)
        // We can reuse CODE_EXAMPLES from prompts.js if available
        if (typeof window.PROMPTS !== 'undefined' && window.PROMPTS.CODE_EXAMPLES) {
            content = window.PROMPTS.CODE_EXAMPLES[component]?.[platform] || '// Code example not available';
        } else {
            content = '// Loading code...';
        }
    }

    codeBlock.textContent = content;
}
// --- Animation Triggers ---

function initAnimationTriggers() {
    // Delegate click for animation triggers since they might be loaded dynamically
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('anim-trigger')) {
            const btn = e.target;
            const targetId = btn.dataset.target;
            const animClass = btn.dataset.anim;
            
            const targetEl = document.getElementById(targetId);
            if (targetEl && animClass) {
                targetEl.classList.remove(animClass);
                // Trigger reflow
                void targetEl.offsetWidth;
                targetEl.classList.add(animClass);
            }
        }
    });
}
