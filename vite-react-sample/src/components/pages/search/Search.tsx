import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../states/store";
import { button } from "../../../styles/ButtonTv";
import { form, formErrorMessage, formCriteriaInputArea } from "../../../styles/FormTv";
import Header from "../../layouts/header/Header";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Footer from "../../layouts/footer/Footer";
import FormTextInput from "../../uiParts/input/FormTextInput";
import FormSelectInput, { FormSelectInputOption } from "../../uiParts/input/FormSelectInput";
import FormCheckBoxInput from "../../uiParts/input/FormCheckBoxInput";
import { useErrorNavigation } from "../../../hooks/useErrorNavigation";
import { SearchCondition } from "../../../apis/dto/SearchCondition";
import SearchConditionAccordion from "../../uiParts/accordion/SearchConditionAccordion";
import SearchResultTable from "../../usecases/search/table/SearchResultTable";
import { selectCondition, selectSearchResult, setCondition, setResult } from "../../../states/reducers/status/SearchReducer";
import { SearchResult } from "../../../apis/dto/SearchResult";
import { searchApi } from "../../../apis/SearchApiClient";
import { ResponseDto } from "../../../apis/dto/ResponseDto";

// フォーム定義
export const searchSchema = z
  .object({
    productCode: z.string().nullish(),
    productName: z.string().nullish(),
    productClassification: z.string().nullish(),
    isShortStockOnly: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
    validationCondition: z.string().nullable(), // 検索条件全体のバリデーションのためのフィールド
  })
  .refine(
    ({ productCode, productClassification, productName, isShortStockOnly }) => {
      return productCode?.trim() !== "" || productClassification?.trim() !== "" || productName?.trim() !== "" || isShortStockOnly;
    },
    {
      path: ["validationCondition"],
      message: "※ 検索条件は1項目以上入力してください。",
    }
  );

type SearchFormInputs = z.infer<typeof searchSchema>;

const productClassificationOptions: Array<FormSelectInputOption> = [
  { id: "", value: "選択してください" },
  { id: "1", value: "製品" },
  { id: "2", value: "備品" },
];

const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigateToErrorPage = useErrorNavigation();
  const [isWaiting, setIsWaiting] = useState(false);
  const [isResultEmpty, setIsResultEmpty] = useState(false);
  // Accordionの開閉に利用
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  // 検索条件(子画面に遷移して戻ってきた際にも表示できるようにReduxで検索条件を保存する)
  const condition = useSelector(selectCondition);
  // 検索結果(子画面に遷移して戻ってきた際にも表示できるようにReduxで検索結果を保存する)
  const searchResults: Array<SearchResult> = useSelector(selectSearchResult);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      productCode: condition.product_code,
      productName: condition.product_name,
      productClassification: condition.product_classification,
      isShortStockOnly: condition.is_short_stock_only,
      validationCondition: "", // バリデーションのためのフィールドを初期化
    },
  });

  // 検索処理
  const callSearchApi = async (param: SearchCondition) => {
    const response: ResponseDto<Array<SearchResult>> = await searchApi(param);

    setIsWaiting(false);
    if (response.isSuccess) {
      if (response.data.length == 0) {
        setIsResultEmpty(true);
      } else {
        setIsResultEmpty(false);
        dispatch(setResult(response.data));
      }
    } else {
      // エラー画面遷移処理
      navigateToErrorPage("エラー画面タイトル", "エラーメッセージ", "danger", response.error);
    }
  };

  const onSubmit = (data: SearchFormInputs) => {
    if (!isWaiting) {
      setIsWaiting(true);
    } else {
      return;
    }

    // APIパラメータ
    const param: SearchCondition = {
      product_code: data.productCode,
      product_name: data.productName,
      product_classification: data.productClassification,
      is_short_stock_only: data.isShortStockOnly,
    };
    dispatch(setCondition(param));
    callSearchApi(param);
  };

  return (
    <>
      <Header pageTitle="在庫情報検索" />

      <SearchConditionAccordion toggle={toggleAccordion} isOpen={isOpen} open={setIsOpen}>
        <form className={form()} onSubmit={handleSubmit(onSubmit)}>
          {errors.validationCondition && <p className={formErrorMessage()}>{errors.validationCondition.message}</p>}
          <div className={formCriteriaInputArea()}>
            <Controller
              name="productCode"
              control={control}
              render={({ field }) => (
                <FormTextInput {...field} label="商品コード" placeholder="商品コード" error={errors.productCode?.message} />
              )}
            />
            <Controller
              name="productName"
              control={control}
              render={({ field }) => (
                <FormTextInput {...field} label="商品名" placeholder="商品名" error={errors.productName?.message} />
              )}
            />
            {/* 商品区分・使用区分を横並びにするための空要素 */}
            <div></div>
            <Controller
              name="productClassification"
              control={control}
              render={({ field }) => (
                <FormSelectInput
                  {...field}
                  options={productClassificationOptions}
                  label="商品区分"
                  error={errors.productClassification?.message}
                />
              )}
            />
            <Controller
              name="isShortStockOnly"
              control={control}
              render={({ field }) => (
                <FormCheckBoxInput {...field} label="不足製品のみ" error={errors.isShortStockOnly?.message} />
              )}
            />
          </div>
          <button
            type="submit"
            className={button({
              color: "primary",
              size: "auto",
              isWaiting: isWaiting,
            })}
          >
            検索
          </button>
        </form>
      </SearchConditionAccordion>

      <SearchResultTable searchResults={searchResults} isResultEmpty={isResultEmpty} />

      <Footer />
    </>
  );
};

export default Search;
