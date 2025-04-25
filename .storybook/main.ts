import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/experimental-addon-test"],
};
export default config;
