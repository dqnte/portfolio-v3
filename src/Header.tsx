import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useScroll, useMotionValueEvent } from "framer-motion";
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
    <div className={`Header__Name ${headerState === "hidden" ? "hidden" : ""}`}>
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function Header({
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
}) {
  const location = useLocation();
  const [headerState, setHeaderState] = useState("hidden");
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
      <span className={"Header__background"} />
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
    </>
  );
}

export default Header;
