import type { Meta, StoryObj } from "@storybook/react";
import Search from "./Search";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { http, HttpResponse, delay } from "msw";
import Accordion from "@components/uiParts/accordion/Accordion";
import ConfirmationModal from "@components/uiParts/modal/ConfirmationModal";
import SearchForm from "@components/usecases/search/form/SearchForm";
import { Link } from "react-router-dom";
import Button from "@components/uiParts/button/Button";

/**
 * 商品検索画面コンポーネントのStory.
 */
type Story = StoryObj<typeof Search>;

export default {
  title: "Pages/Search",
  component: Search,
  parameters: {},
} satisfies Meta<typeof Search>;

export const Default: Story = {
  name: "Default",
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
};

/**
 * 検索結果返却待ち状態の商品検索画面
 */
export const Loading: StoryObj<typeof Search> = {
  name: "Loading",
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
    msw: {
      handlers: [
        http.post("/api/search", async () => {
          // 無限ローディングを再現
          await delay("infinite");
          return HttpResponse.json([]);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 検索条件を入力
    await userEvent.click(canvas.getByLabelText(/不足製品のみ/));
    // 検索ボタンをクリック
    const btn = canvas.getByRole("button", { name: "検索" });
    await userEvent.click(btn);
  },
};

/**
 * 検索結果が表示された状態の商品検索画面。
 */
export const WithResults: Story = {
  name: "With Results",
  parameters: {
    layout: "fullscreen",
    docs: {
      inlineStories: false,
      story: {
        autoplay: true,
        height: 860,
        inline: false,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 検索条件を入力
    await userEvent.click(canvas.getByLabelText(/不足製品のみ/));
    // 検索ボタンをクリック
    const btn = canvas.getByRole("button", { name: "検索" });
    await userEvent.click(btn);

    // 結果行が描画されるまで待機して検証
    await waitFor(() => {
      const rows = canvas.getAllByRole("row");
      // ヘッダー行 + データ行で4行になっている想定
      expect(rows).toHaveLength(4);
    });
  },
};

/**
 * 検索条件を入力せずに検索ボタンを押下した場合のバリデーションエラーメッセージ表示。
 */
export const ValidationError: Story = {
  name: "ValidationError",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 検索条件を入力せずに検索ボタンをクリック
    const btn = canvas.getByRole("button", { name: "検索" });
    await userEvent.click(btn);
    await expect(canvas.getByText("※ 検索条件は1項目以上入力してください。")).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/* UI パーツ単体 Story                                                */
/* ------------------------------------------------------------------ */

/**
 * アコーディオン
 */
export const AccordionOnly: Story = {
  name: "Accordion Only",
  render: () => (
    <Accordion title="検索条件">
      <SearchForm
        onSubmit={() => {}}
        isLoading={false}
        condition={{
          product_code: "",
          product_name: "",
          product_classification: "",
          is_short_stock_only: false,
        }}
      />
    </Accordion>
  ),
};

/**
 * 検索ボタン
 */
export const SearchButtonOnly: Story = {
  name: "SearchButtonOnly",
  render: () => <Button name="検索" />,
};
/**
 * 削除ボタン
 */
export const DeleteButtonOnly: Story = {
  name: "DeleteButtonOnly",
  render: () => <Button name="削除" color="secondary" />,
};

/**
 * 商品コード
 */
export const ProductCodeOnly: Story = {
  name: "ProductCodeOnly",
  render: () => (
    <Link
      to={""}
      state={{ productName: "商品名" }}
      className="font-medium text-blue-400 whitespace-nowrap hover:text-blue-600 underline underline-offset-2"
    >
      {"A001"}
    </Link>
  ),
};

/**
 * 削除ダイアログ
 */
export const SearchConfirmationModalOnly: Story = {
  name: "SearchConfirmationModalOnly",
  parameters: {
    layout: "fullscreen",
    docs: {
      inlineStories: false,
      story: {
        height: 230,
        inline: false,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ConfirmationModal
      isWaiting={false}
      isShow={true}
      title="削除します。"
      message="本当に削除してよろしいですか？"
      onCancel={() => {}}
      onConfirm={() => {}}
      confirmButtonMessage="はい"
      cancelButtonMessage="いいえ"
    />
  ),
};
