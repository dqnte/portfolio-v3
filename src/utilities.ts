import jsyaml from "js-yaml";

const BASE_URL = "https://s3.us-west-1.amazonaws.com/dantetobar.com";

export interface IPhoto {
  camera: string;
  smallUrl: string;
  largeUrl: string;
  film?: string;
  height: number;
  width: number;
  color?: string;
}

export interface IAlbum {
  index: number;
  key: string;
  location: string;
  date: string;
  coverUrl: string;
  photos: IPhoto[];
}

export async function fetchPhotoManifest(): Promise<{ albums: IAlbum[] }> {
  return fetch("/photoManifest.yaml").then(async (response) => {
    return response.text().then((text) => {
      const config = jsyaml.load(text);
      config.albums.forEach((album: IAlbum) => {
        album.coverUrl = `${BASE_URL}${album.coverUrl}`;
        album.photos.forEach((photo: IPhoto) => {
          photo.smallUrl = `${BASE_URL}${photo.smallUrl}`;
          photo.largeUrl = `${BASE_URL}${photo.largeUrl}`;
        });
      });
      return config.albums;
    });
  });
}

export const downloadAlbum = (album: IAlbum) => {
  const photos = album.photos.map((photo) => photo.smallUrl);
};
