const initialState = {}

const geoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_GEO':
            const data = action.payload
         return state = {
            GeoName: data.AdministrativeArea.LocalizedName
         }

        default:
            return state;
    }
}

export default geoReducer