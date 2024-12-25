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
  title: string;
}

export interface IAlbum {
  key: string;
  location: string;
  date: string;
  photos: IPhoto[];
  display?: "all" | "archive" | "hide";
}

const pullConfig = async (url: string) => {
  return fetch(url).then(async (response) => {
    return response.text().then((text) => {
      return jsyaml.load(text);
    });
  });
};

export async function fetchPhotoManifest(): Promise<IAlbum[]> {
  const manifest = await pullConfig("/photo-manifest.yaml");

  if (!manifest.albums) {
    return [];
  }


  return manifest.albums.map((album: IAlbum) => {
    return {
      key: album.key,
      location: album.location,
      date: album.date,
      display: album.display,
      photos: album.photos.map((photo) => {
        return {
          ...photo,
          smallUrl: `${BASE_URL}${photo.smallUrl}`,
        };
      }),
    };
  });
}

export const downloadAlbum = (album: IAlbum) => {
  const photos = album.photos.map((photo) => photo.smallUrl);
};
