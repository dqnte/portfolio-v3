import { useState, useEffect } from "react";
import "./Header.scss";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function Header(props) {
  const { useDarkTheme, setDarkTheme, toggleMenu, closeMenu, showMenu } = props;

  const [showDark, setShowDark] = useState(useDarkTheme);

  useEffect(() => {
    setShowDark(useDarkTheme);
  }, [useDarkTheme]);

  const handleEnter = (event) => {
    setShowDark(!showDark);
  };

  const handleLeave = (event) => {
    setShowDark(useDarkTheme);
  };

  return (
    <div className={`Header ${showMenu ? "menu-open" : "menu-closed"}`}>
      <div
        className="Header__Mode"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => setDarkTheme(!useDarkTheme)}
      >
        <button className={`Header__Mode_button ${showDark ? "show" : ""}`}>
          <DarkMode />
        </button>
        <button className={`Header__Mode_button ${!showDark ? "show" : ""}`}>
          <LightMode />
        </button>
      </div>
      <Link to="/" className="Header__Name" onClick={closeMenu}>
        dante tobar
      </Link>
      <button className="Header__Menu" onClick={toggleMenu}>
        menu
      </button>
    </div>
  );
}

export default Header;
