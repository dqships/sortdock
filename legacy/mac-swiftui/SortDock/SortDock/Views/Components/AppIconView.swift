import SwiftUI

struct AppIconView: View {
    let size: CGFloat

    var body: some View {
        Image("AppIconPreview")
            .resizable()
            .scaledToFit()
            .frame(width: size, height: size)
            .clipShape(RoundedRectangle(cornerRadius: 7, style: .continuous))
    }
}
