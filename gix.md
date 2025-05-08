# npm → pnpmについて
npm環境と比較して、ビルド 2-3 倍高速＋ディスク容量 60-80 % 削減。
## 1. pnpm を有効化
```
# Node 16.19+ なら Corepack が標準搭載
corepack enable                       # npm を触らずに pnpm を管理
corepack prepare pnpm@latest --activate
pnpm --version                        # 動作確認
```

## 2. 既存 lock ファイルを取り込む
1. node_modules を削除
2. lock ファイルを変換 `pnpm import`
3. npm の lockfile を削除 `rm package-lock.json`
4. 依存をインストール `pnpm install`

# テストについて

## 1. テストランナー＆テストユーティリティの導入

`pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event`

|           パッケージ            |                                       機能・役割                                       |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **vitest**                      | 高速で軽量なテストランナー／フレームワーク。Jestに似たAPIでユニット・統合テストを実行  |
| **@testing-library/react**      | Reactコンポーネントの振る舞いをユーザー視点で検証するためのDOMクエリ＆ユーティリティ群 |
| **@testing-library/jest-dom**   | よく使うDOM向けマッチャー（`.toBeInTheDocument()` など）をJest/Vitestに追加            |
| **@testing-library/user-event** | ユーザー操作（クリック、入力など）をよりリアルにシミュレートするAPI                    |

---

## 2. Storybook アドオンセット（基本＋アクセシビリティ＋テスト）

`pnpm add -D @storybook/addon-a11y @storybook/addon-interactions @storybook/addon-essentials @storybook/experimental-addon-test @storybook/addon-links`

|               パッケージ               |                                                    機能・役割                                                     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **@storybook/addon-essentials**        | ドキュメント、ビュー調整、操作履歴などの必須アドオンをまとめて提供                                                |
| **@storybook/addon-a11y**              | コンポーネントのアクセシビリティ問題（カラーコントラスト、ARIA属性など）を診断                                    |
| **@storybook/addon-interactions**      | Storybook上でユーザー操作を記録・再生し、インタラクションテストを行う                                             |
| **@storybook/experimental-addon-test** | Storybookストーリーをそのままテストケース化し、Vitest等で動かすための実験的アドオン                               |
| **@storybook/addon-links**             | Storybookのストーリー同士を相互にリンクさせ、コンポーネント間の「ページ遷移」やドキュメント内ナビゲーションを実現 |

---

## 3. Storybook テストランナー＆Vite連携パッケージ

`pnpm add -D @storybook/test @storybook/test-runner@^0.22.0 @storybook/react-vite@^8`

|         パッケージ         |                                 機能・役割                                  |
| -------------------------- | --------------------------------------------------------------------------- |
| **@storybook/test**        | Storybook内のストーリーをテストスイートとして実行するCLI／API               |
| **@storybook/test-runner** | ブラウザ実行可能なStorybookテストランナー（Playwrightをバックエンドに利用） |
| **@storybook/react-vite**  | ViteをビルダーとするReact用Storybook環境を構築                              |

---

## 4. モックサーバー＆Storybook連携アドオン

`pnpm add -D msw msw-storybook-addon`

|       パッケージ        |                                 機能・役割                                 |
| ----------------------- | -------------------------------------------------------------------------- |
| **msw**                 | Service WorkerベースのHTTPリクエストモックライブラリ（開発・テスト用）     |
| **msw-storybook-addon** | Storybook上でMSWハンドラを自動登録し、ストーリーごとにモック動作を切り替え |

---

## 5. Storybook プロジェクトの初期化

`pnpm dlx storybook@latest init --builder vite`

|                    コマンド                     |                                      機能・役割                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| `pnpm dlx storybook@latest init --builder vite` | 最新版Storybookを対話式にセットアップし、Viteビルダーで動作する構成ファイル一式を生成 |

## 6. Markdown拡張プラグインの導入

`pnpm add -D remark-gfm`

|   パッケージ   |                                               機能・役割                                               |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| **remark-gfm** | Markdown／MDXドキュメント内で GitHub Flavored Markdown（表、打ち消し線、チェックボックスなど）を有効化 |

---

## 7. MSW の Service Worker 初期化

`npx msw init ./public --save`

|             コマンド             |                                                      機能・役割                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **npx msw init ./public --save** | `public` ディレクトリに `mockServiceWorker.js` を生成し、ブラウザ上で MSW（Mock Service Worker）が動作する準備を行う |


jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: corepack enable
      - run: pnpm install --frozen-lockfile

      # Vitest
      - run: pnpm test

      # Storybook interaction & a11y tests
      - run: pnpm storybook:test

      # Storybook 静的ビルド (必要なら)
      - run: pnpm build-storybook --quiet