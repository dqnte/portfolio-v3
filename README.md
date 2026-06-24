# [dantetobar.com](https://dantetobar.com)

### Instalations

Requirements:

- node v22.22.0
- npm 10.9.4

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

2. Deply to AWS using CLI commands:

```sh
make deploy
```

### Adding an Album

1. Place your new album in `~/Desktop`. The images in the album should be ready for S3
2. Run the following command:

```sh
make new-album
```

This will create a new album at `~/Desktop/deploy-[album-name]`.

3. Paste the yaml output into `public/photo-manifest.yaml` and quit vim
4. Upload the album to S3, rebuild, and redeploy:

```sh
make upload-album ALBUM=album-name
```
