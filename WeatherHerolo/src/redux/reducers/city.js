const initialState = {}

const cityReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_CITY':
            
           return state = action.payload

        default:
            return state;
    }
}

export default cityReducer