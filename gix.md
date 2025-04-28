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

pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
pnpm dlx storybook@latest init --builder vite
pnpm add -D @storybook/addon-a11y @storybook/addon-interactions msw-storybook-addon
  選択肢はいじらずenter

pnpm add -D msw@1.3.1
pnpm add -D msw-storybook-addon@^1
pnpm add -D @storybook/test 
pnpm add -D @storybook/test-runner@^0.22.0
pnpm add -D @storybook/react-vite@^8  @storybook/addon-essentials  @storybook/addon-interactions  @storybook/experimental-addon-test  @storybook/test
pnpm add -D remark-gfm
pnpm add -D @storybook/addon-mdx-gfm
pnpm add -D @storybook/test
npx msw init ./public --save 

npx http-server ./storybook-static -p 8080

反映するのが望ましい
storybook/addon-console
storybook/addon-links


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