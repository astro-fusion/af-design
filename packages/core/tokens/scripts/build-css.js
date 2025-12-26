/**
 * Build script to compile design tokens to CSS custom properties.
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'css');

const colors = require(path.join(SRC_DIR, 'colors.json'));
const typography = require(path.join(SRC_DIR, 'typography.json'));
const spacing = require(path.join(SRC_DIR, 'spacing.json'));

function flattenObject(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = Array.isArray(value) ? value.join(', ') : value;
    }
    return acc;
  }, {});
}

function generateCSS() {
  const flatColors = flattenObject(colors, 'color');
  const flatTypography = flattenObject(typography, 'font');
  const flatSpacing = flattenObject(spacing, 'space');

  const allTokens = { ...flatColors, ...flatTypography, ...flatSpacing };

  let css = `:root {\n`;
  for (const [key, value] of Object.entries(allTokens)) {
    css += `  --${key}: ${value};\n`;
  }
  css += `}\n`;

  return css;
}

// Ensure dist directory exists
fs.mkdirSync(DIST_DIR, { recursive: true });

// Write CSS file
const cssContent = generateCSS();
fs.writeFileSync(path.join(DIST_DIR, 'tokens.css'), cssContent);

console.log('✅ CSS tokens generated: dist/css/tokens.css');
