---
title: "【VSCode】Run on Saveについて"
publish: true
tags:
  - dev_tools
  - tech
created_at: 2026-07-19
updated_at: 2026-07-26
---

お疲れ様です。<br>
VSCodeでファイルを保存するたびに「このスクリプト走らせたいな〜」みたいな悩みがあったのですがちょうどよさげな拡張機能があったので紹介になります。<br>
「Run on Save」という拡張機能を使うと、ファイル保存のタイミングで任意のコマンドを自動実行できます。<br>

https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave<br>

## 設定方法

`.vscode/settings.json`に`emeraldwalk.runonsave`のキーで設定します。<br>

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": ".*\\.md$",
        "cmd": "echo ${file}"
      }
    ]
  }
}
```

設定できる主なオプションは以下です。<br>

| オプション | 説明 |
| --- | --- |
| `match` | 対象ファイルのパターン（正規表現） |
| `cmd` | 実行するコマンド |
| `isAsync` | 非同期実行するか（デフォルト: false） |

`cmd` の中では変数も使えます。<br>

| 変数 | 内容 |
| --- | --- |
| `${file}` | 保存されたファイルの絶対パス |
| `${fileBasename}` | ファイル名（拡張子あり） |
| `${fileDirname}` | ファイルのディレクトリパス |
| `${workspaceFolder}` | ワークスペースのルートパス |

## 活用例

個人利用のリポジトリでは、特定のフォルダが更新するたびにpythonスクリプトを発火させるようにしており、自動で改行タグを付与させたり、更新日付を最新化させるスクリプトを実行させています。<br>
これまでは手動での実行やフォーマット調整が必要でしたが、Run on Saveを使うことで保存のたびに自動で反映されるようになりました。<br>

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "(journal|knowledge/tech)[\\\\/].*\\.md$",
        "cmd": "py ${workspaceFolder}/scripts/keyword-tag.py \"${file}\""
      },
      {
        "match": "(journal|knowledge|portfolio)[\\\\/].*\\.md$",
        "cmd": "py ${workspaceFolder}/scripts/add-linebreaks.py \"${file}\""
      },
      {
        "match": "journal[\\\\/].*\\.md$",
        "cmd": "py ${workspaceFolder}/scripts/resolve-templater-date.py \"${file}\""
      }
    ]
  }
}
```

## 所感

設定がシンプルで、正規表現でファイルの絞り込みもできるので思ったより使い勝手が良かったです。<br>
プロジェクトごとに`.vscode/settings.json`へ入れておけばチームにも共有できますし、mdの設計書で毎回手動で修正している処理とかがあれば自動化できるので手間が減らせるのもメリットかと思います。<br>
