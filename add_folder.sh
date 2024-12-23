# You may need to install identify from ImageMagick
# brew install imagemagick

desktop=/Users/dtobar/Desktop

directory=$desktop/$1

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
