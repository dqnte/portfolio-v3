install:
	npm install

i: install

build:
	rm -f dist/*
	npm run build

up:
	rm -f dist/*
	cp public/photo-manifest.yaml dist/
	npm start

dev: up

clean:
	rm -rf .parcel-cache
