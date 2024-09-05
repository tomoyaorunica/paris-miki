# copy root common files
# サイトの共通ファイルをdistにコピー
cp -R project/_copy_to_dist_root/ dist/common/

# move to /service/project/
# buildしたファイルをdist/service/project/に移動
mkdir dist/service
mkdir dist/service/project
mv dist/index.html dist/service/project/index.html
mv dist/assets dist/service/project/assets
