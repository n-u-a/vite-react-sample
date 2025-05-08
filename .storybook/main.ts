import type { StorybookConfig } from "@storybook/react-vite";
import rehypeMermaid from "rehype-mermaid";
import remarkGfm from "remark-gfm";

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
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            rehypePlugins: [rehypeMermaid],
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  docs: {
    // v7 以降で自動 Docs を使いたい場合
    autodocs: "tag",
  },
};
export default config;
