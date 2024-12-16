# 目次

- [目次](#目次)
- [0. 前提条件](#0-前提条件)
- [1.プロジェクトを作成](#1プロジェクトを作成)
- [2.動作確認](#2動作確認)
- [3.ライブラリのインストール](#3ライブラリのインストール)
- [4.自動フォーマットの設定](#4自動フォーマットの設定)
  - [4.1.フォーマッタに Prettier を設定](#41フォーマッタに-prettier-を設定)
  - [4.2.各行に表示可能な桁数を設定。](#42各行に表示可能な桁数を設定)
- [5.tailwindCSS の設定](#5tailwindcss-の設定)
  - [5.1.package.json の修正](#51packagejson-の修正)
  - [5.2.tailwind.config.js 作成](#52tailwindconfigjs-作成)
  - [5.3.postcss.config.js 作成](#53postcssconfigjs-作成)
  - [5.4.main.tsx 修正](#54maintsx-修正)
- [6.vite.config.ts の設定](#6viteconfigts-の設定)
- [7.tsconfig.node.jsonの修正](#7tsconfignodejsonの修正)
- [8.tsconfig.jsonの修正](#8tsconfigjsonの修正)
- [9.index.cssの修正](#9indexcssの修正)
- [10.index.htmlの修正](#10indexhtmlの修正)
- [11.ディレクトリ構成について](#11ディレクトリ構成について)

# 0. 前提条件

バージョンが20.10.0以上のNode.jsがインストールされている必要があります。
[nvm-windows の導入と簡単な操作をやってみた](https://qiita.com/akipon0821/items/eaeffe79221cfcd4d258) などを参考にNode.jsをインストールしてください。

# 1.プロジェクトを作成

[1.プロジェクトを作成]: #1プロジェクトを作成

プロジェクトを作成したいディレクトリで`npm create vite@latest`を実行。

以下が表示されたら「y」を入力して Enter。

```shell
Need to install the following packages:
  create-vite@5.5.5
Ok to proceed? (y)
```

プロジェクト名、フレームワーク、言語をそれぞれ選択してください。
[任意のプロジェクト名]として入力した値のフォルダが作成され、プロジェクトが出力されます。

```shell
? Project name: » [任意のプロジェクト名]

? Select a framework: » - Use arrow-keys. Return to submit.(上下キーでReactを選択)
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Angular
    Others

? Select a variant: » - Use arrow-keys. Return to submit.(上下キーでTypeScript + SWCを選択)
    TypeScript
>   TypeScript + SWC
    JavaScript
    JavaScript + SWC
    Remix ↗
```

# 2.動作確認

`cd [任意のプロジェクト名]`で[1.プロジェクトを作成]で入力したプロジェクト名のフォルダに移動してください。

移動できたら、以下のコマンドを実行してください。

```shell
npm run install
npm run dev
```

`http://localhost:5173/`にアクセスするとサンプルページが作成されます。

# 3.ライブラリのインストール

本サンプルプロジェクトでは、以下のライブラリを使用してアプリケーションを実装する前提とします。
本実装時には適宜置き換えてください。
バージョンは本サンプル作成時の最新バージョンを採用しています。

| 用途         | ライブラリ名    | インストールコマンド                                          | 補足                                                                                                              |
| ------------ | --------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 状態管理     | Redux           | `npm i react-redux redux @types/react-redux @reduxjs/toolkit` | エコシステムの大きさから Redux を採用。学習コストを鑑みると jotai, Zustand が挙げられる。                         |
| 状態管理     | immer           | `npm i immer @types/immer`                                    | Redux をより柔軟に扱えるようにするために追加。必須ではありません。                                                |
| 画面遷移     | react-router    | `npm i react-router-dom @types/react-router-dom`              |                                                                                                                   |
| CSS 管理     | tailwind CSS    | `npm i tailwindcss tailwind-variants`                         |                                                                                                                   |
| CSS 管理     | postcss        | `npm i postcss autoprefixer`                                  |                                                                                                                   |
| フォーム制御 | react-hook-form | `npm i react-hook-form`                                       | Form の管理に使用。                                                                                               |
| フォーム制御 | Zod             | `npm i @hookform/resolvers zod`                               | Form のバリデーションに使用。                                                                                     |
| フォーム制御 | react-select    | `npm i react-select @types/react-select`                      | オートコンプリートセレクトボックスの実装に使用。                                                                  |
| その他       | concurrently    | `npm i concurrently`                                          | npm run dev 実行時に tailwind css 用の CSS ファイルが自動的に変更されるように package.json を変更するために使用。 |
| その他       | node            | `npm i @types/node`                                           | 実行時パスを取得するために使用。                                                                                  |
| その他       | axios           | `npm i axios @types/axios`                                    | API 呼び出しを行うために使用。                                                                                    |

# 4.自動フォーマットの設定

## 4.1.フォーマッタに Prettier を設定

以下の記事を参考に、ファイル保存時に Prettier を実行するように設定する。
https://zenn.dev/cordelia/articles/c5a8a68444e7d8

## 4.2.各行に表示可能な桁数を設定。

プロジェクトフォルダ直下に`.prettierrc`を作成。桁数は適宜調整。

```json
{
  "printWidth": 130
}
```

# 5.tailwindCSS の設定

## 5.1.package.json の修正

scripts を以下のように修正する。
これにより、npm run dev 実行時に tailwind css 用の CSS ファイルが自動的に変更されるようになる。

```json
"scripts": {
  "dev:tailwind": "npx tailwindcss -i ./src/index.css -o ./src/output.css --watch",
  "dev": "concurrently \"npm run dev:tailwind\" \"vite\"",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
},
```

## 5.2.tailwind.config.js 作成

プロジェクトフォルダ直下に`tailwind.config.js`を作成。

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 5.3.postcss.config.js 作成

プロジェクトフォルダ直下に`postcss.config.js`を作成。

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 5.4.main.tsx 修正

main.tsx に下記 import 文を追加。

```typescript
import "./output.css";
```

# 6.vite.config.ts の設定

vite.config.tsを以下のように修正する。  
ビルドしたdistパッケージを配置した際に、URLに直接アクセスしても正しくアクセスできるようにするため。

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "./index.html"),
      },
    },
  },
  base: "/",
});
```

# 7.tsconfig.node.jsonの修正

tsconfig.node.jsonを以下のように修正する。

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

# 8.tsconfig.jsonの修正

tsconfig.json を以下のように修正する。

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tailwind.config.js"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

# 9.index.cssの修正

index.css を以下のように修正する。  
なお、#root 要素に関する記載は任意。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

#root {
  max-width: 1680px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}
```

# 10.index.htmlの修正

output.cssを読み込むようにindex.htmlを修正する。

```diff
<!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <link href="./output.css" rel="stylesheet" />
     <title>Vite + React + TS</title>
   </head>
   <body>
     <div id="root"></div>
     <script type="module" src="/src/main.tsx"></script>
   </body>
 </html>
```

# 11.ディレクトリ構成について

下記資料を参考にしたディレクトリ構成になっています。

参考：[徹底解剖！医療業務システムのReactコンポーネント設計](https://speakerdeck.com/medley/deep-dive-into-react-component-design-for-medical-systems?slide=19)
