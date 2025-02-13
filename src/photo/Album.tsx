import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useMotionValueEvent,
  type AnimationControls,
  type MotionValue,
} from "framer-motion";
import Image from "../components/Image";
import East from "@mui/icons-material/East";
import West from "@mui/icons-material/West";
import Close from "@mui/icons-material/Close";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { IAlbum, IPhoto } from "../utilities";

import { useEffect, useState, useRef } from "react";

const Controls = ({
  carouselRef,
  controls,
  scrollX,
}: {
  carouselRef: React.RefObject<HTMLDivElement>;
  controls: AnimationControls;
  scrollX: MotionValue<number>;
}) => {
  const [position, setPosition] = useState<"left" | "right" | "center">("left");

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = (window.innerWidth * 5) / 8;

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

  useMotionValueEvent(scrollX, "change", (latest) => {
    if (typeof latest !== "number") return;

    if (latest === 0) {
      setPosition("left");
    } else if (
      latest + 1 >=
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    ) {
      setPosition("right");
    } else {
      setPosition("center");
    }
  });

  return (
    <div className="Album-controls">
      <button
        className={"Album-controls__btn"}
        onClick={() => scroll("left")}
        disabled={position === "left"}
      >
        <West />
      </button>
      <button
        className={"Album-controls__btn"}
        onClick={() => scroll("right")}
        disabled={position === "right"}
      >
        <East />
      </button>
    </div>
  );
};

export default function Album({ album }: { album: IAlbum }) {
  const carouselRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const controls = useAnimation();

  // resets the scroll position of the carousel when the album changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [album.key]);

  const { scrollX } = useScroll({
    container: carouselRef,
  });

  /*
   * This functions finds the correct size for the image to fit the screen
   * Using the aspect ratio, the function determines if there's more space for the
   * image label in portrait or landscape mode.
   */
  const sizeImage = (image: HTMLImageElement) => {
    // constants defined in CSS
    const gutter = 20;
    const labelHeight = gutter * 4;
    const closeButtonWidth = 45;

    const aspectRatio = image.naturalWidth / image.naturalHeight;

    const windowWidth =
      document.documentElement.clientWidth - closeButtonWidth * 2;
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

  const onUpdate = (latest: { scrollOffset: number }) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = latest.scrollOffset;
    }
  };

  const openPhoto = (photo: IPhoto) => {
    const index = album.photos.indexOf(photo);
    setSelectedIndex(index);
  };

  const nextPhoto = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  const prevPhoto = () => {
    setSelectedIndex(selectedIndex - 1);
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
          <h1>{album.location}</h1>
          <Controls
            carouselRef={carouselRef}
            controls={controls}
            scrollX={scrollX}
          />
        </div>
        <motion.div
          className="Album-carousel"
          ref={carouselRef}
          custom={{ scrollOffset: 0 }}
          animate={controls}
          onUpdate={onUpdate}
        >
          {album.photos.map((photo) => (
            <div
              className="Album-carousel__photo"
              key={photo.smallUrl}
              onClick={() => openPhoto(photo)}
            >
              <Image sizeOn={"h"} photo={photo} alt={photo.title} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {selectedIndex !== null && (
        <motion.div
          key="selected"
          className={"Album-overlay"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0 }}
        >
          <button
            className={"Album-overlay__controls close"}
            onClick={() => setSelectedIndex(null)}
          >
            <Close />
          </button>
          <button
            disabled={selectedIndex === album.photos.length - 1}
            className={"Album-overlay__controls next"}
            onClick={nextPhoto}
          >
            <ChevronRight />
          </button>
          <button
            disabled={selectedIndex === 0}
            className={"Album-overlay__controls prev"}
            onClick={prevPhoto}
          >
            <ChevronLeft />
          </button>
          <motion.div
            className={`Album-overlay__photo ${orientation}`}
            initial={{ y: 10 }}
            animate={{ y: 0, transition: { duration: 0.2 } }}
            exit={{ y: 10 }}
          >
            <div className="Album-overlay__image">
              <Image
                sizeOn={"h"}
                photo={album.photos[selectedIndex]}
                alt={album.photos[selectedIndex]?.title}
                onLoad={(e) => sizeImage(e.target)}
              />
              <div className="Album-overlay__info">
                <h4>{album.date}</h4>
                <h4>{album.photos[selectedIndex].camera}</h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
