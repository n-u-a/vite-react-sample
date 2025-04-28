import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/**/*.stories.@(tsx)", "../src/**/*.mdx"],
  addons: ["@storybook/addon-essentials", "@storybook/experimental-addon-test", "@storybook/addon-mdx-gfm"],
  docs: {
    // v7 以降で自動 Docs を使いたい場合
    autodocs: "tag",
  },
};
export default config;
