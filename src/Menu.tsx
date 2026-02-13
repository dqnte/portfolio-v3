import { useState, useEffect } from 'react';

import { useLocation, Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = ({
  show,
  closeMenu,
  setDarkTheme,
  useDarkTheme,
}: {
  show: boolean;
  closeMenu: () => void;
  setDarkTheme: (value: boolean) => void;
  useDarkTheme: boolean;
}) => {
  const [hoverPage, setHoverPage] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const key = location.pathname.split('/')[1];

    switch (key) {
      case '':
        setHoverPage('home');
        break;
      case 'photo':
        setHoverPage('home');
        break;
      case 'work':
        setHoverPage('work');
        break;
      case 'about':
        setHoverPage('about');
        break;
      case 'archive':
        setHoverPage('archive');
        break;
      default:
        setHoverPage('home');
        break;
    }
  }, [location]);

  const SLIDE_IN = 0.3;
  const TEXT_IN = 0.025;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="Menu"
          initial={{ height: '0dvh' }}
          animate={{
            height: '100dvh',
            transition: {
              duration: SLIDE_IN,
              type: 'tween',
              ease: 'easeInOut',
            },
          }}
          exit={{ height: '0vh', transition: { delay: TEXT_IN * 2 } }}
        >
          <motion.div
            className="Menu-pages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: SLIDE_IN + TEXT_IN } }}
            exit={{ opacity: 0 }}
          >
            <Link
              to="/"
              className={`Menu-pages__link ${hoverPage === 'home' ? 'selected' : ''}`}
              onClick={closeMenu}
            >
              home
            </Link>
            <Link
              to="/work"
              className={`Menu-pages__link ${hoverPage === 'work' ? 'selected' : ''}`}
              onClick={closeMenu}
            >
              work
            </Link>

            <Link
              to="/about"
              className={`Menu-pages__link ${hoverPage === 'about' ? 'selected' : ''}`}
              onClick={closeMenu}
            >
              about
            </Link>
            <Link
              to="/archive"
              className={`Menu-pages__link ${hoverPage === 'archive' ? 'selected' : ''}`}
              onClick={closeMenu}
            >
              archive
            </Link>
          </motion.div>
          <motion.div
            className="Menu-bottom"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: SLIDE_IN + TEXT_IN },
            }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="Menu-socials">
              <a href="https://www.instagram.com/dantistador/" className="Menu-socials__link">
                instagram
              </a>
              <a href="https://www.linkedin.com/in/dante-m-tobar/" className="Menu-socials__link">
                linkedin
              </a>
            </motion.div>
            <div className={'Menu-controls'}>
              <button
                className={`Menu-controls__link ${useDarkTheme ? 'selected' : ''}`}
                onClick={() => {
                  setDarkTheme(true);
                }}
              >
                dark
              </button>
              <button
                className={`Menu-controls__link ${useDarkTheme ? '' : 'selected'}`}
                onClick={() => {
                  setDarkTheme(false);
                }}
              >
                light
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
