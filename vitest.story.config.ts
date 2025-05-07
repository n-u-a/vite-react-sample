import { defineConfig, mergeConfig } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import path from "node:path";
import baseViteConfig from "./vite.config";

export default defineConfig({
  ...baseViteConfig,

  plugins: [
    ...(baseViteConfig.plugins ?? []),
    storybookTest({
      configDir: path.resolve(__dirname, ".storybook"),
      storybookScript: "pnpm storybook --ci",
      tags: { include: [] }, // Story 全件を play‑test 化
    }),
  ],

  test: {
    browser: {
      enabled: true,
      provider: "playwright", // ← 省略可だが明示推奨
      headless: true, // ← 全インスタンスを headless で
      instances: [
        {
          browser: "chromium",
          // launchOptions: { slowMo: 50 } など追加可
        },
      ],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
