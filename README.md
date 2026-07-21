# 英単語メモリー

スマホで英単語・熟語を覚えるための個人用PWAです。

## できること

- 10問ごとの単語テストを行う
- 英単語・熟語カードをタップして和訳を確認する
- 音声ボタンで英単語・熟語を1回だけ読み上げる
- 自分で「正解」「不正解」を判定する
- スマホのブラウザ内IndexedDBに回答履歴を保存する
- 不正解率が高い語句を次回以降に出やすくする
- 学習済み数と残り数を確認する
- 10問終了後に英語・日本語・正解/不正解の一覧を表示する
- 学習データをJSONでバックアップする

## 出題ロジック

各語句には、出題回数・正解数・不正解数・最後に出題された日時が保存されます。

- 未出題の語句は少し出やすくする
- 不正解回数・不正解率が高い語句は出やすくする
- 3回以上回答済みで不正解率が20%以下の語句は出題頻度を下げる
- 1回のテストは必ず10問にする
- 音声はブラウザのWeb Speech APIで英語として読み上げる

## 収録データ

- NGSL 1.01 英日CSV: 2801件
- 日常頻出句動詞スターター: 50件

NGSL 1.2公式サイトでは最新版が2809語として公開されています。現在のアプリには英日訳付きで扱えるNGSL 1.01を投入し、DB上ではsource/versionを分けて後から1.2差分を追加できるようにしています。

## データの保存

サーバーには正解/不正解履歴を保存しません。GitHub Pagesなどの無料ホスティングはPWA本体を配信するだけです。

保存先:

- 単語帳: 初回起動時にブラウザ内IndexedDBへ投入
- 回答履歴: ブラウザ内IndexedDB
- 10問ごとの結果: 画面表示と回答履歴に保存
- バックアップ: アプリ内の「バックアップ」ボタンでJSONを書き出し

同じiPhoneでもSafariとChromeでは別データになります。Safariでホーム画面に追加して使う場合は、そのSafari側の保存領域に残ります。

## 開発環境

このリポジトリはReact + Viteで作っています。

必要なもの:

- Node.js 22.13.x以上
- pnpm
- Git

## セットアップ

```bash
pnpm install
pnpm run dev
```

## ビルド

```bash
pnpm run build
```

## 無料ホスティング

### GitHub Pages

GitHub Pagesは無料で使えますが、GitHub Freeではpublic repositoryが対象です。Private repositoryからPagesを使うにはGitHub Pro/Team以上が必要です。

このリポジトリにはGitHub ActionsのPagesデプロイ設定があります。

1. GitHubのRepository Settingsを開く
2. `Pages` を開く
3. Sourceを `GitHub Actions` にする
4. `main` にpushすると自動で公開されます

公開URLは通常この形です。

```text
https://takky-k.github.io/English_memorize_iphone/
```

### Private repoのまま無料で公開したい場合

Vercel、Netlify、Cloudflare Pagesなどの無料枠を使うのが候補です。リポジトリはprivateのまま接続できますが、生成されたWebサイト自体はURLを知っていればアクセスできる公開サイトとして扱うのが安全です。

このPWAは個人データをブラウザ内にだけ保存するため、サイトURLを誰かが開いても、あなたの正解/不正解履歴は見えません。

## iPhoneでホーム画面に追加

1. Safariで公開URLを開く
2. 共有ボタンを押す
3. `ホーム画面に追加` を押す
4. 追加されたアイコンから開く

## Git初期化

このリポジトリはすでにGit管理されています。

```bash
git status
```

## 要件・注文メモ

今後の開発内容は [docs/order.md](docs/order.md) に追記していきます。
