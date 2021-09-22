import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForecast } from "../../redux/actions";
import "./forecast.scss";

const Forecast = ({ tempType }) => {
  const CityData = useSelector((state) => state.City);
  const ForecastData = useSelector((state) => state.Forecast);
  const dispatch = useDispatch();

  const key = `HpTelkiZ49HlRAGS5OCOcNGUT60FIlQQ`;

  //forecast days setup
  let today = new Date();

  const day2 = new Date(today);
  day2.setDate(day2.getDate() + 1);

  const day3 = new Date(day2);
  day3.setDate(day3.getDate() + 1);

  const day4 = new Date(day3);
  day4.setDate(day4.getDate() + 1);

  const day5 = new Date(day4);
  day5.setDate(day5.getDate() + 1);

  const [daysArr, setDaysArr] = useState([today, day2, day3, day4, day5]);

  useEffect(() => {
    if (CityData.Key != undefined) {
      //get forecast info
      const ForecastPromise = async (id) => {
        const base =
          "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
        const query = `${id}?apikey=${key}`;

        const response = await fetch(base + query);
        const data = await response.json();

        return data;
      };

      //implant weather

      ForecastPromise(CityData.Key)
        .then((data) => {
          dispatch(getForecast(data));
        })
        .catch((err) => console.log(err));
    }
  }, [CityData]);

  let ForecastObj = [];

  if (ForecastData.DailyForecasts != undefined) {
    ForecastData.DailyForecasts.map((item) => {
      ForecastObj.push({
        minTemp: item.Temperature.Minimum.Value,
        maxTemp: item.Temperature.Maximum.Value,
        dayIcon: item.Day.Icon,
      });
    });
  }

  daysArr.map((item, forecastIndex) => {
    ForecastObj.forEach((obj, objIndex) => {
      if (objIndex == forecastIndex)
        ForecastObj[objIndex] = {
          Day: item.toString().slice(0, 3),
          minImperialTemp: obj.minTemp,
          maxImperialTemp: obj.maxTemp,
          minMetricTemp: Math.round(((obj.minTemp - 32) * 5) / 9),
          maxMetricTemp: Math.round(((obj.maxTemp - 32) * 5) / 9),
          dayIconSrc: `https://www.accuweather.com/images/weathericons/${obj.dayIcon}.svg`,
        };
    });
  });

  let temp = "";
  let Arr = ForecastObj.map((item, index) => {
    tempType
      ? (temp = item.minImperialTemp + "°" + "-" + item.maxImperialTemp + "°")
      : (temp = item.minMetricTemp + "°" + "-" + item.maxMetricTemp + "°");
    return (
      <Paper
        elevation={10}
        style={{ color: "white", backgroundColor: "#CC000000" }}
        key={index}
        className="forecast"
      >
        <div className="day">{item.Day}</div>
        <img src={item.dayIconSrc} width={50} height={50} />
        <div className="forecastTemp">{temp} </div>
      </Paper>
    );
  });

  return <div className="forecastContainer">{Arr}</div>;
};

export default Forecast;
