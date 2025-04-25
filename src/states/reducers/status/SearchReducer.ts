import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@states/store";
import { SearchCondition } from "@apis/dto/SearchCondition";

type SearchState = {
  condition: SearchCondition | null;
};

// 初期状態
const initialState: SearchState = {
  condition: null,
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
    // 検索条件のリセット
    resetCondition: (state) => {
      state.condition = null;
    },
  },
});

// Actions
export const { setCondition, resetCondition } = search.actions;

// Selector
export const selectCondition = (state: RootState) => state.search.condition;

// Reducer
export default search.reducer;
