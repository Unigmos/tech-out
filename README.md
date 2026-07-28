# Tech Notes

個人の技術学習記事を公開しているサイトのソースリポジトリです。

**サイト**: https://Unigmos.github.io/tech-out/

## 概要

- [Astro](https://astro.build)（Content Collections）+ GitHub Pagesで構築した静的サイトです
- 記事コンテンツは非公開の個人リポジトリの`knowledge/tech`配下から、frontmatterで`publish: true`になっている記事のみが自動同期されます
- **`src/content/tech/`配下は自動同期の対象なので、このリポジトリ側で直接編集しないでください**（次回の同期で上書きされます。記事の修正は同期元の非公開リポジトリ側で行ってください）

## 構成

```
src/
├── content.config.ts    # 記事frontmatterのスキーマ定義（title, publish, tags, created_at, updated_at）
├── content/tech/        # 同期された記事本体（自動生成・直接編集禁止）
├── lib/
│   └── slug.ts          # post.idから連番プレフィックスを除いたURLスラッグを生成する共通関数
├── layouts/
│   └── BaseLayout.astro # 共通レイアウト（ヘッダー、テーマ切替、View Transitions、
│                         # コードブロックのコピー機能、フッター、全体CSS）
├── components/
│   └── PostList.astro   # 記事一覧のカード表示コンポーネント（検索対応）
└── pages/
    ├── index.astro      # 記事一覧・検索
    ├── [slug].astro     # 記事詳細ページ（例: /vscoderun-on-saveについて/）
    └── tags/[tag].astro # タグ別の記事一覧ページ
```

記事のURLは`src/lib/slug.ts`が生成するスラッグ（連番・重複フォルダ名を除いたもの）をそのまま使い、`/{slug}/`という1階層のシンプルな形になっています。

## 主な機能

- タイトル・タグの部分一致によるその場検索（ヘッダー内）
- 最新記事を大きく見せるヒーローカード＋残りをグリッド表示する一覧ページ
- タグごとの記事一覧ページ（記事内のタグをクリックで遷移）
- OSのテーマ設定に連動したライト/ダーク表示（手動切り替えも可能、選択は記憶されます）
- Astro View Transitionsによるページ遷移アニメーション
- スクロールに追従するヘッダー、記事詳細の目次（現在地をハイライトするscrollspy付き）
- コードブロックへの言語ラベル・コピー機能（クリップボードアイコン→コピー後チェックアイコンに変化）
- フッターのGitHubリポジトリへのリンク

## 開発

```sh
npm install
npm run dev      # http://localhost:4321 で開発サーバー起動
npm run build    # ./dist/ に静的ファイルを出力
npm run preview  # ビルド結果をローカルで確認
```

## デプロイ

`main`ブランチへのpushをトリガーに、GitHub Actions（`.github/workflows/deploy.yml`）が自動的にAstroのビルドとGitHub Pagesへのデプロイを行います。

同期元の非公開リポジトリの`knowledge/tech`配下がpushされると、そちら側のワークフローが`publish: true`の記事を抽出してこのリポジトリにpushし、それが上記のデプロイをトリガーする、という流れになっています。
