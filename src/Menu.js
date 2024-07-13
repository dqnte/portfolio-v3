import "./Menu.scss";

import { useState, useEffect } from "react";

import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu(props) {
  const { show, setShowMenu } = props;

  const closeMenu = () => {
    setShowMenu(false);
  };

  const [hoverPage, setHoverPage] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const key = location.pathname.split("/")[1];

    switch (key) {
      case "":
        setHoverPage("home");
        break;
      case "photo":
        setHoverPage("photo");
        break;
      case "about":
        setHoverPage("about");
        break;
      default:
        setHoverPage("home");
        break;
    }
  }, [location]);

  const SLIDE_IN = 0.2;
  const TEXT_IN = 0.025;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="Menu"
          initial={{ height: "0vh" }}
          animate={{ height: "100vh", transition: { duration: SLIDE_IN } }}
          exit={{ height: "0vh", transition: { delay: TEXT_IN * 2 } }}
        >
          <motion.div
            className="Menu__Pages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: SLIDE_IN + TEXT_IN } }}
            exit={{ opacity: 0 }}
          >
              <Link
                to="/"
                className={`Menu_Link ${hoverPage === "home" ? "selected" : ""}`}
                onClick={closeMenu}
              >
                <span className="Menu_Link_Text">home</span>
              </Link>
              <h1> • </h1>
              <Link
                to="/photo"
                className={`Menu_Link ${hoverPage === "photo" ? "selected" : ""}`}
                onClick={closeMenu}
              >
                <span className="Menu_Link_Text">photo</span>
              </Link>
            <h1> • </h1>
            <Link
              to="/about"
              className={`Menu_Link ${hoverPage === "about" ? "selected" : ""}`}
              onClick={closeMenu}
            >
              <span className="Menu_Link_Text">about</span>
            </Link>
          </motion.div>
          <motion.div
            className="Menu__Socials"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: SLIDE_IN + TEXT_IN + 0.025 },
            }}
            exit={{ opacity: 0 }}
          >
            <a
              href="https://www.instagram.com/dantistador/"
              className="Menu__Socials_Link"
            >
              instagram
            </a>
            <a
              href="https://www.linkedin.com/in/dante-m-tobar/"
              className="Menu__Socials_Link"
            >
              linkedin
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
