import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "@storybook/test";
import Button from "@components/uiParts/button/Button";

export default {
  title: "uiParts/Button",
  component: Button,
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "auto"],
    },
    type: {
      control: "radio",
      options: ["button", "submit"],
    },
    isWaiting: { control: "boolean" },
    // Storybook 内の Action タブでクリック確認
    // onClick: { action: "clicked", table: { disable: true } },
  },
  args: {
    name: "Click",
    color: "primary",
    size: "auto",
    isWaiting: false,
    type: "button",
  },
} satisfies Meta<typeof Button>;

/* -------------------------------------------------------------------------- */
/*  Primary                                                                   */
/* -------------------------------------------------------------------------- */

export const Primary: StoryObj<typeof Button> = {
  name: "Primary",
  args: {
    color: "primary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: "Click" });

    await userEvent.click(btn);
    expect(btn).toHaveAttribute("type", "button");
  },
};

/* -------------------------------------------------------------------------- */
/*  Secondary                                                                 */
/* -------------------------------------------------------------------------- */

export const Secondary: StoryObj<typeof Button> = {
  name: "Secondary",
  args: {
    color: "secondary",
    name: "Cancel",
  },
};

/* -------------------------------------------------------------------------- */
/*  Loading state                                                             */
/* -------------------------------------------------------------------------- */

export const Waiting: StoryObj<typeof Button> = {
  name: "Waiting",
  args: {
    isWaiting: true,
    name: "Saving…",
  },
  parameters: {
    docs: {
      description: {
        story:
          "通信中などで非活性にしたい場合 `isWaiting` を `true` にします。スタイルは ButtonTv の `isWaiting` バリアントで制御します。",
      },
    },
  },
};
