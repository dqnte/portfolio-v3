install:
	npm install

i: install

build:
	rm dist/index.* dist/*.jpg
	npm run build

up:
	cp public/photo-manifest.yaml dist/
	npm start

dev: up

clean:
	rm -rf node_modules .parcel-cache
