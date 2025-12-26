package com.astrofusion.design.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Design tokens for AstroFusion Design System.
 * Auto-generated values based on tokens/src/*.json
 */
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
            val glass = Color(0x1AFFFFFF)
            val glassDark = Color(0x4D000000)
        }
    }
}

enum class ButtonVariant {
    Primary,
    Secondary,
    Glass
}

enum class ButtonSize {
    Sm,
    Md,
    Lg
}

/**
 * AstroFusion Button component for Jetpack Compose.
 */
@Composable
fun AFButton(
    text: String,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.Md,
    onClick: () -> Unit
) {
    val backgroundColor = when (variant) {
        ButtonVariant.Primary -> DesignTokens.Colors.Cosmic._600
        ButtonVariant.Secondary -> DesignTokens.Colors.Starlight._200
        ButtonVariant.Glass -> DesignTokens.Colors.Surface.glass
    }

    val textColor = when (variant) {
        ButtonVariant.Primary -> DesignTokens.Colors.Starlight._100
        ButtonVariant.Secondary -> DesignTokens.Colors.Cosmic._900
        ButtonVariant.Glass -> DesignTokens.Colors.Starlight._100
    }

    val (horizontalPadding, verticalPadding, fontSize) = when (size) {
        ButtonSize.Sm -> Triple(12.dp, 6.dp, 14.sp)
        ButtonSize.Md -> Triple(16.dp, 8.dp, 16.sp)
        ButtonSize.Lg -> Triple(24.dp, 12.dp, 18.sp)
    }

    val shape = RoundedCornerShape(8.dp)

    Box(
        modifier = Modifier
            .clip(shape)
            .background(backgroundColor)
            .then(
                if (variant == ButtonVariant.Glass) {
                    Modifier.border(1.dp, Color.White.copy(alpha = 0.2f), shape)
                } else {
                    Modifier
                }
            )
            .clickable(onClick = onClick)
            .padding(horizontal = horizontalPadding, vertical = verticalPadding),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            color = textColor,
            fontSize = fontSize,
            fontWeight = FontWeight.SemiBold
        )
    }
}
