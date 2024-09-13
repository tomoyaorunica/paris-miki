import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  const htmlPlugin = () => ({
    name: 'html-transform',
    transformIndexHtml: html =>
    {
      return html.replace(/%=(.*?)%/g, (match, p1) => env[p1] ?? match)
    }
  })
  
  const date = () => {
    const now = new Date()
    return now.getFullYear() + ("0" + (now.getMonth() + 1)).slice(-2) + ("0" + now.getDate()).slice(-2)
  }

  const src  = './project/'
  const path = 'service/project/'
  
  return defineConfig({
    base: './',
    root: src,
    server: {
      host: true,
      open: true,
      port: 3350,
    },
    build: {
      outDir : '../dist',
      emptyOutDir: true,
      cssCodeSplit: true,
      assetsInlineLimit: 0, // base64化させない
      rollupOptions: {
        input: {
          "top"       : resolve(__dirname, `${src}index.html`),
          // "top"       : resolve(__dirname, `${src}service/project/index.html`),
          // "about"     : resolve(__dirname, `${src}about/index.html`),      //　-丸森クラスタとは？
          // "howto"     : resolve(__dirname, `${src}howto/index.html`),      //　-丸森クラスタの使い方
          // "maru3mori" : resolve(__dirname, `${src}maru3mori/index.html`),  //　-まるまるまるもり

          // "people"        : resolve(__dirname, `${src}people/index.html`),   //　-丸森クラスタな人たち（CMS対象）
          // "people-detail" : resolve(__dirname, `${src}people/detail.html`),  //　-丸森クラスタな人たち（CMS対象）

          // "news"        : resolve(__dirname, `${src}news/index.html`),   //　-このごろの話題（CMS対象）
          // "news-detail" : resolve(__dirname, `${src}news/detail.html`),  //　-このごろの話題（CMS対象）

          // "contact"          : resolve(__dirname, `${src}contact/index.html`),     //　-CONTACT
          // "contact-complete" : resolve(__dirname, `${src}contact/complete.html`),  //　-CONTACT COMPLETE

          // "privacy" : resolve(__dirname, `${src}privacy/index.html`),  //　-プライバシーポリシー
        },
        output : {
          assetFileNames: (assetInfo) => {

            const fullName = assetInfo.name.split('.')
            const name     = fullName[0]
            const extType  = fullName[1]
            // console.log("assetInfo----------")
            // console.log(assetInfo)
            // console.log(name)
            // console.log(extType)

            if (/webp|png|jpe?g|svg|gif|tiff|bmp|ico|mp4/i.test(extType)) {
              return `assets/img/[name]-[hash][extname]`
            }
            
            if (/css/i.test(extType)) {
              // console.log("css ------------")
              // console.log(name)

              // return `assets/css/[name]-[hash][extname]`
              return `assets/css/[name][extname]?[hash]`
              // if(name.includes('main')) return 'assets/css/main.css?[hash]'
            }
            return `assets/${extType}/[name][extname]`
          },
          // chunkFileNames: `${path}assets/js/[name].js?[hash]`,
          // entryFileNames: `${path}assets/js/[name].js?[hash]`,
          chunkFileNames: `assets/js/[name].js?[hash]`,
          entryFileNames: `assets/js/[name].js?[hash]`,
        },
      }
    },
    plugins: [
      htmlPlugin(),

      // https://github.com/alexlafroscia/vite-plugin-handlebars/issues/252
      handlebars({
        partialDirectory: [
          resolve(__dirname, './project/_inc'), 
          resolve(__dirname, './project')
        ],
        helpers: {
          replace_webp : (value) => value.replace(/jpg|png/g, "webp"),
        },
        context: {
          now      : Date.now(),
          base_url : 'https://www.paris-miki.co.jp/service/project/',
          media    : '(max-width: 767px)',

          cmn_title    : 'PERSONAL DIRECTION ｜ メガネのパリミキ',
          cmn_desc     : '眼を救え。パリミキだけの【最適視界】カウンセリング、 PERSONAL DIRECTIONはじまる。',
          cmn_keywords : 'メガネ,めがね,眼鏡,パリミキ,メガネの三城,フレーム, PERSONAL DIRECTION,最適視界,カウンセリング',
          
          temp_dir : '',
          
        },
      }),
    ],
    resolve: {
      alias: {
        '@'   : resolve(__dirname, './project/resources/'),
        '@js' : resolve(__dirname, './project/resources/js/'),
      }
    },
  })
}