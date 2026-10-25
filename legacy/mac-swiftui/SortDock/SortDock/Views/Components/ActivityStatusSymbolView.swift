import SwiftUI

struct ActivityStatusSymbolView: View {
    let status: ActivityRecordStatus
    var size: CGFloat = 13

    var body: some View {
        Image(systemName: symbolName)
            .font(.system(size: size, weight: .medium))
            .foregroundStyle(symbolColor)
            .accessibilityHidden(true)
    }

    private var symbolColor: Color {
        switch status {
        case .moved:
            DesignTokens.accent
        case .left, .note:
            DesignTokens.mutedText
        case .waiting:
            DesignTokens.warning
        case .failed:
            DesignTokens.danger
        }
    }

    private var symbolName: String {
        switch status {
        case .moved:
            "checkmark.circle"
        case .left:
            "minus.circle"
        case .waiting:
            "clock"
        case .failed:
            "exclamationmark.triangle"
        case .note:
            "text.alignleft"
        }
    }
}
