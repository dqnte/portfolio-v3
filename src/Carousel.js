import Image from "./Image";
import { Link } from "react-router-dom";

export const Carousel = ({
  albums,
  selectedAlbum,
  hoverAlbum,
  setHoverAlbum = () => {},
}) => {
  return (
    <div className="Photo__preview">
      {albums.map((album) => (
        <Link to={`/photo/${album.key}`} key={album.key}>
          <Image
            onMouseEnter={() => setHoverAlbum(album)}
            onMouseLeave={() => setHoverAlbum(selectedAlbum)}
            photo={album.photos[0]}
            alt={album.location}
            className={`${album.index === hoverAlbum?.index || !hoverAlbum ? "show" : ""} Photo__preview__image`}
          />
        </Link>
      ))}
    </div>
  );
};

export default Carousel;
