import "./Album.scss";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { page } from "./transitions";
import Image from "./Image";
import East from "@mui/icons-material/East";
import Download from "@mui/icons-material/Download";
import West from "@mui/icons-material/West";
import { downloadAlbum, downloadPhoto } from "./utilities.ts";

import { useEffect, useState, useRef } from "react";

export default function Album(props) {
  const { album } = props;
  const carouselRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const controls = useAnimation();

  // resets the scroll position of the carousel when the album changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [album.key]);

  const toggleSelect = (photo) => {
    if (selectedPhoto === photo) {
      setSelectedPhoto(null);
    } else {
      setSelectedPhoto(photo);
    }
  };

  /*
   * This functions finds the correct size for the image to fit the screen
   * Using the aspect ratio, the function determines if there's more space for the
   * image label in portrait or landscape mode.
   */
  const sizeImage = (image) => {
    // constants defined in CSS
    const gutter = 20;
    const labelHeight = gutter * 4;

    const aspectRatio = image.naturalWidth / image.naturalHeight;

    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;

    // using this because of the container Image component
    const parent = image.parentElement;

    const portraitHeight = (windowWidth - 2 * gutter) / aspectRatio;
    const landscapeWidth = (windowHeight - 2 * gutter) * aspectRatio;

    // the greater value here is the space from the image to the end of the window
    if (windowHeight - portraitHeight > windowWidth - landscapeWidth) {
      const height = windowHeight - 2 * gutter - labelHeight;
      const width = height * aspectRatio;

      // check that the label doesn't overflow the window
      if (width > windowWidth - 2 * gutter) {
        parent.style.width = `${windowWidth - 2 * gutter}px`;
        parent.style.height = `${(windowWidth - 2 * gutter) / aspectRatio}px`;
      } else {
        parent.style.height = `${height}px`;
        parent.style.width = `${width}px`;
      }
      setOrientation("portrait");
    } else {
      const width = windowWidth - 2 * gutter - labelHeight;
      const height = width / aspectRatio;

      // check that the label doesn't overflow the window
      if (height > windowHeight - 2 * gutter) {
        parent.style.height = `${windowHeight - 2 * gutter}px`;
        parent.style.width = `${(windowHeight - 2 * gutter) * aspectRatio}px`;
      } else {
        parent.style.width = `${width}px`;
        parent.style.height = `${height}px`;
      }
      setOrientation("landscape");
    }
  };

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const amount = window.innerWidth / 2;

    const currentScroll = carouselRef.current.scrollLeft;
    let targetOffset =
      direction === "left" ? currentScroll - amount : currentScroll + amount;

    if (
      targetOffset >
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    ) {
      targetOffset =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    } else if (targetOffset < 0) {
      targetOffset = 0;
    }

    controls.set({ scrollOffset: currentScroll });
    controls.start({
      scrollOffset: targetOffset,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

  const onUpdate = (latest) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = latest.scrollOffset;
    }
  };

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="Album"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className="Album__title">
          <h1 className="Album__title_text">{album.location}</h1>
          {/* <button className="Album__title_download"> */}
          {/*   <Download onClick={() => downloadAlbum(album)} /> */}
          {/* </button> */}
          <div className="Album__controls">
            <button onClick={() => scroll("left")}>
              <West />
            </button>
            <button onClick={() => scroll("right")}>
              <East />
            </button>
          </div>
        </div>
        <motion.div
          className="Album__carousel"
          ref={carouselRef}
          custom={{ scrollOffset: 0 }}
          animate={controls}
          onUpdate={onUpdate}
        >
          {album.photos.map((photo) => (
            <div
              className="Album__carousel_photo"
              key={photo.smallUrl}
              onClick={() => toggleSelect(photo)}
            >
              <Image photo={photo} alt={photo.title} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {selectedPhoto && (
        <motion.div
          key="selected"
          className={"Album__overlay"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`Album__carousel_photo selected ${orientation}`}
            initial={{ y: 10 }}
            animate={{ y: 0, transition: { duration: 0.2 } }}
            exit={{ y: 10 }}
            onClick={() => toggleSelect(selectedPhoto)}
          >
            <div
              className="Album__carousel_photo_container"
              onClick={(e) => e.preventDefault()}
            >
              <Image
                photo={selectedPhoto}
                alt={selectedPhoto?.title}
                onLoad={(e) => sizeImage(e.target)}
              />
              <div className="Album__carousel_photo_info">
                <h4>{album.date}</h4>
                <h4>{selectedPhoto.camera}</h4>
                {/* <h4>{selectedPhoto.film}</h4> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
