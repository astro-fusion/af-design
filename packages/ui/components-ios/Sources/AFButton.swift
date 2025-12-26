//
// AFButton.swift
// Reference implementation of a Button component for SwiftUI.
// This file demonstrates how to use DesignTokens in SwiftUI.
//

import SwiftUI

public struct AFButton: View {
    public enum Variant {
        case primary
        case secondary
        case glass
    }
    
    public enum Size {
        case sm
        case md
        case lg
        
        var padding: EdgeInsets {
            switch self {
            case .sm: return EdgeInsets(top: 6, leading: 12, bottom: 6, trailing: 12)
            case .md: return EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
            case .lg: return EdgeInsets(top: 12, leading: 24, bottom: 12, trailing: 24)
            }
        }
        
        var fontSize: CGFloat {
            switch self {
            case .sm: return 14
            case .md: return 16
            case .lg: return 18
            }
        }
    }
    
    let title: String
    let variant: Variant
    let size: Size
    let action: () -> Void
    
    public init(
        _ title: String,
        variant: Variant = .primary,
        size: Size = .md,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.variant = variant
        self.size = size
        self.action = action
    }
    
    public var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: size.fontSize, weight: .semibold))
                .foregroundColor(textColor)
                .padding(size.padding)
        }
        .background(backgroundColor)
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(borderColor, lineWidth: variant == .glass ? 1 : 0)
        )
    }
    
    private var backgroundColor: Color {
        switch variant {
        case .primary:
            return Color(hex: "2f2a5c") // cosmic-600
        case .secondary:
            return Color(hex: "f8f9fa") // starlight-200
        case .glass:
            return Color.white.opacity(0.1)
        }
    }
    
    private var textColor: Color {
        switch variant {
        case .primary:
            return .white
        case .secondary:
            return Color(hex: "0f0c29")
        case .glass:
            return .white
        }
    }
    
    private var borderColor: Color {
        variant == .glass ? Color.white.opacity(0.2) : .clear
    }
}
