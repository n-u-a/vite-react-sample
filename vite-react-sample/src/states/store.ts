import { combineReducers, configureStore } from "@reduxjs/toolkit";
import maintenanceReducer from "./reducers/maintenance/MaintenanceReducer";
import { enableMapSet } from "immer";
import searchReducer from "./reducers/status/SearchReducer";

// enableMapSet プラグインを有効にする
enableMapSet();

// 各リデューサーを初期化
const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
  search: searchReducer,
});

// RootState 型を定義
export type RootState = ReturnType<typeof rootReducer>;

// storeの初期化
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultM) =>
    getDefaultM({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload.timestamp"], // 例
        ignoredPaths: ["counter.entities"], // 例
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
