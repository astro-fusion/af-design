/**
 * Build script to compile design tokens to NativeWind theme configuration.
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'nativewind');

const colors = require(path.join(SRC_DIR, 'colors.json'));
const typography = require(path.join(SRC_DIR, 'typography.json'));
const spacing = require(path.join(SRC_DIR, 'spacing.json'));

function generateNativeWindTheme() {
  const theme = {
    colors: {},
    fontFamily: {},
    fontSize: {},
    spacing: {},
  };

  // Process colors
  for (const [colorGroup, shades] of Object.entries(colors)) {
    if (typeof shades === 'object') {
      theme.colors[colorGroup] = shades;
    }
  }

  // Process typography
  if (typography.fontFamily) {
    for (const [key, value] of Object.entries(typography.fontFamily)) {
      theme.fontFamily[key] = value;
    }
  }
  if (typography.fontSize) {
    for (const [key, value] of Object.entries(typography.fontSize)) {
      theme.fontSize[key] = value;
    }
  }

  // Process spacing
  for (const [key, value] of Object.entries(spacing)) {
    theme.spacing[key] = value;
  }

  return theme;
}

function generateTypeScript(theme) {
  return `/**
 * Auto-generated NativeWind theme configuration.
 * DO NOT EDIT DIRECTLY - Modify tokens/src/*.json instead.
 */
export const nativeWindTheme = ${JSON.stringify(theme, null, 2)} as const;

export type NativeWindTheme = typeof nativeWindTheme;
`;
}

// Ensure dist directory exists
fs.mkdirSync(DIST_DIR, { recursive: true });

// Generate and write theme
const theme = generateNativeWindTheme();
const tsContent = generateTypeScript(theme);
fs.writeFileSync(path.join(DIST_DIR, 'theme.ts'), tsContent);

// Also export as JSON for other consumers
fs.writeFileSync(path.join(DIST_DIR, 'theme.json'), JSON.stringify(theme, null, 2));

console.log('✅ NativeWind theme generated: dist/nativewind/theme.ts');
