import "./constants.scss";
import "./Home.scss";

import { motion, AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";

import { page } from "./transitions";

export default function Home(props) {
  const { album } = props;

  return (
    <AnimatePresence>
      <motion.div
        className="Home"
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
      >
        <div className="Home__Image">
          <img className="Home__Image_obj" src={album.coverUrl} />
        </div>
        <div className="Home__Footer">
          <Link className="Home__Footer_Link" to="/photo">
            photography
          </Link>
          <Link to="/about" className="Home__Footer_Link">
            about
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
