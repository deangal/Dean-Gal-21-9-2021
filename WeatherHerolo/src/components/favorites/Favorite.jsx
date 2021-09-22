import React from "react";
import { Paper } from "@material-ui/core";
import "./favorites.scss";
import { getCity } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Favorite = ({ item, night, tempType }) => {
  const key = `HpTelkiZ49HlRAGS5OCOcNGUT60FIlQQ`;
  const dispatch = useDispatch();

  const showOnHome = async () => {
    //get city info
    const CityPromise = async (city) => {
      const base =
        "https://dataservice.accuweather.com/locations/v1/cities/search";
      const query = `?apikey=${key}&q=${city}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data[0];
    };
    // implant city

    CityPromise(item.cityName)
      .then((data) => {
        dispatch(getCity(data));
      })
      .catch((err) => console.log(err));
  };
  let temp = "";
  tempType
    ? (temp = item.TemperatureImperialValue + "°")
    : (temp = item.TemperatureMetricValue + "°");

  // icons update
  const iconSrc = `https://www.accuweather.com/images/weathericons/${item.WeatherIcon}.svg`;
  return (
    <a onClick={showOnHome} className="box" href="#home">
      <Paper
        elevation={16}
        className={"favPaper " + (night ? "" : "active")}
        style={{
          opacity: "0.7",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          padding: 10,
          height: "25vh",
          width: 325,
          margin: "5px 5px",
        }}
      >
        <div className="data">
          <h1 className="city">{item.cityName}</h1>

          <span className="temp">
            {" "}
            <img width={150} height={100} src={iconSrc} />
            <span>{temp} </span>
          </span>
          <h2>{item.WeatherText}</h2>
        </div>
      </Paper>
    </a>
  );
};

export default Favorite;
