// tests/mocks/handlers.ts
import { http, HttpResponse } from "msw";

/**
 * 開発・テスト・Storybook 共通で使うモック API 一覧
 */
export const handlers = [
  /* 商品リスト取得例 */
  http.post("/api/search", () => {
    return HttpResponse.json(sample, { status: 200 });
  }),
];

const sample = [
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
];
