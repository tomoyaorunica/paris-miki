module.exports = {
  plugins: {
    'autoprefixer'                : {},
    'postcss-sort-media-queries'  : {},
    'css-declaration-sorter'      : { order:'smacss' },
    // jsでaddするクラスがパージされるので実行しない
    // '@fullhuman/postcss-purgecss' : {
    //   content: ['./src/**/*.html','./resources/src/js/**/*.js'],
    // },
  },
}