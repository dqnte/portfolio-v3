install:
	npm install

build:
	rm dist/src.*
	npm run build

up:
	npm start

dev:
	make up
