import Combine
import Foundation

@MainActor
final class PendingMovePromptQueue: ObservableObject {
    @Published private(set) var prompts: [PendingMovePrompt] = []
    private var resolvedPromptIDs = Set<UUID>()

    var current: PendingMovePrompt? { prompts.first }
    var count: Int { prompts.count }

    func enqueue(_ prompt: PendingMovePrompt) {
        guard !prompts.contains(where: { $0.sourcePath == prompt.sourcePath }) else { return }
        prompts.append(prompt)
    }

    func resolveCurrent() -> PendingMovePrompt? {
        guard let prompt = prompts.first, resolvedPromptIDs.insert(prompt.id).inserted else { return nil }
        prompts.removeFirst()
        return prompt
    }

    func removeMissingSource(at path: String) {
        prompts.removeAll { $0.sourcePath == path }
    }

    func discardAll() { prompts.removeAll() }
}
