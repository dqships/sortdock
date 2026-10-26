import SwiftUI

struct PendingMovePromptView: View {
    let prompt: PendingMovePrompt
    let position: Int
    let askLaterEnabled: Bool
    let resolve: (MovePromptChoice) -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("\(prompt.fileName) → \(prompt.destinationName)")
                .font(.headline)
                .lineLimit(1)
                .accessibilityLabel("Move \(prompt.fileName) to \(prompt.destinationName)")
            Text("From \(prompt.watchedFolderName) · 1 of \(position)")
                .font(.footnote)
                .foregroundStyle(DesignTokens.mutedText)
            HStack {
                Button("Move") { resolve(.move) }
                    .buttonStyle(PrimaryButtonStyle())
                Button("Leave Here") { resolve(.leave) }
            }
            HStack {
                if askLaterEnabled {
                    Button("Ask Later") { resolve(.askLater) }
                }
                Button("Choose Another Folder") { resolve(.chooseFolder) }
            }
        }
        .accessibilityElement(children: .contain)
    }
}
