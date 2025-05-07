if (import.meta.env.DEV) {
  // 開発中はAPIがモックされた値を返却するように設定
  const { worker } = await import("../tests/mocks/browser");
  await worker.start({
    onUnhandledRequest: "warn", // テスト同様に警告出力
  });
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./states/store.ts";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
  </StrictMode>
);
