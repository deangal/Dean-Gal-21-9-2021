import "./home.scss";
import "../topbar/topbar.scss";
import { Weather, Forecast } from "../";

const Home = ({ night, tempType, setFavoritesBtn }) => {
  return (
    <div className={"intro " + (night ? "activeDay" : "activeNight")} id="home">
      <Weather tempType={tempType} setFavoritesBtn={setFavoritesBtn} />
      <Forecast tempType={tempType} />
    </div>
  );
};

export default Home;
