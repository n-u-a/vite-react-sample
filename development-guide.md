- [0.初期設定](#0初期設定)
  - [0.1.React-Router を使用した画面遷移をするように設定](#01react-router-を使用した画面遷移をするように設定)
  - [0.2.不要なファイルを削除](#02不要なファイルを削除)
- [1.概要](#1概要)
- [2.メニュー画面の作成](#2メニュー画面の作成)
  - [補足：Tailwind Variants について](#補足tailwind-variants-について)
- [3.ルーティングの設定](#3ルーティングの設定)
- [4.コンポーネントの分割](#4コンポーネントの分割)
  - [4.1.Header コンポーネントの作成](#41header-コンポーネントの作成)
  - [4.2.MenuItem コンポーネントの作成](#42menuitem-コンポーネントの作成)
  - [4.3.Menu コンポーネントの修正](#43menu-コンポーネントの修正)
    - [補足](#補足)
- [参考](#参考)

# 0.初期設定

## 0.1.React-Router を使用した画面遷移をするように設定

main.tsx を以下のように修正し、React-Router を使用した画面遷移をするように設定します。  
Menu コンポーネントは後述の[2.メニュー画面の作成](#2メニュー画面の作成)を参考に作成してください。

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

本ガイド上の実装では./src/App.css および./src/App.tsx は不要になるため削除します。

# 1.概要

以下の流れの実装ガイドを作成しています。

1. メニュー画面の作成
2. ルーティングの設定
3. コンポーネントの分割

# 2.メニュー画面の作成

./src/pages/menu に Menu.tsx を作成します。
また、`/maintenance`および`/status`というパスに対応する画面は現時点で存在しませんが後ほど追加します。

React に関する具体的な記法などは、下記リンク先のチュートリアル等を参考にしてください。日本語で分かりやすく書かれています。  
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
      <header className="flex justify-between items-center py-3">
        <h1 className="text-xl font-extrabold">メニュー</h1>
      </header>
      <nav>
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

# 3.ルーティングの設定

main.tsx を以下のように修正します。  
この設定により、`/menu`にアクセスされた場合は Menu コンポーネントの内容が表示されます。  
また、`/`にアクセスされた場合は`/menu`にリダイレクトされるようになります。

```diff
- createRoot(document.getElementById('root')!).render(
-   <StrictMode>
-     <App />
-   </StrictMode>,
- )
+ const router = createBrowserRouter([
+   {
+     path: "/",
+     element: <Navigate to="/menu" replace />,
+   },
+   {
+     path: "/menu",
+     element: <Menu />,
+   },
+ ]);
+
+ createRoot(document.getElementById("root")!).render(
+   <StrictMode>
+     <Provider store={store}>
+       <RouterProvider router={router} />
+     </Provider>
+   </StrictMode>
+ );
```

# 4.コンポーネントの分割

Menu コンポーネントを Header と MenuItem とで分割します。

参考：[なんとなくで component 分割をしない](https://zenn.dev/tsukunin/articles/a6dbabf811b7a3#%E3%81%AA%E3%82%93%E3%81%A8%E3%81%AA%E3%81%8F%E3%81%A7component%E5%88%86%E5%89%B2%E3%82%92%E3%81%97%E3%81%AA%E3%81%84)

## 4.1.Header コンポーネントの作成

ヘッダー部分はメニュー画面以外の画面でも共通して利用するため、Header コンポーネントを作成します。

```typescript
interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="flex justify-between items-center py-3">
      <h1 className="text-xl font-extrabold">{pageTitle}</h1>
    </header>
  );
};
```

## 4.2.MenuItem コンポーネントの作成

li 要素の記述が冗長であり、後々サイドバーでも利用するため MenuItem コンポーネントを作成して切り出します。

```typescript
interface MenuItemProps {
  pagePath: string;
  pageName: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ pagePath, pageName }) => {
  return (
    <>
      <li>
        <Link to={pagePath} className={menuOption()}>
          <span>{pageName}</span>
        </Link>
      </li>
    </>
  );
};

export default MenuItem;
```

## 4.3.Menu コンポーネントの修正

以下のようにして読み込むことでコンポーネントを分割前と同様の見た目になります。

```typescript
import Header from "../../components/header/Header";
import MenuItem from "../../components/listItem/menuItem";

const Menu: React.FC = () => {
  return (
    <>
      <nav>
        <Header pageTitle="メニュー" />

        <ul className="space-y-2 font-bold text-left">
          <MenuItem pagePath={"/maintenance"} pageName={"メンテナンス"} />
          <MenuItem pagePath={"/status"} pageName={"ステータス"} />
        </ul>
      </nav>
    </>
  );
};

export default Menu;
```

### 補足

Header や MenuItem コンポーネントの引数の型は、各コンポーネント内で`〇〇Props`として定義しています。

# 参考

[React hooks を基礎から理解する (useCallback 編+ React.memo)](https://qiita.com/seira/items/8a170cc950241a8fdb23)
