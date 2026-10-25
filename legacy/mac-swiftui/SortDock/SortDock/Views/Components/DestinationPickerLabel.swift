import SwiftUI

struct DestinationPickerLabel: View {
    let destination: DestinationFolder
    let availability: DestinationAvailability

    var body: some View {
        Text(label)
    }

    private var label: String {
        availability == .available
            ? destination.name
            : "\(destination.name) (Unavailable)"
    }
}
