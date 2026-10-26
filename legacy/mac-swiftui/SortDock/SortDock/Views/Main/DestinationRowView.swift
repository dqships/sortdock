import SwiftUI

struct DestinationRowView: View {
    let destination: DestinationFolder
    let availability: DestinationAvailability
    let isSelected: Bool
    let onSelect: () -> Void
    let onRename: () -> Void
    let onReconnect: () -> Void
    let onDelete: () -> Void

    var body: some View {
        HStack(spacing: 4) {
            Button(action: onSelect) {
                HStack(spacing: 8) {
                    RoundedRectangle(cornerRadius: 2)
                        .fill(isSelected ? DesignTokens.accent : Color.clear)
                        .frame(width: 3)
                    Image(systemName: "folder.fill")
                        .foregroundStyle(DesignTokens.accent)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(destination.name)
                            .lineLimit(1)
                        DestinationAvailabilityLabel(availability: availability)
                    }
                    Spacer()
                }
                .padding(.vertical, 6)
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(accessibilitySummary)

            Menu {
                Button("Rename", action: onRename)
                Button("Choose Folder...", action: onReconnect)
                Button("Remove", role: .destructive, action: onDelete)
            } label: {
                Image(systemName: "ellipsis.circle")
                    .foregroundStyle(DesignTokens.mutedText)
            }
            .menuStyle(.borderlessButton)
            .fixedSize()
            .accessibilityLabel("More options for \(destination.name)")
        }
        .padding(.trailing, 4)
        .background(
            RoundedRectangle(cornerRadius: 6, style: .continuous)
                .fill(isSelected ? DesignTokens.panelBackground : Color.clear)
        )
        .help(destination.folderPath ?? "Inside \(destination.name)")
        .accessibilityElement(children: .contain)
    }

    private var accessibilitySummary: String {
        guard let message = availability.message else {
            return destination.name
        }

        return "\(destination.name), \(message)"
    }
}
