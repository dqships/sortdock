import AppKit

final class FolderPicker {
    func chooseFolder(message: String, prompt: String) -> URL? {
        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = false
        panel.canChooseDirectories = true
        panel.canChooseFiles = false
        panel.canCreateDirectories = true
        panel.message = message
        panel.prompt = prompt

        guard panel.runModal() == .OK else {
            return nil
        }

        return panel.url
    }
}
