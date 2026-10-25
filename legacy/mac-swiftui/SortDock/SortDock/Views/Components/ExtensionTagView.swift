import SwiftUI

struct ExtensionTagView: View {
    let value: String

    var body: some View {
        Text(".\(value)")
            .font(.caption.weight(.medium))
            .foregroundStyle(DesignTokens.accentDeep)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(
                Capsule()
                    .fill(DesignTokens.tagBackground)
            )
            .overlay(
                Capsule()
                    .stroke(DesignTokens.accent.opacity(0.35), lineWidth: 1)
            )
            .accessibilityLabel("\(value) extension")
    }
}
