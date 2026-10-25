import Foundation

struct SortDockConfiguration: Codable, Equatable {
    var settings: SortDockSettings
    var destinations: [DestinationFolder]
    var rules: [RoutingRule]
    var keywordRules: [KeywordRule]
    var activities: [ActivityRecord]

    init(
        settings: SortDockSettings,
        destinations: [DestinationFolder],
        rules: [RoutingRule],
        keywordRules: [KeywordRule] = [],
        activities: [ActivityRecord]
    ) {
        self.settings = settings
        self.destinations = destinations
        self.rules = rules
        self.keywordRules = keywordRules
        self.activities = activities
    }

    static func defaultValue() -> SortDockConfiguration {
        let pdfs = DestinationFolder(name: "PDFs")
        let images = DestinationFolder(name: "Images")
        let videos = DestinationFolder(name: "Videos")
        let audio = DestinationFolder(name: "Audio")
        let archives = DestinationFolder(name: "Archives")
        let documents = DestinationFolder(name: "Documents")
        let data = DestinationFolder(name: "Data")
        let apps = DestinationFolder(name: "Apps")
        let projects = DestinationFolder(name: "Projects")

        let destinations = [
            pdfs,
            images,
            videos,
            audio,
            archives,
            documents,
            data,
            apps,
            projects
        ]

        let rules = [
            RoutingRule(extensions: ["pdf"], destinationID: pdfs.id),
            RoutingRule(extensions: ["png", "jpg", "jpeg", "heic", "gif", "webp"], destinationID: images.id),
            RoutingRule(extensions: ["mp4", "mov", "m4v"], destinationID: videos.id),
            RoutingRule(extensions: ["mp3", "wav", "aiff", "m4a"], destinationID: audio.id),
            RoutingRule(extensions: ["zip", "rar", "7z", "tar", "gz"], destinationID: archives.id),
            RoutingRule(extensions: ["doc", "docx", "txt", "rtf", "md", "pages"], destinationID: documents.id),
            RoutingRule(extensions: ["csv", "json", "xls", "xlsx"], destinationID: data.id),
            RoutingRule(extensions: ["dmg", "pkg"], destinationID: apps.id)
        ]

        return SortDockConfiguration(
            settings: SortDockSettings(),
            destinations: destinations,
            rules: rules,
            keywordRules: [],
            activities: []
        )
    }

    private enum CodingKeys: String, CodingKey {
        case settings
        case destinations
        case rules
        case keywordRules
        case activities
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        settings = try container.decode(SortDockSettings.self, forKey: .settings)
        destinations = try container.decode([DestinationFolder].self, forKey: .destinations)
        rules = try container.decode([RoutingRule].self, forKey: .rules)
        keywordRules = try container.decodeIfPresent([KeywordRule].self, forKey: .keywordRules) ?? []
        activities = try container.decodeIfPresent([ActivityRecord].self, forKey: .activities) ?? []
    }
}
