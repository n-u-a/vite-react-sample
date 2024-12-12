import "./output.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./states/store.ts";
import Menu from "./components/pages/menu/Menu.tsx";
import Maintenance from "./components/pages/maintenance/Maintenance.tsx";
import Search from "./components/pages/search/Search.tsx";
import { Page } from "./constants/PageConstants.ts";
import CommonError from "./components/pages/error/CommonError.tsx";
import Detail from "./components/pages/search/Detail.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to={Page.MENU.path()} replace />,
    },
    {
      path: Page.MENU.path(),
      element: <Menu />,
    },
    {
      path: Page.MAINTENANCE.path(),
      element: <Maintenance />,
    },
    {
      path: Page.SEARCH.path(),
      element: <Search />,
    },
    {
      path: Page.SEARCH_DETAIL.path(":productCode"),
      element: <Detail />,
    },
    {
      path: Page.ERROR.path(),
      element: <CommonError />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
  </StrictMode>
);
