import "./menu.scss";

const Menu = ({ menuOpen, setMenuOpen, setFavoritesBtn }) => {
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <a
            onClick={() => setFavoritesBtn(false)}
            className="MenuBox"
            href="#home"
          >
            Home
          </a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a
            onClick={() => setFavoritesBtn(false)}
            className="MenuBox"
            href="#favorites"
          >
            Favorites
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
