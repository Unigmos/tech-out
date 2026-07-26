---
title: "【PHP】Laravelのscopeを推したい"
publish: true
tags:
  - laravel
  - php
  - tech
created_at: 2026-02-06
updated_at: 2026-07-26
---

# 【PHP】Laravelのscopeを推したい

お疲れ様です。<br>
最近Laravelのスコープという機能をよく使うのですが、個人的に保守性・可読性の面で結構いいなと思ってましてその紹介をさせていただければと思います。<br>
グローバルスコープとローカルスコープという括りがありますが、特にローカルスコープを推したく深堀って説明します。<br>

## スコープって？

Laravelにおけるスコープとは、Model内でよく使う検索条件に名前を付けて再利用しやすくする仕組みです。<br>
後述する「使用例」にて挙げますが、「割引中の商品だけ絞り込む」とか他にも「品薄の商品を絞り込む」とかよく使いそうなクエリをどっかでまとめて定義しちゃおうな考えです。<br>

## 使用例

まず、定義部分ですがpublic function scope○○で関数定義します。<br>
その中でよく使う検索条件を定義するイメージです。<br>
※この時点では返り値はBuilderである必要があります。get等使って返り値がCollectionになるとそれ以降のwhereやorderbyが繋げられなくなります。。<br>

```php
// app/Models/Product.php
public function scopeOnSale($query)
{
    return $query->where('is_active', true)    // 有効
        ->where('stock', '>', 0)               // 在庫あり
        ->where('sale_price', '>', 0)          // セール価格設定あり
        ->whereDate('sale_start_at', '<=', Carbon::now()); // 期限内
        ->whereDate('sale_end_at', '>=', Carbon::now()); // 期限内
}
```

次に呼び出す際ですがscopeを除いた名前で呼び出します。<br>
scopeOnSaleであればonSaleで呼び出します。<br>
<br>
A. トップページ(セール中のものを5品取得)<br>

```php
$products = Product::onSale()->limit(5)->get();
```

B. カテゴリページ(家電のセール品を取得)<br>

```php
$electronics = Product::onSale()->where('category', 'appliance')->get();
```

A,Bどちらのパターンもscope使わずに全量書くとそれぞれ追加で記載が必要になり、保守性や可読性の面で微妙になるというわけです。<br>