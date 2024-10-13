import "./constants.scss";
import "./Home.scss";

import { motion, AnimatePresence } from "framer-motion";

import Arrow from "@mui/icons-material/ArrowForward";
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
