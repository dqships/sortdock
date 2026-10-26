import SwiftUI

struct DestinationAvailabilityLabel: View {
    let availability: DestinationAvailability

    var body: some View {
        if let message = availability.message {
            HStack(spacing: 4) {
                Image(systemName: "exclamationmark.triangle.fill")
                    .foregroundStyle(
                        availability == .missing ? DesignTokens.danger : DesignTokens.warning
                    )
                Text(message)
                    .foregroundStyle(.primary)
            }
            .font(.caption)
            .lineLimit(1)
        }
    }
}
