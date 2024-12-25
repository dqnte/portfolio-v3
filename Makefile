install:
	npm install

i: install

build:
	sh build.sh

up:
	cp public/photo-manifest.yaml dist/
	npm start

dev: up

clean:
	rm -rf .parcel-cache
