---
title: "input type=fileのキャンセルでchangeイベントが拾えなくなった話"
publish: true
tags:
  - dev_tools
  - tech
  - infra

created_at: 2026-08-08
updated_at: 2026-08-09
---

ファイルアップロードのUIで「キャンセルボタンを押したときの処理」をchangeイベントで書いていたら、いつの間にか動かなくなっていた、、、という経験をしたので調べてみました。<br>

## 結論

結論としては、キャンセル検知の方法がchangeから専用のcancelイベントに切り替わったからでした。<br>
そもそもchangeでキャンセルを検知できていたのはChromiumの非標準な副作用で、仕様として保証された挙動ではなかったようです。<br>

## もう少し細かく

直近までのChromiumは、ファイル選択済みの`<input type="file">`でダイアログをキャンセルすると、valueを強制的に空にしていました。<br>
不具合の発生するソースではvalueが変わるので結果的にchangeが発火し、それを頼りにキャンセル判定をしていました。<br>

```js
input.addEventListener('change', () => {
  if (input.files.length === 0) {
    // キャンセルされたとみなす（非標準の副作用に依存）
  }
});
```

ただこの挙動が2026年5月頃に変更され、valueが空にならなくなりました。<br>
その後、この変更がedgeやchromeのver150にて取り込まれ、キャンセル時にchangeイベントが発火せずにキャンセル時の挙動が変わってしまいました。<br>

## 対処法

素直にcancelイベントを使えばOKでした。<br>

```js
const input = document.getElementById('file');

input.addEventListener('cancel', () => {
  // ダイアログのキャンセル、または同じファイルの再選択
  console.log('キャンセルされました');
});

input.addEventListener('change', () => {
  if (input.files.length > 0) {
    console.log('ファイルが選択されました');
  }
});
```

## 余談

質が悪いのは、これがリリースノートに載っていなかったために原因調査が難航したんですよね、、<br>
他のブラウザと統一仕様にするための修正みたいですが、サイレントでもブラウザのバージョンによって実質破壊的な変更になるパターンがあることを思い知らされた不具合でした、、<br>

もし、ファイル選択キャンセル時で何かしら対応されている方いましたら挙動再確認するのもよいかと思います。<br>

## 参考リンク

https://issues.chromium.org/issues/40219625<br>
https://developer.chrome.com/release-notes/150<br>
https://learn.microsoft.com/ja-jp/microsoft-edge/web-platform/release-notes/150<br>
