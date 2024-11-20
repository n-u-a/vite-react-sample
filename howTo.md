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

| 用途         | ライブラリ名    | インストールコマンド                             | 補足                                                                                                            |
| ------------ | --------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| 状態管理     | Redux           | `npm i react-redux redux @types/react-redux`     |                                                                                                                 |
| 画面遷移     | react-router    | `npm i react-router-dom @types/react-router-dom` |                                                                                                                 |
| CSS 管理     | tailwind CSS    | `npm i tailwindcss tailwind-variants`            |                                                                                                                 |
| CSS 管理     | post css        | `npm i postcss autoprefixer`                     |                                                                                                                 |
| フォーム制御 | react-hook-form | `npm i react-hook-form`                          |                                                                                                                 |
| フォーム制御 | Zod             | `npm i @hookform/resolvers zod`                  | From のバリデーションに使用                                                                                     |
| フォーム制御 | react-select    | `npm i react-select @types/react-select`         | オートコンプリートセレクトボックスの実装に使用                                                                  |
| その他       | concurrently    | `npm i concurrently`                             | npm run dev 実行時に tailwind css 用の CSS ファイルが自動的に変更されるように package.json を修正するために使用 |
| その他       | node            | `npm i @types/node`                              | 実行時パスを取得するために使用                                                                                  |

# 4.package.json の修正

scripts を以下のように編集します。
これにより、npm run dev 実行時に tailwind css 用の CSS ファイルが自動的に変更されるようになります。

```json
  "scripts": {
    "dev:tailwind": "npx tailwindcss -i ./src/index.css -o ./src/output.css --watch",
    "dev": "concurrently \"npm run dev:tailwind\" \"vite\"",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

# 5.tailwindCSS の設定

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

プロジェクトフォルダ直下に`postcss.config.js`を作成。

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

# 6.vite.config.ts の設定

vite.config.ts を以下のように修正する。

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

# 7.tsconfig.node.json の修正

tsconfig.node.json を以下のように修正する。

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
