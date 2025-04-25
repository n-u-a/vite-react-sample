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
