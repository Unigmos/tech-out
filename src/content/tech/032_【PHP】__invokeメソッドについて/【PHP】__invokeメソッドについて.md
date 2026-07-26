---
title: "【PHP】__invokeメソッドについて"
publish: true
tags:
  - laravel
  - php
  - tech
created_at: 2026-06-27
updated_at: 2026-07-26
---

# 【PHP】__invokeメソッドについて

プロジェクトの開発規模が大きくなると、段々とコントローラの規模や責任範囲が大きくなり、コード追うのも大変になることが多いと思います。<br>
最近__invokeというメソッドがあることを知ったので引き出しの一つとして紹介になります。<br>

## __ invokeメソッドとは

クラス名が呼ばれたときに自動的に処理を実行できるメソッドです。<br>
以下のように定義可能で、通常だとそのクラスのなんのメソッドを呼び出すか指定すると思いますが、__ invokeはシングルアクションになるので、__ invokeメソッドのみが呼び出されます。<br>
1つのコントローラで1つのルーティングのみにすることを強制できるので、1コントローラ辺りのコード量削減に貢献してくれます。<br>

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class InvokeExampleController extends Controller
{
    public function __invoke(Request $request): View
    {
        $message = '__ invokeメソッドが呼び出されました';
        $time = now()->format('Y-m-d H:i:s');

        return view('invoke.index', compact('message', 'time'));
    }
}
```

```php
<?php

use App\Http\Controllers\InvokeExampleController;

Route::get('/invoke', InvokeExampleController::class)->name('invoke');
```

![](images/invoke_01.png)

## Route::resourceとの使い分け

LaravelのルーティングではRoute::resourceという複数の処理をまとめてルーティングする記載方法もあります。<br>
色々記事を探してみたのですが、必ずどちらかにすべきというよりかは状況によって使い分けるのが良いようです。<br>

例えばRoute::resourceであれば、indexやshowメソッドが共通になるので、プロジェクト全体で標準化できたり、web.phpの記載量削減にもなるのでCRUDが決まってる場面とかでは有効だと思います。<br>
一方で、不要なルートも作成されてしまったり、コントローラの肥大化はあるので、ログイン処理といった特定処理しかないみたいな場合には__invokeが有効かなと思います。<br>

## 所感

初学者向け記事等で一回も見たことがなかったのでコードリーディングする際は「何ぞ？」とはなりそうですが、使いどころによってはだいぶ可読性上がりそうなので、試してみるのもいいのかなと思います。<br>
今回紹介した__invoke以外にもマジックメソッドはたくさんあるようなので機会があればまた調べて紹介していきます。<br>
