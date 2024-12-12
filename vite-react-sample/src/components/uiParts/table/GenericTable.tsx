import { useState } from "react";
import { slice } from "lodash";
import Pagenation from "../pagenation/Pagenation";
import { subHeader } from "../../../styles/CommonTv";
import { tableData, tableHeader } from "../../../styles/TableTv";

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
   * 1ページに表示する上限値
   */
  displayCount?: number;
  /**
   * テーブルのスタイルを上書きして指定する場合のクラス名(オプション)
   */
  tableClassName?: string;
  /**
   * テーブルヘッダーのスタイルを上書きして指定する場合のクラス名(オプション)
   */
  headerClassName?: string;
  /**
   * テーブルボディのスタイルを上書きして指定する場合のクラス名(オプション)
   */
  bodyClassName?: string;
}

const GenericTable = <T,>({
  title,
  data,
  columns,
  displayCount = 10,
  tableClassName = "w-full table-auto text-sm text-left rtl:text-right text-gray-500 relative shadow-md overflow-x-auto rounded-md",
  headerClassName = "text-xs text-gray-700 bg-gray-200",
  bodyClassName = "bg-white border-b hover:bg-gray-50",
}: GenericTableProps<T>) => {
  const [startItemPosition, setStartItemPosition] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <>
      {data.length > 0 && (
        <>
          {title && <h2 className={subHeader()}>{title}</h2>}
          <Pagenation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setStartItemPosition={setStartItemPosition}
            itemsLength={data.length}
            displayCount={displayCount}
          />

          <table className={tableClassName}>
            <thead className={headerClassName}>
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className={tableHeader({ format: col.format })}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice(data, startItemPosition, startItemPosition + displayCount).map((item, rowIndex) => (
                <tr key={rowIndex} className={bodyClassName}>
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
