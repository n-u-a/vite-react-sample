import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@states/store";
import { setQuantity } from "@states/reducers/maintenance/MaintenanceReducer";

// Middleware 型のジェネリックパラメータを指定
const MapMiddleware: Middleware<{}, RootState> = () => (next) => (action) => {
  if (setQuantity.match(action)) {
    const typedAction = action as ReturnType<typeof setQuantity>;
    const payload = Object.entries(typedAction.payload).map(([key, value]) => [key, value]);
    typedAction.payload = Object.fromEntries(payload);
  }
  return next(action);
};

export default MapMiddleware;
