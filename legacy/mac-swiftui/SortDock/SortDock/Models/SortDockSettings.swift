import Foundation

struct SortDockSettings: Codable, Equatable {
    var watchedFolderPath: String
    var watchedFolderBookmark: Data?
    var isSortingEnabled: Bool
    var moveBehavior: MoveBehavior
    var delayOption: DelayOption
    var customDelaySeconds: Double
    var askLaterEnabled: Bool
    var snoozeOption: SnoozeOption
    var customSnoozeMinutes: Double
    var appearanceMode: AppearanceMode
    var runAtLogin: Bool
    var defaultDestinationID: UUID?
    var onboardingVersion: Int
    var onboardingStep: Int

    init(
        watchedFolderPath: String = SortDockSettings.defaultWatchedFolderPath(),
        watchedFolderBookmark: Data? = nil,
        isSortingEnabled: Bool = true,
        moveBehavior: MoveBehavior = .askFirst,
        delayOption: DelayOption = .tenSeconds,
        customDelaySeconds: Double = 10,
        askLaterEnabled: Bool = true,
        snoozeOption: SnoozeOption = .tenMinutes,
        customSnoozeMinutes: Double = 10,
        appearanceMode: AppearanceMode = .system,
        runAtLogin: Bool = true,
        defaultDestinationID: UUID? = nil,
        onboardingVersion: Int = 0,
        onboardingStep: Int = 1
    ) {
        self.watchedFolderPath = watchedFolderPath
        self.watchedFolderBookmark = watchedFolderBookmark
        self.isSortingEnabled = isSortingEnabled
        self.moveBehavior = moveBehavior
        self.delayOption = delayOption
        self.customDelaySeconds = customDelaySeconds
        self.askLaterEnabled = askLaterEnabled
        self.snoozeOption = snoozeOption
        self.customSnoozeMinutes = customSnoozeMinutes
        self.appearanceMode = appearanceMode
        self.runAtLogin = runAtLogin
        self.defaultDestinationID = defaultDestinationID
        self.onboardingVersion = onboardingVersion
        self.onboardingStep = onboardingStep
    }

    var actionDelay: Double {
        delayOption.seconds(customValue: customDelaySeconds)
    }

    var snoozeDelay: Double {
        snoozeOption.seconds(customMinutes: customSnoozeMinutes)
    }

    static func defaultWatchedFolderPath() -> String {
        FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first?.path
            ?? NSHomeDirectory() + "/Downloads"
    }

    private enum CodingKeys: String, CodingKey {
        case watchedFolderPath, watchedFolderBookmark, isSortingEnabled, moveBehavior
        case delayOption, customDelaySeconds, askLaterEnabled, snoozeOption
        case customSnoozeMinutes, appearanceMode, runAtLogin, defaultDestinationID
        case onboardingVersion, onboardingStep
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        watchedFolderPath = try values.decodeIfPresent(String.self, forKey: .watchedFolderPath) ?? Self.defaultWatchedFolderPath()
        watchedFolderBookmark = try values.decodeIfPresent(Data.self, forKey: .watchedFolderBookmark)
        isSortingEnabled = try values.decodeIfPresent(Bool.self, forKey: .isSortingEnabled) ?? true
        moveBehavior = try values.decodeIfPresent(MoveBehavior.self, forKey: .moveBehavior) ?? .askFirst
        delayOption = try values.decodeIfPresent(DelayOption.self, forKey: .delayOption) ?? .tenSeconds
        customDelaySeconds = try values.decodeIfPresent(Double.self, forKey: .customDelaySeconds) ?? 10
        askLaterEnabled = try values.decodeIfPresent(Bool.self, forKey: .askLaterEnabled) ?? true
        snoozeOption = try values.decodeIfPresent(SnoozeOption.self, forKey: .snoozeOption) ?? .tenMinutes
        customSnoozeMinutes = try values.decodeIfPresent(Double.self, forKey: .customSnoozeMinutes) ?? 10
        appearanceMode = try values.decodeIfPresent(AppearanceMode.self, forKey: .appearanceMode) ?? .system
        runAtLogin = try values.decodeIfPresent(Bool.self, forKey: .runAtLogin) ?? true
        defaultDestinationID = try values.decodeIfPresent(UUID.self, forKey: .defaultDestinationID)
        onboardingVersion = try values.decodeIfPresent(Int.self, forKey: .onboardingVersion) ?? 0
        onboardingStep = min(max(try values.decodeIfPresent(Int.self, forKey: .onboardingStep) ?? 1, 1), 6)
    }
}
