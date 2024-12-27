import { useState, useEffect } from "react";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IAlbum } from "./utilities";

function Mode({
  useDarkTheme,
  setDarkTheme,
}: {
  useDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}) {
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
    <div className="Header__Mode">
      <button
        className={`Header__Mode_button ${showDark ? "selected" : ""}`}
        onClick={() => setDarkTheme(true)}
      >
        dark
        {/* <DarkMode /> */}
      </button>
      <button
        className={`Header__Mode_button ${!showDark ? "selected" : ""}`}
        onClick={() => setDarkTheme(false)}
      >
        light
        {/* <LightMode /> */}
      </button>
    </div>
  );
}

function Name({
  closeMenu,
  headerState,
}: {
  closeMenu: () => void;
  headerState: string;
}) {
  return (
    <div className={"Header__Name"}>
      <Link to="/">dante tobar</Link>
    </div>
  );
}

function Menu({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <button className="Header__Menu" onClick={toggleMenu}>
      menu
    </button>
  );
}

function Navigation() {
  const location = useLocation();
  const [hoverPage, setHoverPage] = useState(null);

  useEffect(() => {
    const key = location.pathname.split("/")[1];

    switch (key) {
      case "":
        setHoverPage("home");
        break;
      case "photo":
        setHoverPage("home");
        break;
      case "about":
        setHoverPage("about");
        break;
      case "archive":
        setHoverPage("archive");
        break;
      default:
        setHoverPage("home");
        break;
    }
  }, [location]);

  return (
    <div className="Header__Nav">
      <Link
        to="/archive"
        className={`${hoverPage === "archive" ? "selected" : ""}`}
      >
        archive
      </Link>
      <Link
        to="/about"
        className={`${hoverPage === "about" ? "selected" : ""}`}
      >
        about
      </Link>
    </div>
  );
}

interface HeaderProps {
  useDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  showMenu: boolean;
  albums: IAlbum[];
}

function Header({
  useDarkTheme,
  setDarkTheme,
  toggleMenu,
  closeMenu,
  showMenu,
  albums,
}: HeaderProps) {
  const location = useLocation();
  const [headerState, setHeaderState] = useState("hidden");

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/photo") {
      setHeaderState("hidden");
    } else {
      setHeaderState("default");
    }
  }, [location, albums]);

  return (
    <div className={`Header ${showMenu ? "menu-open" : "menu-closed"}`}>
      <Name closeMenu={closeMenu} headerState={headerState} />
      <div className="Header__Text">
        <p>photographer - engineer </p>
        <p>based in nyc</p>
      </div>
      <Navigation />
      <Mode useDarkTheme={useDarkTheme} setDarkTheme={setDarkTheme} />
      <Menu toggleMenu={toggleMenu} />
    </div>
  );
}

export default Header;
