import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import { SearchCondition } from "../../../apis/dto/SearchCondition";
import Accordion from "../../uiParts/accordion/Accordion";
import { useSearch } from "../../../hooks/usecases/search/useSearch";
import SearchResultTable from "../../usecases/search/table/SearchResultTable";
import SearchForm, { SearchFormInputs } from "../../usecases/search/form/SearchForm";
import { Page } from "../../../constants/PageConstants";
import { useDispatch } from "react-redux";
import { setCondition } from "../../../states/reducers/status/SearchReducer";
import { DialogProvider } from "../../../providers/DialogProvider";

// TODO 6.検索画面の実装.mdを引き続き作成。useErrorNavigationの作成から。
// swrとreduxについての説明も別のファイルで簡単に記載したほうがよい

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { condition, searchResults, isWaiting, search } = useSearch();

  /**
   * 検索Formのsubmit時の処理。
   * @param data 検索条件
   * @returns
   */
  const onSubmit = (data: SearchFormInputs) => {
    const param: SearchCondition = {
      product_code: data.productCode,
      product_name: data.productName,
      product_classification: data.productClassification,
      is_short_stock_only: data.isShortStockOnly,
    };
    dispatch(setCondition(param)); // Reduxでconditionを更新
    search(); // 検索を実行
  };

  return (
    <>
      <DialogProvider>
        <Header pageTitle={Page.SEARCH.title} />
        <Accordion title="検索条件">
          <SearchForm onSubmit={onSubmit} isWaiting={isWaiting} condition={condition} />
        </Accordion>
        <SearchResultTable searchResults={searchResults} />
        <Footer />
      </DialogProvider>
    </>
  );
};

export default Search;
