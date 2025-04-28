import { useState } from "react";
import { slice } from "lodash";
import Pagenation from "@components/uiParts/pagenation/Pagenation";
import { header1 } from "@styles/CommonTv";
import { table, tableData, tableHeader, tableHeaderRow, tableRow } from "@styles/TableTv";

/**
 * カラム定義
 */
export interface ColumnDefinition<T> {
  /**
   * 列名
   */
  header: string;
  /**
   * 項目値
   * @param item trに表示するオブジェクト
   * @returns tdに表示するReactNode
   */
  accessor: (item: T) => React.ReactNode;
  /**
   * tableDataがリンク項目かどうかを表すフラグ
   */
  isLink?: boolean;
  /**
   * tableDataのフォーマット
   */
  format?: "number" | "button" | "input";
  /**
   * tdクリック時の関数(オプション)
   */
  onTableDataClick?: (item: T, columnIndex: number) => void;
}

export interface GenericTableProps<T> {
  /**
   * テーブルのタイトル(オプション)
   */
  title?: string;
  /**
   * tdのリスト
   */
  data: T[];
  /**
   * カラム定義
   */
  columns: ColumnDefinition<T>[];
  /**
   * 1ページに表示する上限値(オプション)
   */
  displayCount?: number;
}

const GenericTable = <T,>({ title, data, columns, displayCount = 10 }: GenericTableProps<T>) => {
  const [startItemPosition, setStartItemPosition] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <>
      {data.length > 0 && (
        <>
          {title && <h1 className={header1()}>{title}</h1>}
          <Pagenation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setStartItemPosition={setStartItemPosition}
            itemsLength={data.length}
            displayCount={displayCount}
          />

          <div className="overflow-hidden rounded border border-gray-100 shadow-md">
            <table className={table()}>
              <thead className={tableHeader()}>
                <tr role="row">
                  {columns.map((col, index) => (
                    <th key={index} className={tableHeaderRow({ format: col.format })}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice(data, startItemPosition, startItemPosition + displayCount).map((item, rowIndex) => (
                  <tr
                    role="row"
                    key={rowIndex}
                    className={tableRow({
                      isLastItem: slice(data, startItemPosition, startItemPosition + displayCount).length == rowIndex + 1,
                    })}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={tableData({ link: col.isLink, format: col.format })}
                        onClick={(e) => {
                          e.stopPropagation(); // 親要素へのクリックイベントの伝播を抑制
                          col.onTableDataClick && col.onTableDataClick(item, colIndex);
                        }}
                      >
                        {col.accessor(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagenation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setStartItemPosition={setStartItemPosition}
            itemsLength={data.length}
            displayCount={displayCount}
          />
        </>
      )}
    </>
  );
};

export default GenericTable;
