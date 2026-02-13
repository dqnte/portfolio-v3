# [dantetobar.com](https://dantetobar.com)

### Instalations

Requirements:

- node v20.17.0
- npm 10.8.2

```sh
make install
```


### Running

```sh
make dev
```

### Deploying

1. Run the build command to create all build artifacts:

```sh
make build
```

2. Clear S3 bucket build artifacts and place new ones in bucket.

Note: DO NOT DELETE `/albums` OR A POX ON YOUR HOUSE!!!

3. Drag files in `dist` and the two manifest files into S3
4. Finally, invalidate the Cloudfront cache if you want to see changes immediately


### Adding an Album
1. Place your new album in `~/Desktop`. The images in the album should be ready for S3
2. Run the following command:

```sh
make new-album
```

This will create a new album at `~/Desktop/deploy-[album-name]`.

3. Paste the yaml output into `public/photo-manifest.yaml` and quit vim
4. Highlight the contents of this new folder and drag into the S3 bucket
5. Re-deploy the app
