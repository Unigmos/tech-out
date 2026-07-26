---
title: "ANSIエスケープシーケンスで遊ぶぞ！"
publish: true
tags:
  - python
  - dev_tools
  - tech
created_at: 2026-02-13
updated_at: 2026-07-26
---

# ANSIエスケープシーケンスで遊ぶぞ！

突然ですが、ANSIエスケープシーケンスってご存じでしょうか？<br>
ずばり何かというとターミナルに色を付けたりカーソルを動かしたりできる処理の記載方法です。<br>
今回はこれでローディングバーを作成してみます。<br>

## CSI(Control Sequence Introducer)

ANSIエスケープシーケンスの中でも今回はCSIというもので遊んでみました。<br>
他にもOSCやDCSといったものもあるようですが、ウィンドウタイトルやマクロ等できることが違うみたいです。<br>

## 実装

ローディングバーを作成してみます。<br>
早速ですが実装したコードは以下↓です。<br>

```python
import sys, time, random

class LoadBar:
    MAX_PERCENTAGE = 100
    def __init__(self, width=20, step=5, min_sleep=0.1, max_sleep=0.4):
        self.width = width
        self.step = step
        self.min_sleep = min_sleep
        self.max_sleep = max_sleep

    def __enter__(self):
        # カーソル非表示
        sys.stdout.write("\033[?25l")
        return self

    def __exit__(self, *args):
        # カーソル表示
        sys.stdout.write("\033[?25h\n")

    def run(self):
        for percentage in range(0, self.MAX_PERCENTAGE + 1, self.step):
            filled = percentage // (self.MAX_PERCENTAGE // self.width)
            bar = '█' * filled + ':' * (self.width - filled)
            
            # \r(行頭) + \033[2K(行消去)
            sys.stdout.write(f"\r\033[2KLoading: |{bar}| {percentage:3}%")
            sys.stdout.flush()
            
            time.sleep(random.uniform(self.min_sleep, self.max_sleep))

if __name__ == "__main__":
    with LoadBar() as loader:
        loader.run()
```

細かいところは省きますが、メインなのは以下部分です。<br>
制御しているのは以下の部分です。<br>

* \r：カーソルを行の先頭に渡す

* \033[：CSIの定義

* 2K：行全体を削除

```python
sys.stdout.write(f"\r\033[2KLoading: |{bar}| {percentage:3}%")
```

## 参考

https://learn.microsoft.com/ja-jp/windows/console/console-virtual-terminal-sequences<br>
