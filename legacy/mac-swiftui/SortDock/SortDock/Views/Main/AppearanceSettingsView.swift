import SwiftUI

struct AppearanceSettingsView: View {
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionTitleView(title: "Appearance")

            Picker("Theme", selection: appearanceBinding) {
                ForEach(AppearanceMode.allCases) { mode in
                    Text(mode.label).tag(mode)
                }
            }
            .pickerStyle(.segmented)

            Toggle("Run at login", isOn: runAtLoginBinding)
        }
    }

    private var appearanceBinding: Binding<AppearanceMode> {
        Binding(
            get: { store.settings.appearanceMode },
            set: { store.settings.appearanceMode = $0 }
        )
    }

    private var runAtLoginBinding: Binding<Bool> {
        Binding(
            get: { store.settings.runAtLogin },
            set: { store.settings.runAtLogin = $0 }
        )
    }
}
