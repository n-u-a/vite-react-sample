import { combineReducers, configureStore } from "@reduxjs/toolkit";
import maintenanceReducer from "./reducers/maintenance/MaintenanceReducer";
import { enableMapSet } from "immer";
import MapMiddleware from "./middlewares/MapMiddleware";
import statusUpdateReducer from "./reducers/status/StatusReducer";

// enableMapSet プラグインを有効にする
enableMapSet();

// 各リデューサーを初期化
const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
  statusUpdate: statusUpdateReducer,
});

// RootState 型を定義
export type RootState = ReturnType<typeof rootReducer>;

// storeの初期化
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(MapMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
