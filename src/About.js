import { motion, AnimatePresence } from "framer-motion";

import "./About.scss";


import { page } from "./transitions";
export default function About() {
  return (
    <AnimatePresence>
      <motion.div
        className="About"
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
      >
        <p>Dante Tobar is a award winning mouth breather</p>
      </motion.div>
    </AnimatePresence>
  );
}
