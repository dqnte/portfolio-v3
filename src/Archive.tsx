import { IAlbum } from "./utilities";

import Riser from "./components/Riser";
import Image from "./Image";
import { useLocation, type Location, Link } from "react-router";
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
      <h1 className={"Archive__table_header"}>
        <Link to={"/archive"}>archive/</Link>
        {selectedAlbum?.key}
      </h1>
      {selectedAlbum ? (
        <Riser key={"Archive__album"}>
          <div className={"Archive__album_container"}>
            {selectedAlbum.photos.map((photo) => (
              <Image
                key={photo.smallUrl}
                className={"Archive__image"}
                photo={photo}
              />
            ))}
          </div>
        </Riser>
      ) : (
        <Riser key={"Archive__table"}>
          <ul className={"Archive__table_list"}>
            {albums.map((album) => (
              <li key={album.key}>
                <Link to={`/archive/${album.key}`}>{album.key}</Link>
              </li>
            ))}
          </ul>
        </Riser>
      )}
    </div>
  );
}
