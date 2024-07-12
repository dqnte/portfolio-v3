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

export function fetchPhotoManifest(): { albums: IAlbum[] } {
  return {
    albums: [
      {
        index: 1,
        key: "chamonix",
        location: "Chamonix, France",
        date: "January, 2024",
        coverUrl: BASE_URL + "/albums/chamonix/chamonix-5.jpg",
        photos: [
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-1.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-1.jpg",
            width: 2048,
            height: 1365,
          },
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-2.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-2.jpg",
            width: 2048,
            height: 1365,
          },

          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-3.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-3.jpg",
            width: 1638,
            height: 2048,
          },
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-4.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-4.jpg",
            width: 1638,
            height: 2048,
          },
          {
            camera: "Mamiya 645",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-5.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-5.jpg",
            width: 1638,
            height: 2048,
          },
        ],
      },
      {
        index: 2,
        key: "aiguille-du-midi",
        location: "Aiguille Du Midi, France",
        date: "January, 2024",
        coverUrl: BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-1.jpg",
        photos: [
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-1.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-1.jpg",
            width: 1638,
            height: 2048,
          },
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-2.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-2.jpg",
            width: 1638,
            height: 2048,
          },

          {
            camera: "Sony a7 iii",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-3.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-3.jpg",
            width: 1638,
            height: 2048,
          },
          {
            camera: "Sony a7 iii",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-4.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-4.jpg",
            width: 2048,
            height: 1365,
          },
          {
            camera: "Sony a7 iii",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-5.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-5.jpg",
            width: 2048,
            height: 1536,
          },
        ],
      },
      {
        index: 3,
        key: "geneva",
        location: "Geneva, Switzerland",
        date: "January, 2024",
        coverUrl: BASE_URL + "/albums/geneva/geneva-2.jpg",
        photos: [
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/geneva/geneva-2.jpg",
            largeUrl: BASE_URL + "/albums/geneva/geneva-2.jpg",
            width: 2048,
            height: 1536,
          },
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/geneva/geneva-1.jpg",
            largeUrl: BASE_URL + "/albums/geneva/geneva-1.jpg",
            width: 2048,
            height: 1536,
          },
        ],
      },
    ],
  };
}

export const downloadAlbum = (album: IAlbum) => {
  console.log("Downloading album", album.key);
};

export const downloadPhoto = (photo: IPhoto) => {
  console.log("Downloading photo", photo.largeUrl);
};
