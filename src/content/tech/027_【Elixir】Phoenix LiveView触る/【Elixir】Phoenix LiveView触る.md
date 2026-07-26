---
title: "【Elixir】Phoenix LiveView触る"
publish: true
tags:
  - laravel
  - elixir
  - tech
created_at: 2026-04-16
updated_at: 2026-07-26
---

Elixir言語のphoenixフレームワークの中にLiveViewという機能があるのですが、そちらを触ってみました。<br>

## LiveViewでリアルタイム処理するまでの流れ

試しに全ブラウザ共通で「いいね」の値を共有するアプリを作成しました。<br>
作成したアプリからリアルタイム処理する流れを説明していきます。<br>
<br>
まずは、Supervisorでプロセスを立ち上げます。<br>
childrenに定義していますが、それぞれ以下の意味合いです。<br>

* PubSub: パブリッシャー/サブスクライバーの略。<br>
同じトピックを購読しているプロセスに変更を通知する仕組み

* Likes: プロジェクトの中で作成したもの。<br>
いいね数のカウントや増加を制御。

* Endpoint: リクエストを捌くところ。<br>
Laravelにおけるapp/Http/Kernelに相当。

![image](images/img_3a878193.png)

次に、「/」にアクセスした際の動きです。<br>
細かい動きは割愛しますが、サブスクライバーとして登録して、変更を受け取る設定にします。<br>
そこから、サーバー側で保持している値を受け取って表示する形です。<br>
ボタン押した場合は1枚目の画像のhandle_eventを発火できるので、値を増分して変更をプロバイダーで通知、変更分を差分描画することでリアルタイムっぽく描画できます。<br>

![image](images/img_98669aae.png)

![image](images/img_babef1e0.png)

## 何がすごいの？

LiveViewでも使っているWebSocketですが、WebSocket自体はReact等のフロントのフレームワークでも普通に使えます。<br>
じゃあ何がすごいかって話ですが、責任範囲の狭さと状態の集約、その軽量さにあります。<br>
<br>
フロントで実装しようとすると、useStateとかで状態を管理しておいて、WebSocket張って、イベントの送受信をフロントとサーバーそれぞれに記載して、、みたいにあっちこっちのファイルに記載が必要かと思います。<br>
それをLiveViewではサーバー側に状態を集約させておくので、フロントで変更用の関数を発火させる手間がなくなります。<br>

## 所感

全ブラウザをサクッと同期できるのは結構すごいことだとは思うので、リアルタイム性の強さを垣間見た気がします。<br>
まだPhoenixの記法は慣れていないですが、普段のLaravelと差別化できる部分もあるので違い知っていくのも面白いなーと思います。<br>

## 参考

https://speakerdeck.com/koga1020/phoenix-dot-pubsubfalseshao-jie-tohuo-yong-wokao-eru?slide=8<br>

https://speakerdeck.com/mokichi/elixiryi-wai-noyan-yu-moyokushi-uenziniagakao-eru-phoenix-liveviewnoshi-idokoro?slide=7<br>