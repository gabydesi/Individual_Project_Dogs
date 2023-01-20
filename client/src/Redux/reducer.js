import { GET_DOGS, GET_DOG_DETAIL, GET_DOG_TEMPERAMENT, POST_DOG} from "./action";



const initialState = {
    dogs: [],
    detail:{},
    temperaments:[],
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
        case GET_DOG_TEMPERAMENT:
            return{
                ...state,
                temperaments: action.payload
            }
        case POST_DOG:
            return{
                ...state,
            }
        default:
            return {...state}
    }
}

export default rootReducer;