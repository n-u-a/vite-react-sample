import type { Meta, StoryObj } from "@storybook/react";
import Menu from "./Menu";
/**
 * メニュー画面コンポーネントのStory.
 * mdxで表示するため、各StoryにinlineStories: falseを設定する。
 */
type Story = StoryObj<typeof Menu>;

export default {
  tags: ["!docs"],
  title: "Pages/Menu",
  component: Menu,
  parameters: {
    layout: "fullscreen",
    docs: {
      inlineStories: false,
      story: {
        autoplay: true,
        height: 600,
        inline: false,
      },
    },
  },
} satisfies Meta<typeof Menu>;

export const Default: Story = {
  name: "Default",
};
