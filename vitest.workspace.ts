import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineWorkspace } from "vitest/config";

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
  {
    extends: "./vitest.unit.config.ts",
    test: { name: "unit" }, // ★ ← --project=unit
  },
  {
    extends: "./vitest.story.config.ts",
    test: { name: "storybook" }, // ★ ← --project=storybook
  },
]);
