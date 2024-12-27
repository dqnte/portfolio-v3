import Image from "./Image";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IAlbum } from "./utilities";

export const Carousel = ({
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
      className="Photo__preview"
      onMouseEnter={() => setGlobalHover(true)}
      onMouseLeave={() => setGlobalHover(false)}
    >
      {albums.map((album) => (
        <Link to={`/photo/${album.key}`} key={album.key}>
          <Image
            onMouseEnter={() => setHover(album)}
            onMouseLeave={() => setHover(null)}
            photo={album.photos[0]}
            alt={album.location}
            className={`${showHoverStyles(album) ? "show" : ""} Photo__preview__image`}
          />
          <span
            className={`${showHoverStyles(album) && selectedAlbum ? "show" : ""} Photo__preview__image__indicator`}
          />
        </Link>
      ))}
      <div className="Photo__preview_trailer" />
    </div>
  );
};

export default Carousel;
