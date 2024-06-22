const BASE_URL = "https://s3.us-west-1.amazonaws.com/dantetobar.com";

export interface IPhoto {
  camera: string;
  smallUrl: string;
  largeUrl: string;
  film?: string;
}

export interface IAlbum {
  index: number;
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
        location: "Chamonix, France",
        date: "January, 2024",
        coverUrl: BASE_URL + "/albums/chamonix/chamonix-5.jpg",
        photos: [
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-1.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-1.jpg",
          },
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-2.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-2.jpg",
          },

          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-3.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-3.jpg",
          },
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-4.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-4.jpg",
          },
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/chamonix/chamonix-5.jpg",
            largeUrl: BASE_URL + "/albums/chamonix/chamonix-5.jpg",
          },
        ],
      },
      {
        index: 2,
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
          },
          {
            camera: "Mamiya 645",
            film: "Porta 400",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-2.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-2.jpg",
          },

          {
            camera: "Sony a7 iii",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-3.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-3.jpg",
          },
          {
            camera: "Sony a7 iii",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-4.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-4.jpg",
          },
          {
            camera: "Sony a7 iii",
            smallUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-5.jpg",
            largeUrl:
              BASE_URL + "/albums/aiguille-du-midi/aiguille-du-midi-5.jpg",
          },
        ],
      },
      {
        index: 3,
        location: "Geneva, Switzerland",
        date: "January, 2024",
        coverUrl: BASE_URL + "/albums/geneva/geneva-2.jpg",
        photos: [
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/geneva/geneva-2.jpg",
            largeUrl: BASE_URL + "/albums/geneva/geneva-2.jpg",
          },
          {
            camera: "Sony a7 iii",
            smallUrl: BASE_URL + "/albums/geneva/geneva-1.jpg",
            largeUrl: BASE_URL + "/albums/geneva/geneva-1.jpg",
          },
        ],
      },
    ],
  };
}
