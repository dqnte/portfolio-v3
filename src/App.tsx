import Header from './Header';

import About from './About';
import Photo from './photo';
import Menu from './Menu';
import Archive from './Archive';
import Work from './Work';
import { fetchPhotoManifest } from './utilities';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  /* --- THEME --- */
  const [useDarkTheme, setDarkThemeInternal] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const setDarkTheme = (value: boolean, save = true) => {
    setDarkThemeInternal(value);
    document.body.className = value ? 'dark' : 'light';
    if (save) localStorage.setItem('theme', value ? 'dark' : 'light');
  };

  useEffect(() => {
    setDarkTheme(useDarkTheme, false);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) setDarkTheme(e.matches, false);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /* --- IMAGES --- */
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    console.log(
      'ok hacker... u can find the source code here: http://github.com/dqnte/portfolio-v3'
    );
    fetchPhotoManifest().then(albums => {
      setAlbums(albums);
    });
  }, []);

  /* --- MENU --- */
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    if (!showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    document.body.style.overflow = '';
    setShowMenu(false);
  };

  return (
    <BrowserRouter>
      <div className={`App`}>
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
          <Route path="/work/*" element={<Work />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
