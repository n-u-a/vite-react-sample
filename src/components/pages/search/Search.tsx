import Header from "@components/layouts/header/Header";
import Footer from "@components/layouts/footer/Footer";
import { SearchCondition } from "@apis/dto/SearchCondition";
import Accordion from "@components/uiParts/accordion/Accordion";
import { useSearch } from "@hooks/usecases/search/useSearch";
import SearchResultTable from "@components/usecases/search/table/SearchResultTable";
import SearchForm, { SearchFormInputs } from "@components/usecases/search/form/SearchForm";
import { Page } from "@constants/PageConstants";
import { useDispatch } from "react-redux";
import { setCondition } from "@states/reducers/status/SearchReducer";
import { ModalDialogProvider } from "@providers/ModalDialogProvider";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { condition, searchResults, isLoading, search } = useSearch();

  /**
   * 検索Formのsubmit時の処理。
   * @param data 検索条件
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
      <ModalDialogProvider>
        <Header pageTitle={Page.SEARCH.title} />
        <Accordion title="検索条件">
          <SearchForm onSubmit={onSubmit} isLoading={isLoading} condition={condition} />
        </Accordion>
        <SearchResultTable searchResults={searchResults} />
        <Footer />
      </ModalDialogProvider>
    </>
  );
};

export default Search;
