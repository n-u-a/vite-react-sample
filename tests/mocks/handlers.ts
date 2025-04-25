// tests/mocks/handlers.ts
import { rest } from "msw";

/**
 * 開発・テスト・Storybook 共通で使うモック API 一覧
 */
export const handlers = [
  /* 商品リスト取得例 */
  rest.get("/api/products", (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { code: "001", name: "Coffee" },
        { code: "002", name: "Tea" },
      ])
    )
  ),

  /* 商品詳細 – 失敗パターン例 */
  rest.get("/api/products/:code", (_req, res, ctx) => res(ctx.status(500), ctx.json({ message: "Internal Server Error" }))),
];
