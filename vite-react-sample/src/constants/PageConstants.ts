interface PageTitleAndPath<T extends unknown[]> {
  /**
   * 画面名
   */
  title: string;
  /**
   * パス
   */
  path: (...params: T) => string;
}

/**
 * 画面
 */
export const Page = {
  MENU: { title: "メニュー画面", path: () => "/menu" } as PageTitleAndPath<[]>,
  SEARCH: { title: "検索画面", path: () => "/search" } as PageTitleAndPath<[]>,
  SEARCH_DETAIL: {
    title: "詳細画面",
    path: (param1: string) => `/search/detail/${param1}`,
  } as PageTitleAndPath<[string]>,
  MAINTENANCE: { title: "メンテナンス画面", path: () => "/maintenance" } as PageTitleAndPath<[]>,
  ERROR: { title: "エラー画面", path: () => "/error" } as PageTitleAndPath<[]>,
} as const;
