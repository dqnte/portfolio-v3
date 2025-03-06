import { IAlbum } from "../utilities";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "../components/Image";

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
    <div className={"Album-mobile"}>
      <h4 className={"Album-mobile__title"}>{album.location}</h4>
      <motion.div
        key={`${album.key}-scroller`}
        ref={ref}
        className={"Album-photos"}
      >
        {album.photos.map((photo, i) => {
          return (
            <div
              className={"Album-photos__container"}
              key={`photo-${photo.smallUrl}`}
            >
              <div className={"Album-photos__image"}>
                <Image
                  sizeOn={"w"}
                  inViewRef={ref}
                  fetchPriority={i === 0 ? "high" : "low"}
                  key={`image-${photo.smallUrl}`}
                  photo={photo}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
      <div className={"Album-mobile__count"}>
        <p>
          {index} / {album.photos.length}
        </p>
      </div>
    </div>
  );
};

const PhotoMobile = ({ albums }: { albums: IAlbum[] }) => {
  return (
    <div className={"Photo-mobile"}>
      <div className={"Photo-mobile__bio"}>
        <p>photographer - engineer</p>
        <p>based in nyc</p>
      </div>
      <span className="Photo-mobile__topline" />
      {albums.map((album) => {
        return <AlbumMobile key={album.key} album={album} />;
      })}
    </div>
  );
};

export default PhotoMobile;
