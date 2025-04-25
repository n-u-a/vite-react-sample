import { defineConfig } from "vite";
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
