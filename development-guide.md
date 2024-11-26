- [0.初期設定](#0初期設定)
  - [0.1.React-Router を使用した画面遷移をするように設定](#01react-router-を使用した画面遷移をするように設定)
  - [0.2.不要なファイルを削除](#02不要なファイルを削除)
- [1.コンポーネント作成](#1コンポーネント作成)

# 0.初期設定

## 0.1.React-Router を使用した画面遷移をするように設定

main.tsx を以下のように修正し、React-Router を使用した画面遷移をするように設定します。  
Menu コンポーネントは後述の[1.コンポーネント作成](#1コンポーネント作成)を参考に作成してください。

```typescript
import "./output.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Menu from "./pages/menu/Menu";
import { Provider } from "react-redux";
import { store } from "./states/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/menu" replace />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
```

## 0.2.不要なファイルを削除

./src/App.css および./src/App.tsx は不要なため削除します。

# 1.コンポーネント作成

./src/pages/menu に Menu.tsx を作成します。

```typescript
import { Link } from "react-router-dom";
import { menuOption } from "../../styles/HeaderTv";
import Header from "../../components/header/Header";

const Menu: React.FC = () => {
  return (
    <>
      <nav>
        <Header pageTitle="メニュー" />

        <ul className="space-y-2 font-bold text-left">
          <li>
            <Link to={`/maintenance`} className={menuOption()}>
              <span>メンテナンス</span>
            </Link>
          </li>
          <li>
            <Link to={`/status`} className={menuOption()}>
              <span>ステータス</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
```
