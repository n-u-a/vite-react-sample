import { defineConfig } from "vitest/config";
import vite from "./vite.config";

export default defineConfig({
  ...vite,
  test: {
    include: ["tests/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"], // jest‑dom を登録
  },
});
