//
//  SortDockApp.swift
//  SortDock
//
//  Created by DaQuan Louden on 5/27/26.
//

import SwiftUI

@main
struct SortDockApp: App {
    @NSApplicationDelegateAdaptor(SortDockAppDelegate.self) private var appDelegate

    var body: some Scene {
        Window("SortDock", id: "main") {
            Group {
                if appDelegate.store.needsOnboarding {
                    OnboardingView()
                } else {
                    MainWindowView()
                }
            }
                .environmentObject(appDelegate.store)
                .environmentObject(appDelegate.presentation)
                .environmentObject(appDelegate.updateChecker)
                .frame(minWidth: 620, minHeight: 460)
        }
        .defaultSize(width: 680, height: 520)

        MenuBarExtra("SortDock", systemImage: "tray.full") {
            MenuBarPopoverView()
                .environmentObject(appDelegate.store)
                .environmentObject(appDelegate.presentation)
                .environmentObject(appDelegate.updateChecker)
        }
    }
}
