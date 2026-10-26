import ServiceManagement

enum LoginItemController {
    static func setEnabled(_ isEnabled: Bool) throws {
        let service = SMAppService.mainApp

        if isEnabled {
            if service.status != .enabled {
                try service.register()
            }
        } else if service.status == .enabled {
            try service.unregister()
        }
    }
}
