import SwiftUI

struct EmptyRuleStateView: View {
    let onAddRule: () -> Void

    var body: some View {
        VStack(spacing: 10) {
            Text("Add your first rule. Start with PDFs, images, or anything you download often.")
                .font(.callout)
                .foregroundStyle(DesignTokens.mutedText)
                .multilineTextAlignment(.center)
            Button("Add Rule", action: onAddRule)
                .buttonStyle(PrimaryButtonStyle())
        }
        .frame(maxWidth: .infinity, minHeight: 120)
    }
}
