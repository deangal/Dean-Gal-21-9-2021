const initialState = {
    data: null,
    
  };

const forecastReducer = ( state = initialState, action) => {
    switch(action.type){
       
           case 'GET_FORECAST':
               const data = action.payload
            return state = {
               DailyForecasts: data.DailyForecasts
            }
            
        default:
            return state
    }
}

export default forecastReducer