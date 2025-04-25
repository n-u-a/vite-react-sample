import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import path from "node:path";

const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@states": path.resolve(__dirname, "src/states"),
      "@providers": path.resolve(__dirname, "src/providers"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    coverage: { provider: "istanbul", reporter: ["text", "lcov"] },
    exclude: [...configDefaults.exclude, "src/**/*.stories.*", ".storybook/**", "tests/setup.ts"],
  },
  /** HMR 再最適化防止 (warning 用) */
  optimizeDeps: {
    include: ["@testing-library/jest-dom", "@testing-library/user-event"],
  },
  build: {
    outDir,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "./index.html"),
      },
    },
  },
  base: "/",
});
