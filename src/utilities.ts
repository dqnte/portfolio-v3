import jsyaml from "js-yaml";
import { type Location } from "react-router";

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
  date: string;
  location: string;
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
          location: album.location,
          date: album.date,
        };
      }),
    };
  });
}

export const downloadAlbum = (album: IAlbum) => {
  const photos = album.photos.map((photo) => photo.smallUrl);
};

export const findAlbumFromLocation = (location: Location, albums: IAlbum[]) => {
  const key = location.pathname.split("/")[2];
  return albums.find((album) => album.key === key);
};

export const mapPhotosToColumns = (photos: IPhoto[], numCols: number): Record<number, IPhoto[]> => {
  const sortedColumns: Record<number, IPhoto[]> = {};
  const heights: Record<number, number> = {};

  for (let i = 0; i < numCols; i++) {
    sortedColumns[i] = [];
    heights[i] = 0;
  }

  photos.forEach((photo) => {
    const height = photo.height / photo.width;
    const smallestCol = Object.entries(heights).reduce(
      (smallest, [key, value]) => {
        return value < heights[smallest] ? key : smallest;
      },
      0,
    );

    heights[smallestCol] += height;
    sortedColumns[smallestCol].push(photo);
  });

  return sortedColumns;
};

