import Foundation

enum KeywordRuleMatcher {
    static func firstMatch(for fileURL: URL, in rules: [KeywordRule]) -> KeywordRule? {
        let fileName = fileURL.deletingPathExtension().lastPathComponent

        return rules.first { rule in
            rule.isEnabled && rule.keywords.contains { keyword in
                !keyword.isEmpty && fileName.range(of: keyword, options: .caseInsensitive) != nil
            }
        }
    }
}
