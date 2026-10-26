import SwiftUI

struct SectionTitleView: View {
    let title: String

    var body: some View {
        Text(title.uppercased())
            .font(.caption.weight(.semibold))
            .foregroundStyle(DesignTokens.mutedText)
            .tracking(0.5)
    }
}
