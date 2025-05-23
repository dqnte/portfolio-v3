import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../components/Image";
import HoverButton from "../components/HoverButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Close from "@mui/icons-material/Close";
import { IPhoto, mapPhotosToColumns } from "../utilities";
import useKeypress from "../hooks/useKeypress";
import useBreakpoint from "../hooks/useBreakpoint";

import { useState } from "react";

const Overlay = ({
  photos,
  selectedIndex,
  closeOverlay,
  nextPhoto,
  prevPhoto,
}: {
  photos: IPhoto[];
  selectedIndex: number;
  closeOverlay: () => void;
  nextPhoto: () => void;
  prevPhoto: () => void;
}) => {
  const [orientation, setOrientation] = useState(null);
  const [canClose, setCanClose] = useState(false);

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
      document.documentElement.clientWidth - closeButtonWidth - gutter * 4;
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

  useKeypress("Escape", closeOverlay);
  useKeypress("ArrowRight", nextPhoto);
  useKeypress("ArrowLeft", prevPhoto);

  return (
    <motion.div
      key="selected"
      className={"PhotoGrid-overlay"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      <HoverButton
        className={"PhotoGrid-overlay__controls close"}
        onClick={closeOverlay}
        component={<Close />}
        text={"exit"}
        hovered={canClose}
      />
      <HoverButton
        disabled={selectedIndex === photos.length - 1}
        className={"PhotoGrid-overlay__controls next"}
        onClick={nextPhoto}
        component={<ChevronRight />}
        text={"next"}
        direction={"right"}
      />
      <HoverButton
        disabled={selectedIndex === 0}
        className={"PhotoGrid-overlay__controls prev"}
        onClick={prevPhoto}
        component={<ChevronLeft />}
        text={"prev"}
        direction={"left"}
      />
      <AnimatePresence>
        <motion.div
          key={selectedIndex}
          className={`PhotoGrid-overlay__photo ${orientation}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0 }}
          onClick={closeOverlay}
          onMouseEnter={() => setCanClose(true)}
          onMouseLeave={() => setCanClose(false)}
        >
          <div
            className="PhotoGrid-overlay__image"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setCanClose(false)}
            onMouseLeave={() => setCanClose(true)}
          >
            <Image
              sizeOn={"h"}
              photo={photos[selectedIndex]}
              alt={photos[selectedIndex]?.title}
              onLoad={(e) => sizeImage(e.target)}
            />
            <div className="PhotoGrid-overlay__info">
              <h4>{photos[selectedIndex].date}</h4>
              <div className="PhotoGrid-overlay__info_count">
                <span>{selectedIndex + 1}</span>
                <span>•</span>
                <span>{photos.length}</span>
              </div>
              <h4>{photos[selectedIndex].camera}</h4>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default function PhotoGrid({
  photos,
  numCols,
}: {
  photos: IPhoto[];
  numCols?: number;
}) {
  const numColumns = numCols || 3;
  const columns = mapPhotosToColumns(photos, numColumns);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const breakpoint = useBreakpoint();

  const openPhoto = (photo: IPhoto) => {
    if (breakpoint === "mobile") {
      return;
    }
    const index = photos.indexOf(photo);
    // disable scrolling
    document.body.style.overflow = "hidden";

    setSelectedIndex(index);
  };

  const nextPhoto = () => {
    setSelectedIndex((prevIndex) => {
      if (prevIndex === photos.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
  };

  const prevPhoto = () => {
    setSelectedIndex((prevIndex) => {
      if (prevIndex === 0) {
        return prevIndex;
      }
      return prevIndex - 1;
    });
  };

  const closeOverlay = () => {
    // enable scrolling
    document.body.style.overflow = "auto";
    setSelectedIndex(null);
  };

  const gridTemplateColumns = useMemo(() => {
    if (photos.length === 1) {
      const side = (numColumns - 1) / 2;

      return [`${side}fr`, `1fr`, `${side}fr`].join(" ");
    }

    return [...Array(numColumns)].map(() => "1fr").join(" ");
  }, [numColumns]);

  return (
    <div
      className={`PhotoGrid ${selectedIndex && "overlay-open"}`}
      style={{
        gridTemplateColumns,
      }}
    >
      {Object.values(columns).map((column, index) => {
        return (
          <div
            className="PhotoGrid__column"
            key={index}
            style={{
              gridColumnStart: photos.length === 1 ? 2 : undefined,
            }}
          >
            {column.map((photo) => (
              <div
                className="PhotoGrid__photo"
                key={photo.smallUrl}
                onClick={() => openPhoto(photo)}
                style={{
                  cursor: breakpoint === "mobile" ? "default" : "pointer",
                }}
              >
                <Image sizeOn={"w"} photo={photo} alt={photo.title} />
              </div>
            ))}
          </div>
        );
      })}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Overlay
            photos={photos}
            selectedIndex={selectedIndex}
            closeOverlay={closeOverlay}
            nextPhoto={nextPhoto}
            prevPhoto={prevPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
