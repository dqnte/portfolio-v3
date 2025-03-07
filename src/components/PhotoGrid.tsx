import { motion, AnimatePresence } from "framer-motion";
import Image from "../components/Image";
import HoverButton from "../components/HoverButton";
import Close from "@mui/icons-material/Close";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { IPhoto, mapPhotosToColumns } from "../utilities";

import { useState } from "react";

export default function PhotoGrid({
  photos,
  numCols,
}: {
  photos: IPhoto[];
  numCols?: number;
}) {
  const numColumns = numCols || 3;
  const columns = mapPhotosToColumns(photos, numColumns);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [orientation, setOrientation] = useState(null);

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

  const openPhoto = (photo: IPhoto) => {
    const index = photos.indexOf(photo);
    // disable scrolling
    document.body.style.overflow = "hidden";

    setSelectedIndex(index);
  };

  const nextPhoto = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  const prevPhoto = () => {
    setSelectedIndex(selectedIndex - 1);
  };

  const closeOverlay = () => {
    // enable scrolling
    document.body.style.overflow = "auto";
    setSelectedIndex(null);
  };

  return (
    <div
      className={`PhotoGrid ${selectedIndex && "overlay-open"}`}
      style={{
        gridTemplateColumns: `${[...Array(numColumns)]
          .map(() => "1fr")
          .join(" ")}`,
      }}
    >
      {Object.values(columns).map((column, index) => {
        return (
          <div className="PhotoGrid__column" key={index}>
            {column.map((photo) => (
              <div
                className="PhotoGrid__photo"
                key={photo.smallUrl}
                onClick={() => openPhoto(photo)}
              >
                <Image sizeOn={"w"} photo={photo} alt={photo.title} />
              </div>
            ))}
          </div>
        );
      })}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="selected"
            className={"PhotoGrid-overlay"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
          >
            <button
              className="PhotoGrid-overlay__controls close"
              onClick={closeOverlay}
            >
              exit
            </button>
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
              >
                <div className="PhotoGrid-overlay__image">
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
        )}
      </AnimatePresence>
    </div>
  );
}
