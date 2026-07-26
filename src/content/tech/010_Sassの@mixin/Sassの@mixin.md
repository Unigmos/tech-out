---
title: "Sassの@mixin"
publish: true
tags:
  - tech
created_at: 2025-09-23
updated_at: 2026-07-26
---

お疲れ様です。<br>
プライベートのWeb開発でSassを利用していて、入れ子って便利だなぁぐらいにしか思っていなかったのですが、知人からsassのmixinについて勧められたのでmixinについて調べてみました。<br>

## @mixinとは

一言でまとめると、スタイルの再利用ができる仕組みです。<br>
よく使うスタイルをまとめておき、後で呼び出すだけで利用できるような仕組みです。<br>

## 実際に触ってみる

@mixinで定義して@includeで呼び出す形です。<br>
今回はborder指定ですが、中央揃え用のスタイルとかは一括指定で簡単にできそうですね。<br>

![image](images/img_0da25349.png)

また、引数を用意することも可能なようで、引数なしの場合はデフォルト値で適用させることもできるようです。<br>

![image](images/img_ef47470b.png)

## その他

ついでなので、sassの特徴が他にないか調べてみました。<br>
思いの他いろいろできるみたいですね👀<br>

* 継承(@extend)：スタイルの引継ぎ

  ![image](images/img_c5ead2fb.png)

* 制御構文(@if, @for, @each)：ifとかforとかよくあるプログラミングっぽい挙動

  ![image](images/img_8780d415.png)

* 自作関数：引数なしでも実行可能な関数作成機能

  ![image](images/img_a8005ede.png)

* インポート：別ファイルの参照(名前空間付きらしい)

  ![image](images/img_fb0862c3.png)

* Placeholderセレクタ：css出力されないが、@extendで呼び出せる

  ![image](images/img_0cb53804.png)