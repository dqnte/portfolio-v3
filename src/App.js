import "./App.scss";
import Header from "./Header";

import About from "./About";
import Photo from "./Photo";
import Home from "./Home";
import Menu from "./Menu";
import { fetchPhotoManifest } from "./utilities.ts";

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [albums, setAlbums] = useState([]);

  const [useDarkTheme, setDarkTheme] = useState(true);
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotoManifest().then((albums) => {
      setAlbums(albums);
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
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
        />
        <Menu setShowMenu={setShowMenu} show={showMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/*" element={<Photo albums={albums} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
