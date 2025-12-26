# AstroFusion Design System - Android (Jetpack Compose)

This package provides Jetpack Compose components that follow the AstroFusion Design System philosophy.

## Status: Reference Implementation

This is a **reference implementation** to demonstrate how Android apps can consume the shared design tokens.

## Getting Started

### 1. Copy the Tokens

Create a `DesignTokens.kt` file in your project based on the token values from `/tokens/src/*.json`:

```kotlin
package com.astrofusion.design

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object DesignTokens {
    object Colors {
        object Cosmic {
            val _900 = Color(0xFF0F0C29)
            val _800 = Color(0xFF1A163A)
            val _700 = Color(0xFF24204B)
            val _600 = Color(0xFF2F2A5C)
        }
        object Starlight {
            val _100 = Color(0xFFFFFFFF)
            val _200 = Color(0xFFF8F9FA)
            val _300 = Color(0xFFE9ECEF)
        }
        object Surface {
            val glass = Color(0x1AFFFFFF) // 10% white
            val glassDark = Color(0x4D000000) // 30% black
        }
    }

    object Typography {
        val xs = 12.sp
        val sm = 14.sp
        val base = 16.sp
        val lg = 18.sp
        val xl = 20.sp
    }

    object Spacing {
        val _0 = 0.dp
        val _1 = 4.dp
        val _2 = 8.dp
        val _3 = 12.dp
        val _4 = 16.dp
        val _6 = 24.dp
        val _8 = 32.dp
    }
}
```

### 2. Use in Jetpack Compose

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.astrofusion.design.DesignTokens

@Composable
fun ExampleCard() {
    Box(
        modifier = Modifier
            .background(DesignTokens.Colors.Cosmic._800)
            .padding(DesignTokens.Spacing._4)
    ) {
        Text(
            text = "Hello, AstroFusion!",
            color = DesignTokens.Colors.Starlight._100,
            fontSize = DesignTokens.Typography.lg
        )
    }
}
```

## Components

Reference Jetpack Compose implementations:

- `AFButton.kt` — Included
- `AFCard.kt` — Planned

## Philosophy

The design tokens mirror the central `/tokens` package. This ensures consistency across Web, React Native, iOS, and Android.
