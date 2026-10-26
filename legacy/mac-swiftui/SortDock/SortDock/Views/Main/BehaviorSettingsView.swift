import SwiftUI

struct BehaviorSettingsView: View {
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionTitleView(title: "Behavior")

            Picker("Move behavior", selection: moveBehaviorBinding) {
                ForEach(MoveBehavior.allCases) { behavior in
                    Text(behavior.label).tag(behavior)
                }
            }
            .pickerStyle(.segmented)

            HStack(spacing: 12) {
                Picker("Wait", selection: delayBinding) {
                    ForEach(DelayOption.allCases) { option in
                        Text(option.label).tag(option)
                    }
                }

                if store.settings.delayOption == .custom {
                    Stepper(
                        "\(Int(store.settings.customDelaySeconds)) sec",
                        value: customDelayBinding,
                        in: 1...300,
                        step: 1
                    )
                    .frame(width: 120)
                }
            }

            Toggle("Ask Later", isOn: askLaterBinding)

            if store.settings.askLaterEnabled {
                HStack(spacing: 12) {
                    Picker("Snooze", selection: snoozeBinding) {
                        ForEach(SnoozeOption.allCases) { option in
                            Text(option.label).tag(option)
                        }
                    }

                    if store.settings.snoozeOption == .custom {
                        Stepper(
                            "\(Int(store.settings.customSnoozeMinutes)) min",
                            value: customSnoozeBinding,
                            in: 1...180,
                            step: 1
                        )
                        .frame(width: 120)
                    }
                }
            }

            Picker("Other files", selection: defaultDestinationBinding) {
                Text("Leave in place").tag(UUID?.none)

                ForEach(store.destinations) { destination in
                    DestinationPickerLabel(
                        destination: destination,
                        availability: store.destinationAvailability(for: destination)
                    )
                    .tag(destination.id as UUID?)
                }
            }
        }
    }

    private var askLaterBinding: Binding<Bool> {
        Binding(
            get: { store.settings.askLaterEnabled },
            set: { store.settings.askLaterEnabled = $0 }
        )
    }

    private var customDelayBinding: Binding<Double> {
        Binding(
            get: { store.settings.customDelaySeconds },
            set: { store.settings.customDelaySeconds = $0 }
        )
    }

    private var customSnoozeBinding: Binding<Double> {
        Binding(
            get: { store.settings.customSnoozeMinutes },
            set: { store.settings.customSnoozeMinutes = $0 }
        )
    }

    private var defaultDestinationBinding: Binding<UUID?> {
        Binding(
            get: { store.settings.defaultDestinationID },
            set: { store.settings.defaultDestinationID = $0 }
        )
    }

    private var delayBinding: Binding<DelayOption> {
        Binding(
            get: { store.settings.delayOption },
            set: { store.settings.delayOption = $0 }
        )
    }

    private var moveBehaviorBinding: Binding<MoveBehavior> {
        Binding(
            get: { store.settings.moveBehavior },
            set: { store.settings.moveBehavior = $0 }
        )
    }

    private var snoozeBinding: Binding<SnoozeOption> {
        Binding(
            get: { store.settings.snoozeOption },
            set: { store.settings.snoozeOption = $0 }
        )
    }
}
