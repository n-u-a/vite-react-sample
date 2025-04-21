import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { Page } from "@constants/PageConstants.ts";

/* ───────── ページを動的 import ───────── */
const Menu = lazy(() => import("@components/pages/menu/Menu"));
const Maintenance = lazy(() => import("@components/pages/maintenance/Maintenance"));
const Search = lazy(() => import("@components/pages/search/Search"));
const Detail = lazy(() => import("@components/pages/search/Detail"));
const CommonError = lazy(() => import("@components/pages/error/CommonError"));

/* ───────── ルーター定義 ───────── */
export const router = createBrowserRouter(
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
    /* v7 互換フラグ */
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
