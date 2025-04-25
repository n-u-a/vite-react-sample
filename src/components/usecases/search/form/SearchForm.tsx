import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { form, formErrorMessage, formCriteriaInputArea } from "@styles/FormTv";
import Button from "@components/uiParts/button/Button";
import FormCheckBoxInput from "@components/uiParts/input/FormCheckBoxInput";
import FormSelectInput from "@components/uiParts/input/FormSelectInput";
import FormTextInput from "@components/uiParts/input/FormTextInput";
import { z } from "zod";
import { SearchCondition } from "@apis/dto/SearchCondition";
import { Label, PlaceHolder } from "@constants/FormConstants";

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

// searchSchemaの定義をもとに型を作成
export type SearchFormInputs = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSubmit: (data: SearchFormInputs) => void;
  isWaiting: boolean;
  condition: SearchCondition | null;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isWaiting, condition }) => {
  // Formで使用するオブジェクトの取得
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      productCode: condition ? condition.product_code : "",
      productName: condition ? condition.product_name : "",
      productClassification: condition ? condition.product_classification : "",
      isShortStockOnly: condition ? condition.is_short_stock_only : false,
      validationCondition: "", // バリデーションのためのフィールドを初期化
    },
  });

  return (
    <form className={form()} onSubmit={handleSubmit(onSubmit)}>
      {errors.validationCondition && <p className={formErrorMessage()}>{errors.validationCondition.message}</p>}
      <div className={formCriteriaInputArea()}>
        <Controller
          name="productCode"
          control={control}
          render={({ field }) => (
            <FormTextInput
              {...field}
              label={Label.PRODUCT_CODE}
              placeholder={PlaceHolder.PRODUCT_CODE}
              error={errors.productCode?.message}
            />
          )}
        />
        <Controller
          name="productName"
          control={control}
          render={({ field }) => (
            <FormTextInput
              {...field}
              label={Label.PRODUCT_NAME}
              placeholder={PlaceHolder.PRODUCT_NAME}
              error={errors.productName?.message}
            />
          )}
        />
        <Controller
          name="productClassification"
          control={control}
          render={({ field }) => (
            <FormSelectInput
              {...field}
              options={[
                { id: "", value: "選択してください" },
                { id: "1", value: "製品" },
                { id: "2", value: "備品" },
              ]}
              label={Label.PRODUCT_CLASSIFICATION}
              error={errors.productClassification?.message}
            />
          )}
        />
        <Controller
          name="isShortStockOnly"
          control={control}
          render={({ field }) => (
            <FormCheckBoxInput {...field} label={Label.IS_SHORT_STOCK_ONLY} error={errors.isShortStockOnly?.message} />
          )}
        />
      </div>
      <Button isWaiting={isWaiting} name="検索" type="submit" />
    </form>
  );
};

export default SearchForm;
