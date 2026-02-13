import jsyaml from 'js-yaml';
import { type Location } from 'react-router';

const BASE_URL = 'https://dantetobar.com';

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
  display?: 'all' | 'archive' | 'hidden';
}

export type ILink = {
  type: 'instagram' | 'music';
  text: string;
  to: string;
};

export interface IProject {
  key: string;
  title: string;
  tags: string[];
  description: string;
  links?: ILink[];
  date?: string;
  display?: 'all' | 'archive' | 'hide';
  photos: IPhoto[];
}

const pullConfig = async (url: string) => {
  return fetch(url).then(async response => {
    return response.text().then(text => {
      return jsyaml.load(text);
    });
  });
};

export async function fetchPhotoManifest(): Promise<IAlbum[]> {
  const manifest = await pullConfig('/photo-manifest.yaml');

  if (!manifest.albums) {
    return [];
  }

  return manifest.albums.map((album: IAlbum) => {
    return {
      key: album.key,
      location: album.location,
      date: album.date,
      display: album.display,
      photos: album.photos.map(photo => {
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

export async function fetchProjectManifest(): Promise<IProject[]> {
  const manifest = await pullConfig('/project-manifest.yaml');

  if (!manifest.projects) {
    return [];
  }

  return manifest.projects.map((project: IProject) => {
    return {
      key: project.key,
      title: project.title,
      description: project.description,
      date: project.date,
      display: project.display,
      tags: project.tags,
      links: project.links,
      photos: project.photos.map(photo => {
        return {
          ...photo,
          smallUrl: `${BASE_URL}${photo.smallUrl}`,
        };
      }),
    };
  });
}

export const downloadAlbum = (album: IAlbum) => {
  const photos = album.photos.map(photo => photo.smallUrl);
};

type AlbumType = IAlbum | IProject;
export const findAlbumFromLocation = <T extends AlbumType>(location: Location, albums: T[]): T => {
  const key = location.pathname.split('/')[2];
  return albums.find(album => album.key === key);
};

export const mapPhotosToColumns = (photos: IPhoto[], numCols: number): Record<number, IPhoto[]> => {
  const sortedColumns: Record<number, IPhoto[]> = {};
  const heights: Record<number, number> = {};

  for (let i = 0; i < numCols; i++) {
    sortedColumns[i] = [];
    heights[i] = 0;
  }

  photos.forEach(photo => {
    const height = photo.height / photo.width;
    const smallestCol = Object.entries(heights).reduce((smallest, [key, value]) => {
      return value < heights[smallest] ? key : smallest;
    }, 0);

    heights[smallestCol] += height;
    sortedColumns[smallestCol].push(photo);
  });

  return sortedColumns;
};
