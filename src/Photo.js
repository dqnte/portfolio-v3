import "./constants.scss";
import "./Photo.scss";
import Album from "./Album";
import { page } from "./transitions";
import { useLocation } from "react-router-dom";
import Carousel from "./Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Riser from "./components/Riser";

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
      <Riser>
        <div className={`Photo ${!selectedAlbum ? "show-none" : ""}`}>
          {!selectedAlbum && (
            <motion.div className="Photo__empty">
              <h1>Dante Tobar</h1>
            </motion.div>
          )}
          {selectedAlbum && <Album album={selectedAlbum} />}
          <Carousel
            albums={albums}
            selectedAlbum={selectedAlbum}
            hoverAlbum={hoverAlbum}
            setHoverAlbum={setHoverAlbum}
          />
        </div>
      </Riser>
    </AnimatePresence>
  );
}
