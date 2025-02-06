import { IAlbum, findAlbumFromLocation } from "./utilities";

import Riser from "./components/Riser";
import Image from "./components/Image";
import { useLocation, Link } from "react-router";
import { useEffect, useState, useMemo } from "react";

const ArchiveAlbum = ({ album }: { album: IAlbum }) => {
  return (
    <Riser motionKey={"Arc-album"}>
      <h2 className={"Arc-table__title"}>
        <Link to={"/archive"} className={"Arc__link"}>
          {".."}
        </Link>{" "}
        / {album.key}
      </h2>
      <div className={"Arc-album"}>
        {album.photos.map((photo) => (
          <Image
            key={photo.smallUrl}
            className={"Arc-album__image"}
            photo={photo}
            sizeOn={"w"}
          />
        ))}
      </div>
    </Riser>
  );
};

const keyToDate = (key: string) => {
  const [year, month, day] = key.split("-").slice(0, 3);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return `${months[parseInt(month) - 1]} ${day}, 20${year}`;
};

const ArchiveTable = ({ albums }: { albums: IAlbum[] }) => {
  const albumsByYear = useMemo(() => {
    const byYear = albums.reduce(
      (acc, album) => {
        const year = album.key.split("-")[0];
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(album);
        return acc;
      },
      {} as { [key: string]: IAlbum[] },
    );

    // sort albums by date
    Object.keys(byYear).forEach((year) => {
      byYear[year].sort((a, b) => {
        return a.key > b.key ? -1 : 1;
      });
    });

    // sort years
    return Object.entries(byYear).sort((a, b) => {
      return a[0] > b[0] ? -1 : 1;
    });
  }, [albums]);

  return (
    <Riser motionKey={"Arc-table"}>
      {albumsByYear.map(([year, albums]) => {
        return (
          <div>
            <h2 className={"Arc-table__title"}>20{year}</h2>
            <div className={"Arc-table__year"}>
              {albums.map((album) => {
                return (
                  <Link
                    className={"Arc-table__year__album"}
                    to={`/archive/${album.key}`}
                    style={{
                      backgroundImage: `url(${album.photos[0].smallUrl})`,
                    }}
                  >
                    <div className={"Arc-table__year__overlay"}>
                      <p>{keyToDate(album.key)}</p>
                      <p>{`${album.photos.length} PHOTO${album.photos.length > 1 ? "S" : ""}`}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </Riser>
  );
};

const Archive = ({ albums }: { albums: IAlbum[] }) => {
  const location = useLocation();
  const [selectedAlbum, setAlbum] = useState<IAlbum>(
    findAlbumFromLocation(location, albums),
  );

  useEffect(() => {
    if (location.pathname === "/archive") {
      window.scrollTo(0, 0);
      setAlbum(null);
    } else {
      const currentAlbum = findAlbumFromLocation(location, albums);
      setAlbum(currentAlbum);
    }
  }, [location, albums]);

  return (
    <div className={"Arc"}>
      {selectedAlbum ? (
        <ArchiveAlbum album={selectedAlbum} />
      ) : (
        <ArchiveTable albums={albums} />
      )}
    </div>
  );
};

export default Archive;
