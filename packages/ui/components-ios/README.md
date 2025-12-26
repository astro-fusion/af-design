# AstroFusion Design System - iOS (SwiftUI)

This package provides SwiftUI components that follow the AstroFusion Design System philosophy.

## Status: Reference Implementation

This is a **reference implementation** to demonstrate how SwiftUI apps can consume the shared design tokens.

## Getting Started

### 1. Copy the Tokens

After building the tokens package (`pnpm build` in `/tokens`), copy the generated Swift file to your Xcode project:

```bash
cp ../tokens/dist/swift/DesignTokens.swift ./Sources/
```

### 2. Use in SwiftUI

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: DesignTokens.Spacing._4) {
            Text("Hello, AstroFusion!")
                .font(.system(size: DesignTokens.Typography.xl))
                .foregroundColor(DesignTokens.Colors.Starlight._100)
        }
        .padding(DesignTokens.Spacing._6)
        .background(DesignTokens.Colors.Cosmic._800)
        .cornerRadius(12)
    }
}
```

## Components

Reference SwiftUI implementations will be added here as the design system matures:

- `AFButton.swift` (Planned)
- `AFCard.swift` (Planned)
- `AFGlassView.swift` (Planned)

## Philosophy

The design tokens are automatically generated from the central `/tokens` package. This ensures consistency across Web, React Native, and iOS.

**DO NOT** manually edit `DesignTokens.swift`. Instead, modify the source JSON files in `/tokens/src/` and rebuild.
