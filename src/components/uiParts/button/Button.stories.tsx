import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent, fn } from "@storybook/test";
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
    isLoading: { control: "boolean" },
  },
  args: {
    name: "Click",
    color: "primary",
    size: "auto",
    isLoading: false,
    type: "button",
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

/* -------------------------------------------------------------------------- */
/*  Primary                                                                   */
/* -------------------------------------------------------------------------- */
export const Primary: StoryObj<typeof Button> = {
  name: "Primary",
  args: {
    color: "primary",
    // onClick は argTypes の action から自動で渡される
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: "Click" });

    // 通常状態ならクリック可能で、disabled 属性はない
    expect(btn).not.toBeDisabled();

    // クリックシミュレーション → Action が呼ばれているか
    await userEvent.click(btn);
    expect(canvas.getByRole("button")).toHaveAttribute("type", "button");
    // Action タブ上で「clicked」が１回呼ばれたのを確認できる
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
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole("button", { name: "Cancel" });
    expect(btn).not.toBeDisabled();
  },
};

/* -------------------------------------------------------------------------- */
/*  Loading state                                                             */
/* -------------------------------------------------------------------------- */
export const Waiting: StoryObj<typeof Button> = {
  name: "Waiting",
  args: {
    isLoading: true,
    name: "Saving…",
  },
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole("button", { name: "Saving…" });

    // ローディング中は aria-disabledがtrue のはず
    expect(btn).toHaveAttribute("aria-disabled", "true");
    // expect(btn).toBeDisabled();
    // 文言も確認しておく
    expect(btn).toHaveTextContent("Saving…");
  },
  parameters: {
    docs: {
      description: {
        story:
          "通信中などで非活性にしたい場合は `isLoading` を `true` にします。スタイルは ButtonTv の `isLoading` バリアントで制御します。",
      },
    },
  },
};
