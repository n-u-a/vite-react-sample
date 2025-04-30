import type { StorybookConfig } from "@storybook/react-vite";
import remarkMermaid from "remark-mermaidjs";

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  core: {
    builder: "@storybook/builder-vite",
  },
  stories: ["../src/**/*.stories.@(tsx)", "../src/**/*.mdx"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/experimental-addon-test",
    "@storybook/addon-mdx-gfm",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkMermaid],
          },
        },
      },
    },
  ],
  docs: {
    // v7 以降で自動 Docs を使いたい場合
    autodocs: "tag",
  },
};
export default config;
