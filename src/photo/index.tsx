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
import { Link } from "react-router";

const Title = ({
  selectedAlbum,
  albums,
}: {
  selectedAlbum: IAlbum | null;
  albums: IAlbum[];
}) => {
  const prevAlbum = albums[albums.indexOf(selectedAlbum) - 1];
  const nextAlbum = albums[albums.indexOf(selectedAlbum) + 1];

  return (
    <div className={`Photo__title ${selectedAlbum ? "" : "empty"}`}>
      {selectedAlbum && (
        <div className={"Photo__title_buttons"}>
          {prevAlbum && <Link to={`/photo/${prevAlbum.key}`}>prev</Link>}
        </div>
      )}
      <h1>{selectedAlbum?.location ?? "Dante Tobar"}</h1>
      {selectedAlbum && (
        <div className={"Photo__title_buttons"}>
          {nextAlbum && <Link to={`/photo/${nextAlbum.key}`}>next</Link>}
        </div>
      )}
    </div>
  );
};

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

    window.scrollTo(0, 0);
  }, [location, albums]);

  const displayableAlbums = albums.filter(
    (album) => album.display === "all" || !album.display,
  );

  const breakpoint = useBreakpoint();

  return (
    <AnimatePresence key={"Photo"}>
      <Riser>
        {breakpoint === "mobile" ? (
          <PhotoMobile albums={displayableAlbums} />
        ) : (
          <AnimatePresence key={"PhotoDesktop"}>
            <Riser motionKey={selectedAlbum?.key}>
              <div className={`Photo ${!selectedAlbum ? "show-none" : ""}`}>
                <Title
                  selectedAlbum={selectedAlbum}
                  albums={displayableAlbums}
                />
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
      <ScrollTop key={'photo'}/>
    </AnimatePresence>
  );
};

export default Photo;
