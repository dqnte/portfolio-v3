import { useState, useEffect } from "react";
import "./Header.scss";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Mode({ useDarkTheme, setDarkTheme }) {
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
  );
}

function Name({closeMenu, headerState}) {
  return (
    <Link to="/" className={`Header__Name ${headerState === 'hidden' ? 'hidden' : ''}`}>
      dante tobar
    </Link>
  );
}

function Menu({toggleMenu}) {
  return <button className="Header__Menu" onClick={toggleMenu}>
    menu
  </button>;
}

function Header({ useDarkTheme, setDarkTheme, toggleMenu, closeMenu, showMenu, albums}) {
  const location = useLocation();
  const [headerState, setHeaderState] = useState("hidden");

  useEffect(() => {
    if (location.pathname === "/") {
      setHeaderState("hidden");
    } else {
      setHeaderState("default");
    }
  }, [location, albums]);

  return (
    <div className={`Header ${showMenu ? "menu-open" : "menu-closed"}`}>
      {/* <Mode useDarkTheme={useDarkTheme} setDarkTheme={setDarkTheme} /> */}
      <Name closeMenu={closeMenu} headerState={headerState}/>
      {/* <Menu toggleMenu={toggleMenu} /> */}
    </div>
  );
}

export default Header;
