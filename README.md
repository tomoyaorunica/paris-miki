## command
```
// インストール
npm install

// 開発環境を立ち上げ
npm run dev

// distにビルド
npm run build

// distのプレビュー
npm run preview
```
### 実装概要
#### ■ フレームワーク
```
vite v5.1.6
Node.js v18 以上

### 更新方法
```
npm run build
上記ビルドコマンドでビルドした後に dist フォルダ配下をFTPする
```

### vite-plugin-handlebars
```
webpまたはsvgを指定

{{> img 
  path      = '/img/'
  pc        = "_pc.webp"
  sp        = "_sp.webp"
  alt       = ''
  loading   = 'lazy | eager'
  className = 'class-name'
  width     = "100"
  height    = "100"
}}
```

### 書き方メモ
```
<img src="./img/main.jpg" alt="">

<img src="/img/sub/sub.jpg" alt="">

publicフォルダ以下の画像の場合
<img src="/assets/img/sub/sub.jpg" alt="">


{{! コメントアウト }}
{{!-- 上のコメントアウトをラップできるコメントアウト --}}
```