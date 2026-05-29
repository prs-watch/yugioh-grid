# yugioh-grid

遊戯王カードデータを高速グリッド表示するSPA。

## 構成

| 要素 | 内容 |
|---|---|
| フレームワーク | SvelteKit + Svelte 5 |
| グリッド | [@svar-ui/svelte-grid](https://svar.dev/svelte/datagrid/) (Willow テーマ) |
| データ取得 | DuckDB (Node API) でリモート Parquet を in-memory クエリ |
| データソース | [prs-watch/yugioh-ja-dataset](https://github.com/prs-watch/yugioh-ja-dataset) releases |

## データフロー

```
+page.server.ts (SSR)
  └─ DuckDB :memory: で dataset.parquet を read_parquet()
  └─ name_ja が空のレコードを除外して全件返却
      ↓
+page.svelte (client)
  └─ SVAR Grid にバインド（仮想スクロールで全件高速表示）
```

## グリッドのカラム構成

| カラム | フィルター | ソート |
|---|---|---|
| ID | — | — |
| カード名 | テキスト検索 | — |
| カード種 | リッチセレクト | ✓ |
| 種族 / カード種詳細 | リッチセレクト | ✓ |
| 属性 | リッチセレクト | ✓ |
| レベル | — | ✓ |
| スケール | — | ✓ |
| リンク | — | ✓ |
| 攻 | — | ✓ |
| 守 | — | ✓ |
| テキスト | テキスト検索 | — |

## 開発

```sh
npm install
npm run dev
```

## ビルド

```sh
npm run build
npm run preview
```

## 型チェック

```sh
npm run check
```
