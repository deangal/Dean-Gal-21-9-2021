const initialState = {
    data: null,
    
  };

const accuWeatherReducer = ( state = initialState, action) => {
    switch(action.type){
       
           case 'GET_WEATHER':
               const data = action.payload
            return state = {
                WeatherText: data.WeatherText,
                WeatherIcon: data.WeatherIcon,
                TemperatureMetricValue: data.Temperature.Metric.Value,
                TemperatureImperialValue: data.Temperature.Imperial.Value,
                IsDayTime: data.IsDayTime,
                IsClick: false
            }
            
        default:
            return state
    }
}

export default accuWeatherReducer