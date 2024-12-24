import { motion, AnimatePresence } from "framer-motion";

import Carousel from "./Carousel";

import { page } from "./transitions";

export default function Home({ albums }) {
  return (
    <AnimatePresence>
      <motion.div
        className="Home"
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
      >
      <div className="Home__carousel">
        <Carousel albums={[...albums, ...albums, ...albums]} />
    </div>
      </motion.div>
    </AnimatePresence>
  );
}
