export const getCity = (CityData) => {
    return{
        type: 'GET_CITY',
        payload: CityData
    }
}

export const getWeather = (WeatherData) => {
    return{
        type: 'GET_WEATHER',
        payload: WeatherData
    }
}

export const getForecast = (ForecastData) => {
    return{
        type: 'GET_FORECAST',
        payload: ForecastData
    }
}

export const getOptions = (OptionsData) => {
    return{
        type: 'GET_OPTIONS',
        payload: OptionsData
    }
}

export const addFavorites = (FavoritesData) => {
    return{
        type: 'ADD_FAVORITES',
        payload: FavoritesData
    }
}

export const getFavorites = (FavoritesData) => {
    return{
        type: 'GET_FAVORITES',
        payload: FavoritesData
    }
}

export const delFavorites = (FavoritesData,index) => {
    return{
        type: 'DEL_FAVORITES',
        payload: FavoritesData,
        index:index
    }
}

export const getGeo = (GeoData) => {
    return{
        type: 'GET_GEO',
        payload: GeoData
    }
}


