import "./constants.scss";
import "./Home.scss";

import { motion, AnimatePresence } from "framer-motion";

import Arrow from "@mui/icons-material/ArrowForward";

import { Link } from "react-router-dom";

import { page } from "./transitions";

export default function Home(props) {
  const { album } = props;
  const cover = album.photos[4];

  const animateButton = (e) => {};

  return (
    <AnimatePresence>
      <motion.div
        className="Home"
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
      >
        <div className="Home__Image">
          <img
            className="Home__Image_obj landscape"
            src={"./background_landscape.jpg"}
            alt="Chamonix"
          />
          <img
            className="Home__Image_obj portrait"
            src={"./background_portrait.jpg"}
            alt="Chamonix"
          />
        </div>
        <div className="Home__Footer">
          <Link className="Home__Footer_Link" to="/photo">
            photography
            <Arrow />
          </Link>
          <Link to="/about" className="Home__Footer_Link">
            about
            <Arrow />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
