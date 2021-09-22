import accuWeatherReducer from "./weather";
import cityReducer from "./city";
import forecastReducer from './forecast'
import optionsReducer from "./options";
import favoritesReducer from "./favorites";
import geoReducer from "./geoLocation";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    Weather: accuWeatherReducer,
    City: cityReducer,
    Forecast:forecastReducer,
    Options:optionsReducer,
    Favorites:favoritesReducer,
    GeoLocation:geoReducer
})

export default allReducers;