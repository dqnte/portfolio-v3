import Header from "./Header";

import About from "./About";
import Photo from "./photo";
import Menu from "./Menu";
import Archive from "./Archive";
import Projects from "./Projects";
import Grid from "./components/Grid";
import { fetchPhotoManifest } from "./utilities";

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  /* --- THEME --- */
  const [useDarkTheme, setDarkTheme] = useState(false);

  /* --- IMAGES --- */
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    console.log(
      "ok hacker... u can find the source code here: http://github.com/dqnte/portfolio-v3",
    );
    fetchPhotoManifest().then((albums) => {
      setAlbums(albums);
    });
  }, []);

  /* --- MENU --- */
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    if (!showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    document.body.style.overflow = "";
    setShowMenu(false);
  };

  return (
    <BrowserRouter>
      <div className={`App ${useDarkTheme ? "dark" : "light"}`}>
        <Header
          useDarkTheme={useDarkTheme}
          setDarkTheme={setDarkTheme}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
          showMenu={showMenu}
          albums={albums}
        />
        <Menu
          closeMenu={closeMenu}
          show={showMenu}
          setDarkTheme={setDarkTheme}
          useDarkTheme={useDarkTheme}
        />
        <Routes>
          {<Route path="/*" element={<Photo albums={albums} />} />}
          <Route path="/about" element={<About />} />
          <Route path="/archive/*" element={<Archive albums={albums} />} />
          <Route path="/projects/*" element={<Projects />} />
        </Routes>
      </div>
      <Grid />
    </BrowserRouter>
  );
}

export default App;
