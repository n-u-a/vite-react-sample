/**
 * 各種Formで共通利用する値を定義します。
 */

/**
 * プレースホルダー
 */
export const PlaceHolder = {
  PRODUCT_CODE: "商品コード" as string,
  PRODUCT_NAME: "商品名" as string,
} as const;

/**
 * ラベル
 */
export const Label = {
  PRODUCT_CODE: "商品コード" as string,
  PRODUCT_NAME: "商品名" as string,
  PRODUCT_CLASSIFICATION: "商品区分" as string,
  IS_SHORT_STOCK_ONLY: "不足製品のみ" as string,
} as const;
