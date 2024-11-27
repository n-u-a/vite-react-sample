- [0.初期設定](#0初期設定)
  - [0.1.React-Router を使用した画面遷移をするように設定](#01react-router-を使用した画面遷移をするように設定)
  - [0.2.不要なファイルを削除](#02不要なファイルを削除)
- [1.コンポーネント作成](#1コンポーネント作成)
  - [補足：Tailwind Variants について](#補足tailwind-variants-について)

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
具体的な記法などは、下記リンク先のチュートリアル等を参考にしてください。日本語で分かりやすく書かれています。  
React tutorial : [https://ja.react.dev/learn/your-first-component](https://ja.react.dev/learn/your-first-component)

なお、className に指定している関数は、Tailwind Variants を用いて定義されたものになります。  
Tailwind Variants に関する内容 は[補足：Tailwind Variants について](#補足tailwind-variants-について)に記載します。

```typescript
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { menuOption } from "../../styles/MenuTv";

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

## 補足：Tailwind Variants について

tailwind css はあらかじめ用意された class 名を組み合わせることで、(比較的)容易に CSS を実装することができる便利な CSS フレームワークですが、  
冗長な記載をすることが多く、スタイルを再利用しづらいという問題があります。

そこで、Tailwind Variants というライブラリを用いて、スタイルを関数として定義することでスタイルの再利用性や保守性を高めることができます。  
Tailwind Variants の具体的な使い方は下記リンク先にわかりやすく記載されています。  
参考記事：[Tailwind Variants に触れてみる](https://zenn.dev/yend724/articles/20230603-wgnqrgmj8kymzpev)
