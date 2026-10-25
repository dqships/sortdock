import Foundation

enum FileTypeNormalizer {
    static func normalize(_ value: String) -> String? {
        let trimmedValue = value.trimmingCharacters(in: .whitespacesAndNewlines)
        let withoutDot = trimmedValue.hasPrefix(".")
            ? String(trimmedValue.dropFirst())
            : trimmedValue
        let lowercasedValue = withoutDot.lowercased()
        let allowedCharacters = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "_-"))

        guard !lowercasedValue.isEmpty else {
            return nil
        }

        guard lowercasedValue.rangeOfCharacter(from: allowedCharacters.inverted) == nil else {
            return nil
        }

        return lowercasedValue
    }

    static func normalizeList(_ text: String) -> [String] {
        var seenValues = Set<String>()

        return text
            .split { character in
                character == "," || character == " " || character == "\n" || character == "\t"
            }
            .compactMap { normalize(String($0)) }
            .filter { value in
                if seenValues.contains(value) {
                    return false
                }

                seenValues.insert(value)
                return true
            }
    }
}
