const initialState = {
    data: [],
	status: null
    
  };

const favoritesReducer = ( state = initialState, action) => {
    switch(action.type){
            case 'GET_FAVORITES':
                state.data = action.payload
            return  state
       
            case 'ADD_FAVORITES':
            state.data.push(action.payload)
            return state
                
            case  'DEL_FAVORITES':
            let favoritesArr = [ ...state.data ]

              state.data = favoritesArr.filter( (fav,index) => index !== action.index)  
			  
               
        default:
            return state
    }
}

export default favoritesReducer