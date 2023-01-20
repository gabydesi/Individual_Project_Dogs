import { GET_DOGS, GET_DOG_DETAIL} from "./action";



const initialState = {
    dogs: [],
    detail:{},
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_DOG_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        default:
            return {...state}
    }
}

export default rootReducer;