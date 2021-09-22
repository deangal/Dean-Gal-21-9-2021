import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./weather.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getCity,
  getWeather,
  getOptions,
  addFavorites,
  delFavorites,
  getFavorites,
  getGeo,
} from "../../redux/actions";
import Heart from "react-animated-heart";

const Weather = ({ tempType, setFavoritesBtn }) => {
  if (JSON.parse(localStorage.getItem("location")) == null) {
    localStorage.setItem("location", "[]");
  }

  let fav = JSON.parse(localStorage.getItem("location"));

  const CityData = useSelector((state) => state.City);
  const WeatherData = useSelector((state) => state.Weather);
  const OptionsData = useSelector((state) => state.Options);
  const FavoritesData = useSelector((state) => state.Favorites);
  const GeoData = useSelector((state) => state.GeoLocation);

  const dispatch = useDispatch();
  const key = `HpTelkiZ49HlRAGS5OCOcNGUT60FIlQQ`;

  const [cityInput, setCityInput] = useState({});
  const [isClick, setClick] = useState(false);

  //icons update
  const iconSrc = `https://www.accuweather.com/images/weathericons/${WeatherData.WeatherIcon}.svg`;

  //GEOLOCATION useEffect
  useEffect(() => {
    //get geo info
    const GeoPromise = async (geo) => {
      const base =
        "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
      const query = `?apikey=${key}&q=${geo}`;

      const response = await fetch(base + query);
      const data = await response.json();
      return data;
    };
    // implant geo
    GeoPromise("32.109333%2C%2034.855499")
      .then((data) => {
        dispatch(getGeo(data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //get city info
    const CityPromise = async (city) => {
      const base =
        "https://dataservice.accuweather.com/locations/v1/cities/search";
      const query = `?apikey=${key}&q=${city}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data[0];
    };
    //get weather info

    const WeatherPromise = async (id) => {
      const base = "https://dataservice.accuweather.com/currentconditions/v1/";
      const query = `${id}?apikey=${key}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data[0];
    };
    if (GeoData.GeoName !== undefined) {
      // implant weather

      CityPromise(GeoData.GeoName)
        .then((data) => {
          return WeatherPromise(data.Key);
        })
        .then((data) => {
          dispatch(getWeather(data));
        })
        .catch((err) => console.log(err));

      // implant city

      CityPromise(GeoData.GeoName)
        .then((data) => {
          dispatch(getCity(data));
        })
        .catch((err) => console.log(err));
    }

    const FavoritesPromise = async (favorites) => {
      return favorites;
    };

    let fav = JSON.parse(localStorage.getItem("location"));

    FavoritesPromise(fav)
      .then((data) => {
        dispatch(getFavorites(data));
      })
      .catch((err) => console.log(err));
  }, [GeoData]);

  //AUTOCOMPLETION GET
  useEffect(() => {
    //get options info
    const OptionsPromise = async (option) => {
      const base =
        "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
      const query = `?apikey=${key}&q=${option}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data;
    };

    //implant options
    if (
      cityInput != undefined ||
      cityInput != null ||
      cityInput != " " ||
      cityInput != ""
    ) {
      OptionsPromise(cityInput)
        .then((data) => {
          dispatch(getOptions(data));
        })
        .catch((err) => console.log(err));
    }
  }, [cityInput]);

  useEffect(() => {
    const fav = {
      cityName: CityData.EnglishName,
      TemperatureMetricValue: WeatherData.TemperatureMetricValue,
      TemperatureImperialValue: WeatherData.TemperatureImperialValue,
      WeatherText: WeatherData.WeatherText,
      WeatherIcon: WeatherData.WeatherIcon,
    };

    const FavoritesPromise = async (favorites) => {
      return favorites;
    };

    isClick
      ? FavoritesPromise(fav)
          .then((data) => {
            let check = FavoritesData.data.some(
              (fav) => fav.cityName === CityData.EnglishName
            );
            if (check == false) {
              dispatch(addFavorites(data));
              localStorage.setItem(
                "location",
                JSON.stringify(FavoritesData.data)
              );
            }
          })
          .catch((err) => console.log(err))
      : FavoritesPromise(fav)
          .then((data) => {
            FavoritesData.data.map((item, index) => {
              if (item.cityName == CityData.EnglishName) {
                dispatch(delFavorites(item, index));
                localStorage.setItem(
                  "location",
                  JSON.stringify(FavoritesData.data)
                );
              }
            });
          })
          .catch((err) => console.log(err));
  }, [isClick]);

  useEffect(() => {
    let check = fav.some((fav) => fav.cityName === CityData.EnglishName);
    if (check == true) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [CityData]);

  //SUBMIT HANDLE
  const cityHandle = (e) => {
    e.preventDefault();

    //get city info
    const CityPromise = async (cityInput) => {
      const base =
        "https://dataservice.accuweather.com/locations/v1/cities/search";
      const query = `?apikey=${key}&q=${cityInput}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data[0];
    };
    //get weather info

    const WeatherPromise = async (id) => {
      const base = "https://dataservice.accuweather.com/currentconditions/v1/";
      const query = `${id}?apikey=${key}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data[0];
    };

    // weather GET

    CityPromise(cityInput)
      .then((data) => {
        return WeatherPromise(data.Key);
      })
      .then((data) => {
        dispatch(getWeather(data));
      })
      .catch((err) => console.log(err));

    //city GET
    CityPromise(cityInput)
      .then((data) => {
        dispatch(getCity(data));
      })
      .catch((err) => console.log(err));

    e.target.reset();
    input.value = "";
  };
  const optionObj = [];
  if (OptionsData.length != undefined) {
    OptionsData.map((option, index) =>
      optionObj.push(<option key={index} value={option.LocalizedName} />)
    );
  }

  //SEARCH BAR JS
  const search = document.querySelector(".search");
  const input = document.getElementById("input");

  const clear = () => {
    input.value = "";
  };

  //temp unit change trenary operator
  let temp = "";
  tempType
    ? (temp = WeatherData.TemperatureImperialValue + "°")
    : (temp = WeatherData.TemperatureMetricValue + "°");

  return (
    <div className="container">
      <form onSubmit={cityHandle} className="form">
        <div className="search">
          <div
            onClick={() => search.classList.toggle("active")}
            className="icon"
          />

          <div className="input">
            <input
              onChange={(e) => setCityInput(e.target.value)}
              list="cities"
              placeholder="Search..."
              id="input"
            />
          </div>
          <span className="clear" onClick={clear} />
        </div>
        <datalist style={{ marginRight: "50px" }} id="cities">
          {optionObj}
        </datalist>
      </form>

      <div className="paper">
        <Paper
          elevation={11}
          style={{
            backgroundColor: "#CC000000",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: 10,
            height: "40vh",
            width: 360,
            margin: "15px 15px",
          }}
        >
          <div className="data">
            <h1 className="city">{CityData.EnglishName}</h1>

            <span className="temp">
              {" "}
              <img width={150} height={100} src={iconSrc} />{" "}
              <span> {temp} </span>{" "}
            </span>
            <h2>{WeatherData.WeatherText}</h2>
            <a
              onClick={() => setFavoritesBtn(false)}
              href="#home"
              className="heart"
            >
              <Heart isClick={isClick} onClick={() => setClick(!isClick)} />{" "}
            </a>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Weather;
