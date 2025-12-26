/**
 * Build script to compile design tokens to Swift constants for SwiftUI.
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'swift');

const colors = require(path.join(SRC_DIR, 'colors.json'));
const typography = require(path.join(SRC_DIR, 'typography.json'));
const spacing = require(path.join(SRC_DIR, 'spacing.json'));

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function hexToSwiftColor(hex) {
  if (hex.startsWith('rgba')) {
    // Handle rgba format
    const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    if (match) {
      const [, r, g, b, a = 1] = match;
      return `Color(red: ${parseInt(r) / 255}, green: ${parseInt(g) / 255}, blue: ${parseInt(b) / 255}, opacity: ${a})`;
    }
  }
  // Handle hex format
  const cleanHex = hex.replace('#', '');
  return `Color(hex: "${cleanHex}")`;
}

function generateSwift() {
  let swift = `//
// DesignTokens.swift
// Auto-generated from design tokens.
// DO NOT EDIT DIRECTLY - Modify tokens/src/*.json instead.
//

import SwiftUI

// MARK: - Color Extension for Hex
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Design Tokens
struct DesignTokens {
`;

  // Colors
  swift += `    // MARK: - Colors\n`;
  swift += `    struct Colors {\n`;
  for (const [colorGroup, shades] of Object.entries(colors)) {
    swift += `        struct ${toCamelCase(colorGroup.charAt(0).toUpperCase() + colorGroup.slice(1))} {\n`;
    if (typeof shades === 'object') {
      for (const [shade, value] of Object.entries(shades)) {
        const propName = shade.match(/^\d/) ? `_${shade}` : shade;
        swift += `            static let ${propName} = ${hexToSwiftColor(value)}\n`;
      }
    }
    swift += `        }\n`;
  }
  swift += `    }\n\n`;

  // Typography
  swift += `    // MARK: - Typography\n`;
  swift += `    struct Typography {\n`;
  if (typography.fontSize) {
    for (const [key, value] of Object.entries(typography.fontSize)) {
      const numValue = parseFloat(value);
      swift += `        static let ${key}: CGFloat = ${numValue * 16}\n`; // Convert rem to pt (approx)
    }
  }
  swift += `    }\n\n`;

  // Spacing
  swift += `    // MARK: - Spacing\n`;
  swift += `    struct Spacing {\n`;
  for (const [key, value] of Object.entries(spacing)) {
    const propName = key.match(/^\d/) ? `_${key}` : key;
    const numValue = parseFloat(value);
    swift += `        static let ${propName}: CGFloat = ${numValue * 16}\n`; // Convert rem to pt (approx)
  }
  swift += `    }\n`;

  swift += `}\n`;

  return swift;
}

// Ensure dist directory exists
fs.mkdirSync(DIST_DIR, { recursive: true });

// Write Swift file
const swiftContent = generateSwift();
fs.writeFileSync(path.join(DIST_DIR, 'DesignTokens.swift'), swiftContent);

console.log('✅ Swift tokens generated: dist/swift/DesignTokens.swift');
