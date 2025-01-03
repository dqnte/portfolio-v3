import { IAlbum } from "./utilities";
import Album from "./Album";
import Image from "./components/Image";
import { useLocation } from "react-router";
import Carousel from "./Carousel";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Riser from "./components/Riser";

const findAlbumFromLocation = (location, albums) => {
  const key = location.pathname.split("/")[2];
  return albums.find((album) => album.key === key);
};

const AlbumMobile = ({ album }: { album: IAlbum }) => {
  const ref = useRef(null);
  const [index, setIndex] = useState(1);

  const { scrollX } = useScroll({
    container: ref,
  });

  useMotionValueEvent(scrollX, "change", (latest) => {
    const width = window.innerWidth;
    const newIndex = Math.floor((latest + width / 2) / width) + 1;

    if (newIndex !== index) {
      setIndex(newIndex);
    }
  });

  return (
    <div className={"Album__mobile"}>
      <h4 className={"Album__mobile_title"}>{album.location}</h4>
      <motion.div
        key={`${album.key}-scroller`}
        ref={ref}
        className={"Album__mobile_photos"}
      >
        {album.photos.map((photo) => {
          return (
            <div
              className={"Album__mobile_photos_container"}
              key={`photo-${photo.smallUrl}`}
            >
              <Image
                key={`image-${photo.smallUrl}`}
                photo={photo}
                containerClassName={"Album__mobile_image"}
              />
            </div>
          );
        })}
      </motion.div>
      <div className={"Album__mobile_count"}>
        <p>
          {index} / {album.photos.length}
        </p>
      </div>
    </div>
  );
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
        <div className={"Photo__mobile"}>
          <div className={"Photo__mobile_bio"}>
            <h2>Dante Tobar</h2>
            <p>photographer - engineer</p>
            <p>based in nyc</p>
          </div>
          <span className="Photo__mobile_topline" />
          {displayableAlbums.map((album) => {
            return <AlbumMobile key={album.key} album={album} />;
          })}
        </div>
      </Riser>
    </AnimatePresence>
  );
}
