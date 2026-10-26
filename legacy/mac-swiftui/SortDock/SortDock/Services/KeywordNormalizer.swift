import Foundation

enum KeywordNormalizer {
    static func normalizeList(_ text: String) -> [String] {
        var seenKeywords = Set<String>()

        return text
            .split { character in
                character == "," || character == ";" || character == "\n" || character == "\t"
            }
            .map { keyword in
                String(keyword)
                    .trimmingCharacters(in: .whitespacesAndNewlines)
                    .lowercased()
            }
            .filter { keyword in
                guard !keyword.isEmpty, !seenKeywords.contains(keyword) else {
                    return false
                }

                seenKeywords.insert(keyword)
                return true
            }
    }
}
