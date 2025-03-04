import Image from "../components/Image";
import { Link } from "react-router";
import { useState } from "react";
import { IAlbum } from "../utilities";

const AlbumPreview = ({
  albums,
  selectedAlbum,
}: {
  albums: IAlbum[];
  selectedAlbum: IAlbum;
}) => {
  const [globalHover, setGlobalHover] = useState(false);
  const [hoverAlbum, setHover] = useState<IAlbum | null>(null);

  const showHoverStyles = (album: IAlbum) => {
    if (!globalHover && !selectedAlbum) return true;
    if (!globalHover && selectedAlbum) return selectedAlbum.key === album.key;
    if (globalHover && !selectedAlbum && hoverAlbum) {
      return hoverAlbum.key === album.key;
    }

    if (globalHover && selectedAlbum && !hoverAlbum) {
      return false;
    }

    if (globalHover && selectedAlbum && hoverAlbum) {
      return hoverAlbum.key === album.key;
    }
  };

  return (
    <div
      className="AlbumPreview"
      onMouseEnter={() => setGlobalHover(true)}
      onMouseLeave={() => setGlobalHover(false)}
    >
      {albums.map((album) => (
        <Link
          to={`/photo/${album.key}`}
          key={album.key}
          className={"AlbumPreview__link"}
        >
          <Image
            sizeOn={"w"}
            onMouseEnter={() => setHover(album)}
            onMouseLeave={() => setHover(null)}
            photo={album.photos[0]}
            alt={album.location}
            className={`${showHoverStyles(album) ? "show" : ""} AlbumPreview__image`}
          />
        </Link>
      ))}
    </div>
  );
};

export default AlbumPreview;
