import "./Header.scss";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";

function Header(props) {
  const { useDarkTheme, setDarkTheme, toggleMenu, closeMenu, showMenu } = props;

  return (
    <div className={`Header ${showMenu ? "menu-open" : "menu-closed"}`}>
      {!useDarkTheme && (
        <button className="Header__Dark" onClick={() => setDarkTheme(true)}>
          <DarkMode />
        </button>
      )}
      {useDarkTheme && (
        <button className="Header__Light" onClick={() => setDarkTheme(false)}>
          <LightMode />
        </button>
      )}
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
