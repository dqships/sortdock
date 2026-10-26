import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject private var store: SortDockStore
    @EnvironmentObject private var presentation: AppPresentationCoordinator
    @State private var keyword = "invoice"
    @State private var selectedDestinationID: UUID?
    @State private var automaticMoveAcknowledged = false

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("SortDock setup")
                .font(.title2.weight(.semibold))
            ProgressView(value: Double(store.settings.onboardingStep), total: 6)
                .accessibilityLabel("Setup step \(store.settings.onboardingStep) of 6")
            stepContent
            Spacer(minLength: 0)
            HStack {
                if store.settings.onboardingStep > 1 {
                    Button("Back", action: store.goBackInOnboarding)
                }
                Spacer()
                Button(primaryTitle, action: continueSetup)
                    .buttonStyle(PrimaryButtonStyle())
                    .disabled(!canContinue)
                    .keyboardShortcut(.defaultAction)
            }
        }
        .padding(24)
        .frame(width: 600, height: 430)
        .onAppear { selectedDestinationID = store.destinations.first?.id }
    }

    @ViewBuilder private var stepContent: some View {
        switch store.settings.onboardingStep {
        case 1:
            VStack(alignment: .leading, spacing: 12) {
                Text("Keep Downloads organized").font(.largeTitle.weight(.semibold))
                Text("SortDock watches one folder and moves new files using rules you control. Everything happens on your Mac.")
                Text("No account. No cloud upload. Your files stay on your Mac.")
                    .foregroundStyle(DesignTokens.mutedText)
                legalLinks
            }
        case 2:
            VStack(alignment: .leading, spacing: 12) {
                Text("Choose a folder to watch").font(.title.weight(.semibold))
                Text("SortDock needs permission to watch this folder. It cannot see folders you do not choose.")
                Text(store.watchedFolderURL.lastPathComponent).font(.headline)
                HStack {
                    Button("Use Downloads") { store.chooseWatchedFolder() }
                    Button("Choose Another Folder") { store.chooseWatchedFolder() }
                }
            }
        case 3:
            VStack(alignment: .leading, spacing: 12) {
                Text("Choose your first destination").font(.title.weight(.semibold))
                Text("This is where matching files will go. Choose a folder or make one in Finder. You can change it later.")
                Button("Choose Folder...") {
                    store.chooseDestinationFolder()
                    selectedDestinationID = store.selectedDestinationID
                }
                if let selectedDestinationID,
                   let destination = store.destinations.first(where: { $0.id == selectedDestinationID }) {
                    Text(destination.name)
                        .font(.headline)
                }
            }
        case 4:
            VStack(alignment: .leading, spacing: 12) {
                Text("Create your first keyword rule").font(.title.weight(.semibold))
                TextField("When a filename contains", text: $keyword)
                Picker("Move it to", selection: $selectedDestinationID) {
                    ForEach(store.destinations) { Text($0.name).tag($0.id as UUID?) }
                }
                Text("\(keyword.isEmpty ? "invoice" : keyword)-august.pdf → \(selectedDestinationName)")
                    .foregroundStyle(DesignTokens.mutedText)
                Text("Keyword rules are checked before file-type rules.")
                    .font(.footnote)
            }
        case 5:
            VStack(alignment: .leading, spacing: 12) {
                Text("Choose how SortDock acts").font(.title.weight(.semibold))
                Picker("Behavior", selection: $store.settings.moveBehavior) {
                    Text("Ask me in the menu bar").tag(MoveBehavior.askFirst)
                    Text("Move matching files automatically").tag(MoveBehavior.autoMove)
                }
                Toggle("Ask Later", isOn: $store.settings.askLaterEnabled)
                Toggle("Launch at login", isOn: $store.settings.runAtLogin)
                if store.settings.moveBehavior == .autoMove {
                    Toggle("I understand SortDock will move matching files using my rules.", isOn: $automaticMoveAcknowledged)
                }
                legalLinks
            }
        default:
            VStack(alignment: .leading, spacing: 12) {
                Text("Ready to sort").font(.title.weight(.semibold))
                Text("Watched folder: \(store.watchedFolderURL.lastPathComponent)")
                Text("First destination: \(selectedDestinationName)")
                Text("First keyword: \(keyword.isEmpty ? "No keyword rule" : keyword)")
                Text("Behavior: \(store.settings.moveBehavior.summary)")
                Text("Launch at login: \(store.settings.runAtLogin ? "On" : "Off")")
                Text("Preview: \(keyword.isEmpty ? "example" : keyword)-august.pdf → \(selectedDestinationName)")
                    .foregroundStyle(DesignTokens.mutedText)
            }
        }
    }

    private var legalLinks: some View {
        HStack(spacing: 12) {
            Link("Privacy", destination: URL(string: "https://sortdock.vercel.app/privacy")!)
            Link("Terms", destination: URL(string: "https://sortdock.vercel.app/terms")!)
        }
        .font(.footnote)
    }

    private var primaryTitle: String {
        store.settings.onboardingStep == 1 ? "Set Up SortDock" : store.settings.onboardingStep == 6 ? "Start Sorting" : "Continue"
    }

    private var selectedDestinationName: String {
        store.destinations.first(where: { $0.id == selectedDestinationID })?.name ?? "Documents"
    }

    private var canContinue: Bool {
        switch store.settings.onboardingStep {
        case 2: return store.settings.watchedFolderBookmark != nil
        case 3: return selectedDestinationID != nil
        case 4: return !keyword.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty && selectedDestinationID != nil
        case 5: return store.settings.moveBehavior != .autoMove || automaticMoveAcknowledged
        default: return true
        }
    }

    private func continueSetup() {
        switch store.settings.onboardingStep {
        case 3:
            store.advanceOnboarding()
        case 4:
            if let selectedDestinationID {
                store.saveKeywordRule(id: nil, keywords: KeywordNormalizer.normalizeList(keyword), destinationID: selectedDestinationID, isEnabled: true)
            }
            store.advanceOnboarding()
        case 6:
            store.completeOnboarding()
            presentation.showFullApp()
        default:
            store.advanceOnboarding()
        }
    }
}
