import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// 型定義
type SearchCondition = {
  id: string;
  name: string;
};

type StatusUpdateState = {
  condition: SearchCondition;
};

// 初期状態
const initialState: StatusUpdateState = {
  condition: {
    id: "",
    name: "",
  },
};

// 検索条件を管理するスライス
const statusUpdate = createSlice({
  name: "statusUpdate",
  initialState,
  reducers: {
    // 検索条件の更新
    setCondition: (state, action: PayloadAction<SearchCondition>) => {
      state.condition = action.payload;
    },
    // 検索条件のリセット
    resetCompositionMaintenanceCommonState: (state) => {
      state.condition = { id: "", name: "" };
    },
  },
});

// Actions
export const { setCondition, resetCompositionMaintenanceCommonState } = statusUpdate.actions;

// Selector
export const selectCondition = (state: RootState) => state.statusUpdate.condition;

// Reducer
export default statusUpdate.reducer;
