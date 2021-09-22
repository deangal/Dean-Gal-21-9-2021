import "./topbar.scss";
import { Sync } from "@material-ui/icons";
const Topbar = ({
  setMenuOpen,
  menuOpen,
  night,
  setNight,
  setTempType,
  tempType,
}) => {
  const lightBtn = () => {
    setNight(!night);
  };

  const tempBtn = () => {
    setTempType(!tempType);
  };

  let color = "";
  night ? (color = "#000000") : (color = "white");

  return (
    <div
      id="topbar"
      className={
        "topbar " +
        (menuOpen && "active") +
        " " +
        (night ? "activeDay" : "activeNight")
      }
    >
      <div className="wrapper">
        <div className="left">
          <a href="#home" className="logo">
            Forecast
          </a>
        </div>

        <div className="lightBtn">
          <div onClick={lightBtn} id="toggle" />
        </div>

        <div onClick={tempBtn} className={tempType && "rotate"} id="toggleTemp">
          <Sync
            style={{
              height: "31px",
              width: "35px",
              color: color,
              transition: "all 1s ease",
              opacity: "0.8",
            }}
          />
        </div>

        <div className="right">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
