import { useSelector } from "react-redux";
import useSWR from "swr";
import { SearchCondition } from "@apis/dto/SearchCondition";
import { searchApi } from "@apis/SearchApiClient";
import { selectCondition } from "@states/reducers/status/SearchReducer";
import { useErrorNavigation } from "@hooks/useErrorNavigation";
import { SearchResult } from "@apis/dto/SearchResult";

const fetcher = async (param: SearchCondition): Promise<SearchResult[]> => {
  const response = await searchApi(param);
  if (!response.isSuccess) {
    throw new Error(response.error || "Unknown error");
  }
  return response.data;
};

export const useSearch = () => {
  const navigateToErrorPage = useErrorNavigation();

  // 検索条件(子画面に遷移して戻ってきた際にも表示できるようにReduxで検索条件を保存する)
  const condition = useSelector(selectCondition);

  const {
    data: searchResults,
    error,
    isLoading,
    mutate,
  } = useSWR(condition ? ["search", condition] : null, ([, param]) => fetcher(param), {
    revalidateOnFocus: false, // フォーカス時に再フェッチを行わない
    revalidateOnReconnect: false, // 再接続時に再フェッチを行わない
    errorRetryCount: 0, // エラー時の自動再試行を行わない
    onError: (err) => {
      // fetcherでエラーが発生した場合の処理
      navigateToErrorPage({ title: "エラー", message: "検索中にエラーが発生しました。", detail: err.message });
    },
  });

  return {
    condition,
    searchResults,
    isWaiting: isLoading, // SWRのisLoadingを使用
    error,
    search: mutate,
  };
};
