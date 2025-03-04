import { IAlbum, findAlbumFromLocation } from "../utilities";
import PhotoMobile from "./Mobile";
import { useLocation } from "react-router";
import AlbumPreview from "./AlbumPreview";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useBreakpoint } from "../hooks";
import Riser from "../components/Riser";
import PhotoGrid from "../components/PhotoGrid";
import ScrollTop from "../components/ScrollTop";

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

  const breakpoint = useBreakpoint();

  return (
    <AnimatePresence>
      <Riser>
        {breakpoint === "mobile" ? (
          <PhotoMobile albums={displayableAlbums} />
        ) : (
          <AnimatePresence>
            <Riser motionKey={selectedAlbum?.key}>
              <div className={`Photo ${!selectedAlbum ? "show-none" : ""}`}>
                <h1 className={"Photo__title"}>
                  {selectedAlbum?.location ?? "Dante Tobar"}
                </h1>
                <div className={"Photo-container"}>
                  {selectedAlbum ? (
                    <PhotoGrid photos={selectedAlbum.photos} numCols={2} />
                  ) : (
                    <AlbumPreview
                      albums={displayableAlbums}
                      selectedAlbum={selectedAlbum}
                    />
                  )}
                </div>
              </div>
            </Riser>
          </AnimatePresence>
        )}
      </Riser>
      <ScrollTop />
    </AnimatePresence>
  );
};

export default Photo;
