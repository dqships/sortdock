import SwiftUI

struct DestinationListView: View {
    let onAddNamedFolder: () -> Void
    let onChooseFolder: () -> Void
    let onRename: (DestinationFolder) -> Void

    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                SectionTitleView(title: "Destinations")
                Spacer()
                DestinationAddMenu(
                    watchedFolderName: store.watchedFolderURL.lastPathComponent,
                    onChooseFolder: onChooseFolder,
                    onCreateFolder: onAddNamedFolder
                )
            }

            ScrollView {
                VStack(spacing: 5) {
                    ForEach(store.destinations) { destination in
                        DestinationRowView(
                            destination: destination,
                            availability: store.destinationAvailability(for: destination),
                            isSelected: store.selectedDestinationID == destination.id,
                            onSelect: {
                                store.selectedDestinationID = destination.id
                            },
                            onRename: {
                                onRename(destination)
                            },
                            onReconnect: {
                                store.reconnectDestination(destination)
                            },
                            onDelete: {
                                store.removeDestination(destination)
                            }
                        )
                    }
                }
                .padding(.vertical, 1)
            }
        }
    }
}
