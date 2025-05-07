import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vitest.unit.config.ts",
    test: { name: "unit" },
  },
  {
    extends: "./vitest.story.config.ts",
    test: { name: "storybook" },
  },
]);
