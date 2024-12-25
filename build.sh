if [ -d "dist" ]; then
    rm -rf dist
fi

npm run build

if [ -d "dist/archive" ]; then
    rm -rf dist/archive
fi

mkdir -p dist/archive

grep "key:" public/photo-manifest.yaml | sed 's/^  - key: /dist\/archive\//' | xargs mkdir
grep "key:" public/photo-manifest.yaml | sed 's/^  - key: /dist\/archive\//' | while read -r filename; do
    touch "$filename/index.html"
    cat dist/index.html > "$filename/index.html"
done

for key in dist/archive/*/; do
    base=$(basename $key)
    image=$(cat public/photo-manifest.yaml | grep "/albums/$base" | head -n 1 | sed "s/^       - smallUrl: //")
    sed -i '' 's|\/index|../../index|g' "$key/index.html"
    sed -i '' 's|\/favicon|../../favicon|g' "$key/index.html"
    sed -i '' "s|<title>Dante Tobar</title>|<title>$base</title>|" "$key/index.html"
    sed -i '' "s|<head>|<head><meta property=\"og:image\" content=\"../..$image\" />|" "$key/index.html"

done
