import "./App.scss";
import Header from "./Header";

import About from "./About";
import Photo from "./Photo";
import Home from "./Home";
import Menu from "./Menu";
import { fetchPhotoManifest } from "./utilities.ts";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { albums } = fetchPhotoManifest();

  const [useDarkTheme, setDarkTheme] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <BrowserRouter>
      <div
        className="App"
      >
        <Header
          useDarkTheme={useDarkTheme}
          setDarkTheme={setDarkTheme}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
          showMenu={showMenu}
        />
        <Menu setShowMenu={setShowMenu} show={showMenu} />
        <Routes>
          <Route path="/" element={<Home album={albums[0]} />} />
          <Route path="/photo/*" element={<Photo />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
