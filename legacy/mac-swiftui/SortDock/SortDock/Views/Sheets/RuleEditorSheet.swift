import SwiftUI

struct RuleEditorSheet: View {
    let rule: RoutingRule?

    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: SortDockStore
    @State private var destinationID: UUID?
    @State private var extensionText: String

    init(rule: RoutingRule?) {
        self.rule = rule
        _destinationID = State(initialValue: rule?.destinationID)
        _extensionText = State(
            initialValue: rule?.extensions.map { ".\($0)" }.joined(separator: ", ") ?? ""
        )
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(rule == nil ? "Add Rule" : "Edit Rule")
                .font(.title3.weight(.semibold))

            TextField(".pdf, .docx, .png", text: $extensionText)

            Picker("Destination", selection: destinationBinding) {
                ForEach(store.destinations) { destination in
                    DestinationPickerLabel(
                        destination: destination,
                        availability: store.destinationAvailability(for: destination)
                    )
                    .tag(destination.id as UUID?)
                }
            }

            Text(previewText)
                .font(.footnote)
                .foregroundStyle(DesignTokens.mutedText)

            if !duplicateExtensions.isEmpty {
                Text("\(duplicateExtensions.map { ".\($0)" }.joined(separator: ", ")) already has a rule.")
                    .font(.footnote)
                    .foregroundStyle(DesignTokens.danger)
            }

            HStack {
                Spacer()
                Button("Cancel") {
                    dismiss()
                }
                Button("Save Rule") {
                    save()
                }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(!canSave)
            }
        }
        .padding(20)
        .frame(width: 420)
        .onAppear {
            destinationID = destinationID ?? store.destinations.first?.id
        }
    }

    private var canSave: Bool {
        !normalizedExtensions.isEmpty && destinationID != nil && duplicateExtensions.isEmpty
    }

    private var destinationBinding: Binding<UUID?> {
        Binding(
            get: { destinationID },
            set: { destinationID = $0 }
        )
    }

    private var duplicateExtensions: [String] {
        store.duplicateExtensions(normalizedExtensions, excluding: rule?.id)
    }

    private var normalizedExtensions: [String] {
        FileTypeNormalizer.normalizeList(extensionText)
    }

    private var previewText: String {
        guard !normalizedExtensions.isEmpty,
              let destination = store.destinations.first(where: { $0.id == destinationID })
        else {
            return "Files with these endings will move to the folder you choose."
        }

        let endings = normalizedExtensions.map { ".\($0)" }.joined(separator: " or ")
        return "Files ending in \(endings) will move to \(destination.name)."
    }

    private func save() {
        guard let destinationID else {
            return
        }

        store.saveRule(
            id: rule?.id,
            extensions: normalizedExtensions,
            destinationID: destinationID
        )
        dismiss()
    }
}
