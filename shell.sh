
# ルートの共通ファイルの ./common を /common に変換
search_string="\.\\/common"
replace_string="\\/common"
find ./dist/ -name '*.html' -exec sed -i "" -e "s/$search_string/$replace_string/g" {} \;


# copy root common files
# サイトの共通ファイルをdistにコピー
cp -R project/public/common dist/

# move to /service/project/
# buildしたファイルをdist/service/project/に移動
mkdir dist/service
mkdir dist/service/project
mv dist/index.html dist/service/project/index.html
mv dist/assets dist/service/project/assets
