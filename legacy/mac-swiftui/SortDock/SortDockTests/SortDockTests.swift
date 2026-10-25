//
//  SortDockTests.swift
//  SortDockTests
//
//  Created by DaQuan Louden on 8/21/26.
//

import Foundation
import Testing
@testable import SortDock

struct SortDockTests {

    @Test @MainActor func promptQueueUsesFIFOOrderAndExactOnceResolution() {
        let destination = DestinationFolder(name: "Documents")
        let queue = PendingMovePromptQueue()
        let first = PendingMovePrompt(fileURL: URL(fileURLWithPath: "/tmp/invoice.pdf"), watchedFolderName: "Demo", destination: destination, activityID: UUID())
        let second = PendingMovePrompt(fileURL: URL(fileURLWithPath: "/tmp/receipt.pdf"), watchedFolderName: "Demo", destination: destination, activityID: UUID())
        queue.enqueue(first)
        queue.enqueue(second)
        #expect(queue.current?.id == first.id)
        #expect(queue.resolveCurrent()?.id == first.id)
        #expect(queue.current?.id == second.id)
        #expect(queue.resolveCurrent()?.id == second.id)
        #expect(queue.resolveCurrent() == nil)
    }

    @Test func keywordRulesWinOverFileTypeRules() {
        let documents = DestinationFolder(name: "Documents")
        let pdfs = DestinationFolder(name: "PDFs")
        let keyword = KeywordRule(keywords: ["invoice"], destinationID: documents.id)
        let typeRule = RoutingRule(extensions: ["pdf"], destinationID: pdfs.id)
        let destinationID = FileRoutingResolver.destinationID(
            for: URL(fileURLWithPath: "/tmp/client-invoice.pdf"),
            keywordRules: [keyword],
            fileTypeRules: [typeRule],
            defaultDestinationID: nil
        )
        #expect(destinationID == documents.id)
    }

    @Test func appStoreVersionComparisonUsesNumericComponents() {
        #expect(AppStoreVersionComparator.isNewer("1.10", than: "1.9"))
        #expect(AppStoreVersionComparator.isNewer("2.0", than: "1.9.9"))
        #expect(!AppStoreVersionComparator.isNewer("1.0", than: "1.0"))
        #expect(!AppStoreVersionComparator.isNewer("1.0.1", than: "1.1"))
    }

    @Test func appStoreLookupResponseDecodesAppleListing() throws {
        let data = Data("""
        {"resultCount":1,"results":[{"version":"1.2","trackViewUrl":"https://apps.apple.com/us/app/sortdock/id123"}]}
        """.utf8)
        let response = try JSONDecoder().decode(AppStoreLookupResponse.self, from: data)
        #expect(response.results.first?.version == "1.2")
        #expect(response.results.first?.trackViewUrl.absoluteString == "https://apps.apple.com/us/app/sortdock/id123")
    }

}
