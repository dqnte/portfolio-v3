import Image from "./Image";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Carousel = ({ albums, selectedAlbum }) => {
  const [globalHover, setGlobalHover] = useState(false);
  const [hoverAlbum, setHover] = useState(null);

  const showHoverStyles = (album) => {
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
    </div>
  );
};

export default Carousel;
