import { useState } from "react";
import { SearchResult } from "../../../../apis/dto/SearchResult";
import { subHeader } from "../../../../styles/CommonTv";
import { tableHeader, tableData } from "../../../../styles/TableTv";
import { slice } from "lodash";
import Pagenation from "../../../uiParts/pagenation/Pagenation";

export interface SearchResultTableProps {
  searchResults: Array<SearchResult>;
  isResultEmpty: boolean;
}

const SearchResultTable: React.FC<SearchResultTableProps> = ({ searchResults, isResultEmpty }) => {
  const [startItemPosition, setStartItemPosition] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const displayCount: number = 10;

  return (
    <>
      {isResultEmpty ? (
        <h1 className="text-gray-700 text-md font-bold text-left mb-2">該当するデータがありませんでした。</h1>
      ) : searchResults.length > 0 ? (
        <>
          <h1 className={subHeader()}>検索結果</h1>
          <Pagenation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setStartItemPosition={setStartItemPosition}
            itemsLength={searchResults.length}
            displayCount={displayCount}
          />
          <div className="relative shadow-md overflow-x-auto rounded-md ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-200">
                <tr>
                  <th scope="col" className={tableHeader()}>
                    商品コード
                  </th>
                  <th scope="col" className={tableHeader()}>
                    品番
                  </th>
                  <th scope="col" className={tableHeader()}>
                    充足状況
                  </th>
                </tr>
              </thead>
              <tbody>
                {slice(searchResults, startItemPosition, startItemPosition + displayCount).map((stockSearchResult) => (
                  <tr key={stockSearchResult.product_code} className="bg-white border-b hover:bg-gray-50">
                    {/* 商品コード */}
                    <td className={tableData({ link: false })}>{stockSearchResult.product_code}</td>
                    {/* 品番 */}
                    <td className={tableData({ link: false })}>{stockSearchResult.product_name}</td>
                    {/* 充足状況 */}
                    <td
                      className={tableData({
                        isNotice: stockSearchResult.sufficiency < 0,
                        format: "number",
                      })}
                    >
                      {stockSearchResult.sufficiency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagenation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setStartItemPosition={setStartItemPosition}
            itemsLength={searchResults.length}
            displayCount={displayCount}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchResultTable;
