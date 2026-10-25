import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Folder-watching tests wait for real file events, which can be slow on shared CI machines.
    testTimeout: 20_000,
  },
});
