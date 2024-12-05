export interface SearchResult {
  /**
   * 商品コード
   */
  product_code: string | null | undefined;

  /**
   * 品番
   */
  product_name: string | null | undefined;

  /**
   * 充足状況
   */
  sufficiency: number;

  /**
   * 数量管理対象外フラグ
   * (yamlではis_not_quantity_managementだがフラグはisを抜いたキャメルケースで返却されてしまうため、以下の変数名とする)
   */
  notQuantityManagement: boolean | null | undefined;

  /**
   * 商品区分
   */
  product_classification: number;
}
