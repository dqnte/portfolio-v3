import { IAlbum, findAlbumFromLocation, IPhoto } from "./utilities";

import Riser from "./components/Riser";
import Image from "./components/Image";
import { useLocation, Link } from "react-router";
import { useEffect, useState, useMemo } from "react";

import { useBreakpoint } from "./hooks";

const ArchiveAlbum = ({ album }: { album: IAlbum }) => {
  const breakpoint = useBreakpoint();

  const columns = useMemo(() => {
    const numCols = breakpoint === "mobile" ? 1 : 2;
    const sortedColumns: Record<number, IPhoto[]> = {};
    const heights: Record<number, number> = {};

    for (let i = 0; i < numCols; i++) {
      sortedColumns[i] = [];
      heights[i] = 0;
    }

    album.photos.forEach((photo) => {
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
  }, [album.photos, breakpoint]);

  return (
    <Riser motionKey={"Arc-album"}>
      <h2 className={"Arc-album__title"}>
        <Link to={"/archive"} className={"Arc__link"}>
          {".."}
        </Link>{" "}
        / {album.key}
      </h2>
      <div className={"Arc-album"}>
        {Object.values(columns).map((column, i) => {
          return (
            <div className={"Arc-album__column"} key={i}>
              {column.map((photo) => {
                return (
                  <Image
                    key={photo.smallUrl}
                    photo={photo}
                    containerClassName={"Arc-album__photo"}
                    sizeOn={"w"}
                  />
                );
              })}
            </div>
          );
        })}
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
        let year = album.key.split("-")[0];

        if (Number(year) < 23) {
          year = "etc...";
        } else {
          year = "20" + year;
        }

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
      if (a[0] === "etc...") {
        return 1;
      }
      return a[0] > b[0] ? -1 : 1;
    });
  }, [albums]);

  return (
    <Riser motionKey={"Arc-table"}>
      {albumsByYear.map(([year, albums]) => {
        return (
          <div key={year}>
            <h2 className={"Arc-table__title"}>{year}</h2>
            <div className={"Arc-table__year"}>
              {albums.map((album) => {
                return (
                  <Link
                    key={album.key}
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
