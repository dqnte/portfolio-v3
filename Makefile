install:
	npm install

i: install

build:
	sh scripts/build.sh

up:
	cp public/photo-manifest.yaml dist/
	npm start

dev: up

clean:
	rm -rf .parcel-cache

new-album:
	zsh scripts/new_album.sh
