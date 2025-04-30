import type { Meta, StoryObj } from "@storybook/react";
import Search from "./Search";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { http, HttpResponse, delay } from "msw";
import Accordion from "@components/uiParts/accordion/Accordion";
import ConfirmationModal from "@components/uiParts/modal/ConfirmationModal";
import SearchForm from "@components/usecases/search/form/SearchForm";
import { Link } from "react-router-dom";
import Button from "@components/uiParts/button/Button";
import SearchResultTable from "@components/usecases/search/table/SearchResultTable";
import { ModalDialogProvider } from "@providers/ModalDialogProvider";

/**
 * 商品検索画面コンポーネントのStory.
 * mdxで表示するため、各StoryにinlineStories: falseを設定する。
 */
type Story = StoryObj<typeof Search>;

export default {
  tags: ["!docs"],
  title: "Pages/Search",
  component: Search,
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
} satisfies Meta<typeof Search>;

export const Default: Story = {
  name: "Default",
};

/**
 * 検索結果返却待ち状態の商品検索画面
 */
export const Loading: StoryObj<typeof Search> = {
  name: "Loading",
  parameters: {
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
    docs: {
      story: {
        height: 860,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 検索条件を入力
    await userEvent.click(canvas.getByLabelText(/不足製品のみ/));
    // 検索ボタンをクリック
    await userEvent.click(canvas.getByRole("button", { name: "検索" }));

    // 結果行が描画されるまで待機して検証
    await waitFor(() => {
      const rows = canvas.getAllByRole("row");
      // ヘッダー行 + データ行で4行になっている想定
      expect(rows).toHaveLength(4);
    });
  },
};

/**
 * 削除ボタンを押下した状態の商品検索画面。
 */
export const Delete: Story = {
  name: "Delete",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ① 検索条件を入力
    await userEvent.click(canvas.getByLabelText(/不足製品のみ/));

    // ② 検索ボタンをクリック
    const searchBtn = canvas.getByRole("button", { name: "検索" });
    await userEvent.click(searchBtn);

    // ③ 結果行が描画されるまで待機
    await canvas.findAllByRole("row");

    // ④ 最初の「削除」ボタンを取得してクリック
    const deleteButtons = await canvas.findAllByRole("button", { name: "削除" });
    await userEvent.click(deleteButtons[0]);

    // ⑤ ダイアログが開いたことを確認（タイトル or メッセージで判定）
    await expect(canvas.getByText("削除します。")).toBeInTheDocument();
  },
};
/**
 * 検索条件を入力せずに検索ボタンを押下した場合のバリデーションエラーメッセージ表示。
 */
export const ValidationError: Story = {
  name: "ValidationError",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 検索条件を入力せずに検索ボタンをクリック
    const btn = canvas.getByRole("button", { name: "検索" });
    await userEvent.click(btn);
    await expect(canvas.getByText("※ 検索条件は1項目以上入力してください。")).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------------ */
/* UI パーツ単体 Story(項目一覧表示用)                                  */
/* ------------------------------------------------------------------ */

/**
 * アコーディオン
 */
export const AccordionOnly: Story = {
  name: "Accordion Only",
  parameters: {
    docs: {
      story: {
        height: 350,
      },
    },
  },
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
  parameters: {
    docs: {
      story: {
        height: 90,
      },
    },
  },
  render: () => <Button name="検索" />,
};

/**
 * 削除ボタン
 */
export const DeleteButtonOnly: Story = {
  name: "DeleteButtonOnly",
  parameters: {
    docs: {
      story: {
        height: 90,
      },
    },
  },
  render: () => <Button name="削除" color="secondary" />,
};

/**
 * 商品コード
 */
export const ProductCodeOnly: Story = {
  name: "ProductCodeOnly",
  parameters: {
    docs: {
      story: {
        height: 60,
      },
    },
  },
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
 * 検索結果表示欄
 */
export const SearchResultTableOnly: Story = {
  name: "SearchResultTableOnly",
  render: () => (
    <SearchResultTable
      searchResults={[
        {
          product_code: "A001",
          product_name: "品番1",
          count: 100,
          product_classification: 0,
        },
        {
          product_code: "A002",
          product_name: "品番2",
          count: 50,
          product_classification: 0,
        },
        {
          product_code: "A003",
          product_name: "品番3",
          count: 75,
          product_classification: 1,
        },
      ]}
    />
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      inlineStories: false,
      story: {
        autoplay: true,
        height: 440,
        inline: false,
      },
    },
  },
  decorators: [
    (Story) => (
      <ModalDialogProvider>
        <Story />
      </ModalDialogProvider>
    ),
  ],
};

/**
 * 削除ダイアログ
 */
export const SearchConfirmationModalOnly: Story = {
  name: "SearchConfirmationModalOnly",
  parameters: {
    docs: {
      story: {
        height: 270,
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

/**
 * 削除ダイアログ はいボタン
 */
export const PositiveButtonOnly: Story = {
  name: "PositiveButtonOnly",
  parameters: {
    docs: {
      story: {
        height: 90,
      },
    },
  },
  render: () => <Button name="はい" />,
};
