#!/bin/zsh

# You may need to install identify from ImageMagick
# brew install imagemagick

desktop=/Users/dtobar/Desktop

new_dir=$(LS $desktop | fzf)
directory=$desktop/$new_dir

touch $directory/manifest.yaml
key=$(basename $directory)

echo -n "Location: "
read location

echo -n "Date: "
read date

echo """key: ${key}
location: ${location}
date: ${date}
photos:""" > $directory/manifest.yaml

for file in $directory/*.jpg
do
  filename=$(basename "$file")
  filename="${filename%.%}"
  height=$(magick identify -format "%[fx:h]" $file)
  width=$(magick identify -format "%[fx:w]" $file)
  echo """   - smallUrl: /albums/${key}/${filename}
     camera:
     height: ${height}
     width: ${width}""" >> $directory/manifest.yaml
done

nvim $directory/manifest.yaml

# Create new archive index.html
image=$(cat $directory/manifest.yaml | grep "/albums/$key" | head -n 1 | sed "s/^   - smallUrl: //")

new_file=$desktop/$key/index.html
cat deployed/index.html > $new_file

sed -i '' 's|\/index|../../index|g' "$new_file"
sed -i '' 's|\/index|../../index|g' "$new_file"
sed -i '' 's|\/favicon|../../favicon|g' "$new_file"
sed -i '' "s|<title>Dante Tobar</title>|<title>$key</title>|" "$new_file"
sed -i '' "s|<head>|<head><meta property=\"og:image\" content=\"../..$image\" />|" "$new_file"

mkdir $desktop/deploy-$key
mkdir $desktop/deploy-$key/albums
mkdir $desktop/deploy-$key/albums/$key
cp $directory/*.jpg $desktop/deploy-$key/albums/$key

mkdir $desktop/deploy-$key/archive
mkdir $desktop/deploy-$key/archive/$key
cp $new_file $desktop/deploy-$key/archive/$key/index.html
