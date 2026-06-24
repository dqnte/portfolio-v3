include .env
export

install:
	npm install

i: install

build:
	sh scripts/build.sh

format:
	npm run format

up:
	cp public/photo-manifest.yaml dist/
	cp public/project-manifest.yaml dist/
	npm start

dev: up

clean:
	rm -rf .parcel-cache

new-album:
	zsh scripts/new_album.sh

deploy:
	aws s3 sync dist/ s3://$(S3_BUCKET) --delete --exclude "albums/*"
	aws cloudfront create-invalidation --distribution-id $(CF_DISTRIBUTION_ID) --paths "/*"

upload-album:
	aws s3 sync $(HOME)/Desktop/deploy-$(ALBUM)/ s3://$(S3_BUCKET)/
	$(MAKE) build
	$(MAKE) deploy
