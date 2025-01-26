import { IAlbum, findAlbumFromLocation } from "./utilities";

import Riser from "./components/Riser";
import Image from "./components/Image";
import { useLocation, Link } from "react-router";
import { useEffect, useState } from "react";

const ArchiveAlbum = ({ album }: { album: IAlbum }) => {
  return (
    <Riser motionKey={"Arc-album"}>
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

const ArchiveTable = ({ albums }: { albums: IAlbum[] }) => {
  return (
    <Riser motionKey={"Arc-table"}>
      <ul className={"Arc-table__list"}>
        {albums.map((album) => (
          <li key={album.key} className="Arc-table__item">
            <Link className={"Arc__link"} to={`/archive/${album.key}`}>
              {album.key}
            </Link>
          </li>
        ))}
      </ul>
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
      <h1 className={"Arc__header"}>
        <Link className={"Arc__link"} to={"/archive"}>
          archive/
        </Link>
        {selectedAlbum?.key}
      </h1>
      {selectedAlbum ? (
        <ArchiveAlbum album={selectedAlbum} />
      ) : (
        <ArchiveTable albums={albums} />
      )}
    </div>
  );
};

export default Archive;
