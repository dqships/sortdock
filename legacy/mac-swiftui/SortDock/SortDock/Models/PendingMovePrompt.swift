import Foundation

struct PendingMovePrompt: Identifiable, Equatable {
    let id: UUID
    let sourcePath: String
    let fileName: String
    let watchedFolderName: String
    let destinationID: UUID
    let destinationName: String
    let activityID: UUID

    init(fileURL: URL, watchedFolderName: String, destination: DestinationFolder, activityID: UUID) {
        id = UUID()
        sourcePath = fileURL.path
        fileName = fileURL.lastPathComponent
        self.watchedFolderName = watchedFolderName
        destinationID = destination.id
        destinationName = destination.name
        self.activityID = activityID
    }
}
