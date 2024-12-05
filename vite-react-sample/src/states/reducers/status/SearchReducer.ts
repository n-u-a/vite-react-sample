import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SearchResult } from "../../../apis/dto/SearchResult";
import { SearchCondition } from "../../../apis/dto/SearchCondition";

type SearchState = {
  condition: SearchCondition;
  result: Array<SearchResult>;
};

// 初期状態
const initialState: SearchState = {
  condition: {
    product_code: "",
    product_name: "",
    product_classification: "",
    is_short_stock_only: false,
  },
  result: [] as Array<SearchResult>,
};

// 検索条件を管理するスライス
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    // 検索条件の更新
    setCondition: (state, action: PayloadAction<SearchCondition>) => {
      state.condition = action.payload;
    },
    // 検索結果の更新
    setResult: (state, action: PayloadAction<Array<SearchResult>>) => {
      state.result = action.payload;
    },
    // 検索条件のリセット
    resetCondition: (state) => {
      state.condition = initialState.condition;
    },
    // 検索結果のリセット
    resetResult: (state) => {
      state.result = initialState.result;
    },
  },
});

// Actions
export const { setCondition, setResult, resetCondition, resetResult } = search.actions;

// Selector
export const selectCondition = (state: RootState) => state.search.condition;
export const selectSearchResult = (state: RootState) => state.search.result;

// Reducer
export default search.reducer;
