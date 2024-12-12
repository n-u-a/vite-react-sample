import { useEffect } from "react";
import { pagenationNumber, pagenation, pagenationCount } from "../../../styles/TableTv";

export interface PagenationProps {
  setStartItemPosition: (startPosition: number) => void;
  setPageNumber: (pageNumber: number) => void;
  pageNumber: number;
  itemsLength: number;
  displayCount: number;
}

/**
 * 検索結果をページングするためのコンポーネント。
 *
 * @param setStartItemPosition 検索結果として表示するArrayの開始位置をセットする関数
 * @param setPageNumber 検索結果として表示するページ番号をセットする関数
 * @param pageNumber ページ番号
 * @param itemsLength 検索結果リストの件数
 * @param displayCount 検索結果として表示する件数
 * @returns Pagenation
 */
const Pagenation: React.FC<PagenationProps> = ({
  setStartItemPosition,
  setPageNumber,
  pageNumber,
  itemsLength,
  displayCount,
}) => {
  useEffect(() => {
    setPageNumber(0);
    setStartItemPosition(0);
  }, [itemsLength]);

  /**
   * ページ番号が選択された際の処理
   *
   * @param event
   */
  const onPageSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    setPageNumber(Number(event.currentTarget.textContent) - 1);
    setStartItemPosition((Number(event.currentTarget.textContent) - 1) * displayCount);
  };

  /**
   * 「前へ」がクリックされた際の処理
   */
  const onClickPrevious = () => {
    var startPosition: number = Number(pageNumber - 1) * displayCount;
    if (startPosition >= 0) {
      setStartItemPosition(startPosition);
      setPageNumber(pageNumber - 1);
    }
  };

  /**
   * 「次へ」がクリックされた際の処理
   */
  const onClickNext = () => {
    const totalPages = Math.trunc((itemsLength / displayCount) as number) + (itemsLength % displayCount == 0 ? -1 : 0);
    if (pageNumber < totalPages) {
      var startPosition: number = Number(pageNumber + 1) * displayCount;
      setStartItemPosition(startPosition);
      setPageNumber(pageNumber + 1);
    }
  };

  const totalPages = Math.trunc((itemsLength / displayCount) as number) + (itemsLength % displayCount == 0 ? 0 : 1);

  /**
   * ページ番号の省略部分を返却する。
   * @param key リストアイテムのキー名
   * @returns ページ番号の省略部分を
   */
  const ellipsisListItem = (key: string) => {
    return (
      <li key={key}>
        <span className={pagenationNumber({ selected: false })}>...</span>
      </li>
    );
  };
  /**
   * ページ番号を返却する。
   * @param key リストアイテムのキー名
   * @param selected 選択状態フラグ
   * @param displayNumber 表示するページ番号
   * @returns ページ番号
   */
  const listItem = (key: number, selected: boolean, displayNumber: number) => {
    return (
      <li key={key} onClick={onPageSelect}>
        <span className={pagenationNumber({ selected: selected })}>{displayNumber}</span>
      </li>
    );
  };

  /**
   * 動的なページ範囲を表示するためのロジック
   */
  const renderPageNumbers = () => {
    const pageLinks = [];
    // 省略記号後の中間部分には現在のページから2ページ前までを表示
    const startPage = Math.max(0, pageNumber - 2);
    // 省略記号前の中間部分には現在のページから２ページ後までを表示
    const endPage = Math.min(totalPages - 1, pageNumber + 2);

    if (startPage > 0) {
      // 最初のページを追加
      pageLinks.push(listItem(0, pageNumber === 0, 1));
      if (startPage > 1) {
        // 省略記号
        pageLinks.push(ellipsisListItem("start-ellipsis"));
      }
    }

    // 中央のページ範囲を追加
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(listItem(i, pageNumber === i, i + 1));
    }

    // 最後のページを追加
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        // 省略記号
        pageLinks.push(ellipsisListItem("end-ellipsis"));
      }
      pageLinks.push(listItem(totalPages - 1, pageNumber === totalPages - 1, totalPages));
    }

    return pageLinks;
  };

  return (
    <>
      <nav aria-label="Page navigation" className="my-4 flex justify-between">
        <div>
          <span className="text-sm font-normal text-gray-500 md:mb-0 w-full md:inline md:w-auto">
            <span className={pagenationCount()}>{itemsLength}</span>件中
            <span className={pagenationCount()}>
              {Number(pageNumber) * displayCount + 1}-
              {Number(pageNumber + 1) * displayCount >= itemsLength ? itemsLength : Number(pageNumber + 1) * displayCount}
            </span>
            件を表示中
          </span>
        </div>
        <div>
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <span className={pagenation({ type: "previous", limit: 1 > pageNumber })} onClick={onClickPrevious}>
                前へ
              </span>
            </li>

            {/* ページ番号 */}
            {renderPageNumbers()}

            <li>
              <span className={pagenation({ type: "next", limit: pageNumber >= totalPages - 1 })} onClick={onClickNext}>
                次へ
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Pagenation;
