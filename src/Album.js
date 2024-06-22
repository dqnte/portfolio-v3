import "./Album.scss";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Album(props) {
  const { album } = props;

  useEffect(() => {}, [album]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="Album"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
        exit={{ opacity: 0, y: 10 }}
      >
        <h2 className="Album__title">{album.location}</h2>
        <div className="Album__carousel">
          {album.photos.map((photo, index) => (
            <img key={index} src={photo.smallUrl} alt={photo.title} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
