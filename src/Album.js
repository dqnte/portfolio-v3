import "./Album.scss";

import { motion, AnimatePresence } from "framer-motion";
import { downloadAlbum, downloadPhoto } from "./utilities.ts";
import {page } from "./transitions";
import Download from "@mui/icons-material/Download";

import { useEffect, useState, useRef } from "react";

export default function Album(props) {
  const { album } = props;
  const carouselRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="Album"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className="Album__title">
          <h2 className="Album__title_text">{album.location}</h2>
          <button className="Album__title_download">
            <Download onClick={() => downloadAlbum(album)} />
          </button>
        </div>
        <div className="Album__carousel" ref={carouselRef}>
          {album.photos.map((photo, index) => (
            <div
              className="Album__carousel_photo"
              key={photo.title}
              onClick={() => toggleSelect(photo)}
            >
              <img key={index} src={photo.smallUrl} alt={photo.title} />
            </div>
          ))}
        </div>
      </motion.div>

      {selectedPhoto && (
        <motion.div
          className="Album__carousel_photo selected"
          initial={page.initial}
          animate={page.animate}
          exit={page.exit}
          onClick={() => toggleSelect(selectedPhoto)}
        >
          <img src={selectedPhoto?.smallUrl} alt={selectedPhoto?.title} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
