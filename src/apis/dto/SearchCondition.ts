export interface SearchCondition {
  /**
   * 商品コード
   */
  product_code: string | null | undefined;

  /**
   * 品番
   */
  product_name: string | null | undefined;

  /**
   * 商品区分 0:個体製品、1:備品
   */
  product_classification: string | null | undefined;

  /**
   * 不足製品フラグ 0:全て、1:不足製品のみ
   */
  is_short_stock_only: boolean;
}
