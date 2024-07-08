import "./constants.scss";
import "./Photo.scss";
import Album from "./Album";
import { page } from "./transitions";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPhotoManifest } from "./utilities.ts";

export default function Photo() {
  const location = useLocation();
  const { albums } = fetchPhotoManifest();

  const [selectedAlbum, setAlbum] = useState(null);

  useEffect(() => {
    if (location.pathname === "/photo") {
      setAlbum(null);
    } else {
      const key = location.pathname.split("/")[2];
      const album = albums.find((album) => album.key === key);
      setAlbum(album);
    }
  }, [location]);

  return (
    <AnimatePresence>
      <motion.div
        className="Photo"
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
              <img
                src={album.coverUrl}
                alt={album.location}
                className={`${album.index === selectedAlbum?.index || !selectedAlbum ? "show" : ""} Photo__preview__image`}
              />
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
