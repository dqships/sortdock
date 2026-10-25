import SwiftUI

struct FlowTagStack: View {
    let values: [String]

    var body: some View {
        HStack(spacing: 5) {
            ForEach(values.prefix(4), id: \.self) { value in
                ExtensionTagView(value: value)
            }

            if values.count > 4 {
                Text("+\(values.count - 4)")
                    .font(.caption.weight(.medium))
                    .foregroundStyle(DesignTokens.mutedText)
            }
        }
    }
}
