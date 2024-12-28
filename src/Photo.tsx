import { IAlbum } from "./utilities";
import Album from "./Album";
import { useLocation } from "react-router";
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

  const displayableAlbums = albums.filter(
    (album) => album.display === "all" || !album.display,
  );

  return (
    <AnimatePresence>
      <Riser>
        <div className={`Photo ${!selectedAlbum ? "show-none" : ""}`}>
          {!selectedAlbum && (
            <motion.div className="Photo__empty">
              <div className={"Photo__empty_title"}>
                <h1>Dante Tobar</h1>
              </div>
            </motion.div>
          )}
          {selectedAlbum && <Album album={selectedAlbum} />}
          <Carousel albums={displayableAlbums} selectedAlbum={selectedAlbum} />
        </div>
      </Riser>
    </AnimatePresence>
  );
}
