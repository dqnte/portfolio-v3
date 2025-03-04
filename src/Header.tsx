import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { IAlbum } from "./utilities";

type HeaderState = "hidden" | "default";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Mode = ({
  useDarkTheme,
  setDarkTheme,
}: {
  useDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}) => {
  const [showDark, setShowDark] = useState(useDarkTheme);
  useEffect(() => {
    setShowDark(useDarkTheme);
  }, [useDarkTheme]);

  return (
    <div className="Header__mode">
      <a
        className={`Header--btn ${showDark ? "selected" : ""}`}
        onClick={() => setDarkTheme(true)}
      >
        dark
      </a>
      <a
        className={`Header--btn ${!showDark ? "selected" : ""}`}
        onClick={() => setDarkTheme(false)}
      >
        light
      </a>
    </div>
  );
};

const Name = ({
  closeMenu,
  headerState,
}: {
  closeMenu: () => void;
  headerState: HeaderState;
}) => {
  const location = useLocation();
  const key = location.pathname;
  const atHome = key === "/";

  return (
    <div className={`Header__name ${headerState === "hidden" ? "" : ""}`}>
      <Link className={`Header--link ${atHome ? "selected" : ""}`} to="/" onClick={closeMenu}>
        dante tobar
      </Link>
    </div>
  );
};

const Menu = ({
  toggleMenu,
  showMenu,
}: {
  toggleMenu: () => void;
  showMenu: boolean;
}) => {
  return (
    // we use an <a /> because the font sizing wasn't working on mobile
    <a
      className={`Header__menu Header--btn ${showMenu ? "selected" : ""}`}
      onClick={toggleMenu}
    >
      menu
    </a>
  );
};

const Navigation = () => {
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
    <div className="Header__nav">
      <Link
        to="/archive"
        className={`Header--link ${hoverPage === "archive" ? "selected" : ""}`}
      >
        archive
      </Link>
      <Link
        to="/about"
        className={`Header--link ${hoverPage === "about" ? "selected" : ""}`}
      >
        about
      </Link>
    </div>
  );
};

const Header = ({
  useDarkTheme,
  setDarkTheme,
  toggleMenu,
  closeMenu,
  showMenu,
  albums,
}: {
  useDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  showMenu: boolean;
  albums: IAlbum[];
}) => {
  const location = useLocation();
  const [headerState, setHeaderState] = useState<HeaderState>("hidden");
  const { scrollY } = useScroll();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/photo") {
      if (scrollY.get() < 300) {
        setHeaderState("hidden");
      } else {
        scrollToTop();
      }
    } else {
      setHeaderState("default");
    }
  }, [location, albums]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (location.pathname !== "/") {
      setHeaderState("default");
    } else {
      if (latest < 300) {
        setHeaderState("hidden");
      } else if (latest > 300) {
        setHeaderState("default");
      }
    }
  });

  return (
    <>
      <span className={`Header__background ${headerState === 'hidden'? 'hidden' : ''}`} />
      <div className={`Header ${showMenu ? "Header--open" : ""}`}>
        <Name closeMenu={closeMenu} headerState={headerState} />
        <div className={"Header__bio"}>
          <p>photographer - engineer</p>
          <p>based in nyc</p>
        </div>
        <Navigation />
        <Mode useDarkTheme={useDarkTheme} setDarkTheme={setDarkTheme} />
        <Menu toggleMenu={toggleMenu} showMenu={showMenu} />
      </div>
    </>
  );
};

export default Header;
