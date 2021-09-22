import { Topbar, Menu, Home, Favorites } from "./components";
import React, { useState } from "react";

import "./app.scss";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [night, setNight] = useState(true);
  const [tempType, setTempType] = useState(false);
  const [favoritesBtn, setFavoritesBtn] = useState(false);

  return (
    <div className="app">
      <Topbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        night={night}
        setNight={setNight}
        tempType={tempType}
        setTempType={setTempType}
      />

      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setFavoritesBtn={setFavoritesBtn}
      />
      <div className="sections">
        <Home
          tempType={tempType}
          night={night}
          setFavoritesBtn={setFavoritesBtn}
        />

        <Favorites
          night={night}
          favoritesBtn={favoritesBtn}
          setFavoritesBtn={setFavoritesBtn}
          tempType={tempType}
        />
      </div>
    </div>
  );
}

export default App;
