install:
	npm install

i: install

build:
	rm dist/index.*
	npm run build

up:
	npm start

dev:
	make up

clean:
	rm -rf node_modules .parcel-cache
