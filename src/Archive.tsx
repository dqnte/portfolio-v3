import "./Archive.scss";
import { IAlbum } from "./utilities";

import Image from "./Image";
import { useLocation, type Location } from "react-router-dom";
import { useEffect, useState } from "react";

const findAlbumFromLocation = (location: Location, albums: IAlbum[]) => {
  const key = location.pathname.split("/")[2];
  return albums.find((album) => album.key === key);
};

export default function Archive({ albums }: { albums: IAlbum[] }) {
  const location = useLocation();
  const [selectedAlbum, setAlbum] = useState<IAlbum>(
    findAlbumFromLocation(location, albums),
  );

  useEffect(() => {
    if (location.pathname === "/archive") {
      setAlbum(null);
    } else {
      const currentAlbum = findAlbumFromLocation(location, albums);
      setAlbum(currentAlbum);
    }
  }, [location, albums]);

  return (
    <div className={"Archive Archive__table"}>
      <h1>
        <a href={"/archive"}>archive/</a>{selectedAlbum?.key}
      </h1>
      {selectedAlbum ? (
        <div className={"Archive__album_container"}>
          {selectedAlbum.photos.map((photo) => (
            <Image className={"Archive__image"} photo={photo} />
          ))}
        </div>
      ) : (
        <ul className={"Archive__table_list"}>
          {albums.map((album) => (
            <li key={album.key}>
              <a href={`/archive/${album.key}`}>{album.key}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
