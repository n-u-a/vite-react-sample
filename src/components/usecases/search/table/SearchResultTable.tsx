import { SearchResult } from "@apis/dto/SearchResult";
import GenericTable, { ColumnDefinition } from "@components/uiParts/table/GenericTable";
import NoResultMessage from "@components/uiParts/message/NoResultMessage";
import { Link } from "react-router-dom";
import { Page } from "@constants/PageConstants";
import { tableButton } from "@styles/ButtonTv";
import { isEmpty } from "@utils/utils";
import { useDialog } from "@hooks/useDialog";

export interface SearchResultTableProps {
  searchResults: Array<SearchResult> | undefined;
}

const SearchResultTable: React.FC<SearchResultTableProps> = ({ searchResults }) => {
  const { closeDialog, openConfirmationDialog } = useDialog();
  const columns: ColumnDefinition<SearchResult>[] = [
    {
      header: "商品コード",
      accessor: (item: SearchResult) => (
        <Link to={Page.SEARCH_DETAIL.path(item.product_code)} state={{ productName: item.product_name }}>
          {item.product_code}
        </Link>
      ),
      isLink: true,
    },
    {
      header: "商品名",
      accessor: (item: SearchResult) => item.product_name,
    },
    {
      header: "数量",
      accessor: (item: SearchResult) => item.count,
      format: "number",
    },
    {
      header: "削除",
      accessor: () => (
        <button
          className={tableButton({ color: "secondary", size: "small" })}
          onClick={() => {
            openConfirmationDialog({
              title: "削除します。",
              message: "本当に削除してよろしいですか？",
              onConfirm: () => {
                alert("削除しました！");
                closeDialog();
              },
            });
          }}
        >
          削除
        </button>
      ),
      format: "button",
    },
  ];

  return (
    <>
      {isEmpty(searchResults) ? (
        ""
      ) : searchResults!.length <= 0 ? (
        <NoResultMessage message="条件に該当するデータがありませんでした。" />
      ) : (
        <GenericTable<SearchResult> title="検索結果" data={searchResults!} columns={columns} />
      )}
    </>
  );
};

export default SearchResultTable;
