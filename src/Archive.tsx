import { IAlbum, findAlbumFromLocation } from "./utilities";

import Riser from "./components/Riser";
import ScrollTop from "./components/ScrollTop";
import PhotoGrid from "./components/PhotoGrid";
import Title from "./components/Title";
import { useLocation, Link } from "react-router";
import { useEffect, useState, useMemo } from "react";
import { useBreakpoint } from "./hooks";
import { useNavigate } from "react-router";

const ArchiveAlbum = ({
  album,
  albums,
}: {
  album: IAlbum;
  albums: IAlbum[];
}) => {
  const breakpoint = useBreakpoint();
  const navigate = useNavigate();
  const numCols = breakpoint === "mobile" ? 1 : 2;

  const handleBack = () => {
    navigate("/archive");
  };

  const sortedAlbums = albums.sort((a, b) => {
    return a.key > b.key ? -1 : 1;
  })

  const currentIndex = sortedAlbums.findIndex((a) => a.key === album.key);
  const nextAlbum = sortedAlbums[currentIndex + 1];
  const handlePrev = () => {
    navigate(`/archive/${prevAlbum?.key}`);
  };
  const prevAlbum = sortedAlbums[currentIndex - 1];
  const handleNext = () => {
    navigate(`/archive/${nextAlbum?.key}`);
  };

  return (
    <Riser motionKey={"Arc-album"}>
      <div className={"Arc-album__container"}>
        <Title
          text={album.key}
          handleBack={handleBack}
          handlePrev={prevAlbum && handlePrev}
          handleNext={nextAlbum && handleNext}
        />
      </div>
      <Riser motionKey={album.key}>
        <div className={"Arc-album__container"}>
          <PhotoGrid photos={album.photos} numCols={numCols} />
        </div>
      </Riser>
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
        if (album.display === 'hidden') return acc;

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

    const etc = byYear["etc..."];

    const sorted = Object.entries(byYear)
      // pull out etc since sorting didn't work on firefox
      .filter((a) => a[0] !== "etc...")
      .sort((a, b) => {
        return a[0] > b[0] ? -1 : 1;
      });

    if (etc) sorted.push(["etc...", etc]);

    return sorted;
  }, [albums]);

  return (
    <Riser motionKey={"Arc-table"}>
      {albumsByYear.map(([year, albums]) => {
        return (
          <div key={year} className={"Arc-table"}>
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
    window.scrollTo(0, 0);
    if (location.pathname === "/archive") {
      setAlbum(null);
    } else {
      const currentAlbum = findAlbumFromLocation(location, albums);
      setAlbum(currentAlbum);
    }
  }, [location, albums]);

  return (
    <>
      <div className={"Arc"}>
        {selectedAlbum ? (
          <ArchiveAlbum album={selectedAlbum} albums={albums} />
        ) : (
          <ArchiveTable albums={albums} />
        )}
      </div>
      <ScrollTop />
    </>
  );
};

export default Archive;
