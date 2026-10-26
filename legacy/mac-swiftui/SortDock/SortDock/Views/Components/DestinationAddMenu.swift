import SwiftUI

struct DestinationAddMenu: View {
    let watchedFolderName: String
    let onChooseFolder: () -> Void
    let onCreateFolder: () -> Void

    var body: some View {
        Menu {
            Button("Choose or Create Folder...", action: onChooseFolder)
            Button("New Folder in \(watchedFolderName)...", action: onCreateFolder)
        } label: {
            Image(systemName: "plus")
        }
        .menuStyle(.borderlessButton)
        .fixedSize()
        .help("Add destination")
        .accessibilityLabel("Add destination")
    }
}
