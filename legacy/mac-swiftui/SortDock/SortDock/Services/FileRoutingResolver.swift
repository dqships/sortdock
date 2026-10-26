import Foundation

enum FileRoutingResolver {
    static func destinationID(
        for fileURL: URL,
        keywordRules: [KeywordRule],
        fileTypeRules: [RoutingRule],
        defaultDestinationID: UUID?
    ) -> UUID? {
        if let keywordRule = KeywordRuleMatcher.firstMatch(for: fileURL, in: keywordRules) {
            return keywordRule.destinationID
        }

        let fileExtension = fileURL.pathExtension.lowercased()

        if let fileTypeRule = fileTypeRules.first(where: {
            $0.matches(fileExtension: fileExtension)
        }) {
            return fileTypeRule.destinationID
        }

        return defaultDestinationID
    }
}
