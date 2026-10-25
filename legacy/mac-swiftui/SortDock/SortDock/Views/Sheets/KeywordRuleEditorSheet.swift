import SwiftUI

struct KeywordRuleEditorSheet: View {
    let rule: KeywordRule?

    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: SortDockStore
    @State private var destinationID: UUID?
    @State private var isEnabled: Bool
    @State private var keywordText: String

    init(rule: KeywordRule?) {
        self.rule = rule
        _destinationID = State(initialValue: rule?.destinationID)
        _isEnabled = State(initialValue: rule?.isEnabled ?? true)
        _keywordText = State(initialValue: rule?.keywords.joined(separator: ", ") ?? "")
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(rule == nil ? "Add Keyword Rule" : "Edit Keyword Rule")
                .font(.title3.weight(.semibold))

            VStack(alignment: .leading, spacing: 6) {
                TextField("Keywords", text: $keywordText, prompt: Text("invoice, receipt"))
                Text("Separate keywords with commas. A file only needs to match one.")
                    .font(.footnote)
                    .foregroundStyle(DesignTokens.mutedText)
            }

            Picker("Destination", selection: destinationBinding) {
                ForEach(store.destinations) { destination in
                    DestinationPickerLabel(
                        destination: destination,
                        availability: store.destinationAvailability(for: destination)
                    )
                    .tag(destination.id as UUID?)
                }
            }

            Toggle("Rule is active", isOn: $isEnabled)

            Text(previewText)
                .font(.footnote)
                .foregroundStyle(DesignTokens.mutedText)
                .fixedSize(horizontal: false, vertical: true)

            HStack {
                Spacer()
                Button("Cancel", action: dismiss.callAsFunction)
                Button("Save Rule", action: save)
                    .buttonStyle(PrimaryButtonStyle())
                    .disabled(!canSave)
            }
        }
        .padding(20)
        .frame(width: 440)
        .onAppear {
            destinationID = destinationID ?? store.destinations.first?.id
        }
    }

    private var canSave: Bool {
        !normalizedKeywords.isEmpty && destinationID != nil
    }

    private var destinationBinding: Binding<UUID?> {
        Binding(
            get: { destinationID },
            set: { destinationID = $0 }
        )
    }

    private var normalizedKeywords: [String] {
        KeywordNormalizer.normalizeList(keywordText)
    }

    private var previewText: String {
        guard !normalizedKeywords.isEmpty,
              let destination = store.destinations.first(where: { $0.id == destinationID })
        else {
            return "Matching filenames will move to the folder you choose."
        }

        let keywords = normalizedKeywords.joined(separator: " or ")
        return "Filenames containing \(keywords) will move to \(destination.name)."
    }

    private func save() {
        guard let destinationID else {
            return
        }

        store.saveKeywordRule(
            id: rule?.id,
            keywords: normalizedKeywords,
            destinationID: destinationID,
            isEnabled: isEnabled
        )
        dismiss()
    }
}
