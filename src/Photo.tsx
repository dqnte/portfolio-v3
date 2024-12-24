import "./Photo.scss";
import { IAlbum } from "./utilities";
import Album from "./Album";
import { useLocation } from "react-router-dom";
import Carousel from "./Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Riser from "./components/Riser";

const findAlbumFromLocation = (location, albums) => {
  const key = location.pathname.split("/")[2];
  return albums.find((album) => album.key === key);
};

export default function Photo({ albums }: { albums: IAlbum[] }) {
  const location = useLocation();

  const [selectedAlbum, setAlbum] = useState(
    findAlbumFromLocation(location, albums),
  );

  useEffect(() => {
    if (location.pathname === "/photo") {
      setAlbum(null);
    } else {
      const currentAlbum = findAlbumFromLocation(location, albums);
      setAlbum(currentAlbum);
    }
  }, [location, albums]);

  return (
    <AnimatePresence>
      <Riser>
        <div className={`Photo ${!selectedAlbum ? "show-none" : ""}`}>
          <Carousel albums={albums} selectedAlbum={selectedAlbum} />
          {!selectedAlbum && (
            <motion.div className="Photo__empty">
              <span className="Photo__empty_line" />
              <div className={"Photo__empty_title"}>
                <p>photography by</p>
                <h1>Dante Tobar</h1>
                <p>click on any of the images to view</p>
              </div>
            </motion.div>
          )}
          {selectedAlbum && <Album album={selectedAlbum} />}
        </div>
      </Riser>
    </AnimatePresence>
  );
}
