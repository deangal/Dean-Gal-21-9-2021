const initialState = {
    data: null,
    
  };

const optionsReducer = ( state = initialState, action) => {
    switch(action.type){
       
           case 'GET_OPTIONS':
               const data = action.payload
            return state = data
            
        default:
            return state
    }
}

export default optionsReducer