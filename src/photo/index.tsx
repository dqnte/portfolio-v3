import { IAlbum, findAlbumFromLocation } from "../utilities";
import Album from "./Album";
import PhotoMobile from "./Mobile";
import { useLocation } from "react-router";
import AlbumPreview from "./AlbumPreview";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Riser from "../components/Riser";

const Photo = ({ albums }: { albums: IAlbum[] }) => {
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
          {selectedAlbum ? (
            <Album album={selectedAlbum} />
          ) : (
            <motion.div className="Photo-empty">
              <h1 className={"Photo-empty__title"}>Dante Tobar</h1>
            </motion.div>
          )}
          <AlbumPreview
            albums={displayableAlbums}
            selectedAlbum={selectedAlbum}
          />
        </div>
        <PhotoMobile albums={displayableAlbums} />
      </Riser>
    </AnimatePresence>
  );
};

export default Photo;
