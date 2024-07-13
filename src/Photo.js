import "./constants.scss";
import "./Photo.scss";
import Album from "./Album";
import Image from "./Image";
import { page } from "./transitions";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const findAlbumFromLocation = (location, albums) => {
  const key = location.pathname.split("/")[2];
  return albums.find((album) => album.key === key);
};

export default function Photo(props) {
  const location = useLocation();
  const { albums } = props;

  const [selectedAlbum, setAlbum] = useState(
    findAlbumFromLocation(location, albums),
  );
  const [hoverAlbum, setHoverAlbum] = useState(null);

  useEffect(() => {
    if (location.pathname === "/photo") {
      setAlbum(null);
      setHoverAlbum(null);
    } else {
      const currentAlbum = findAlbumFromLocation(location, albums);
      setAlbum(currentAlbum);
      setHoverAlbum(currentAlbum);
    }
  }, [location, albums]);

  return (
    <AnimatePresence>
      <motion.div
        className={`Photo ${!selectedAlbum ? "show-none" : ""}`}
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
      >
        {!selectedAlbum && (
          <motion.div className="Photo__empty">
            <h1>Photography</h1>
          </motion.div>
        )}
        {selectedAlbum && <Album album={selectedAlbum} />}
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
      </motion.div>
    </AnimatePresence>
  );
}
