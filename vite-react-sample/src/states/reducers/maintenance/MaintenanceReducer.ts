import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// 型定義
export type QuantitiesState = Map<string, number>;

interface MaintenanceState {
  quantities: QuantitiesState;
  errorMessages: string[];
}

// 初期状態
const initialState: MaintenanceState = {
  quantities: new Map(),
  errorMessages: [],
};

// メンテナンス画面の状態管理用スライス
const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    // 数量の設定
    setQuantity: (state, action: PayloadAction<{ key: string; value: number }>) => {
      const { key, value } = action.payload;
      state.quantities.set(key, value);
    },
    // 数量の削除
    removeQuantity: (state, action: PayloadAction<string>) => {
      state.quantities.delete(action.payload);
    },
    // エラーメッセージの追加
    addErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages.push(action.payload);
    },
    // 状態のリセット
    resetMaintenanceState: () => initialState,
  },
});

// Actions
export const { setQuantity, removeQuantity, addErrorMessage, resetMaintenanceState } = maintenanceSlice.actions;

// Selectors
export const selectQuantities = (state: RootState) => state.maintenance.quantities;
export const selectErrorMessages = (state: RootState) => state.maintenance.errorMessages;

// Reducer
export default maintenanceSlice.reducer;
