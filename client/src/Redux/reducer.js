import {
  GET_DOGS,
  GET_DOG_DETAIL,
  GET_DOG_TEMPERAMENT,
  SEARCH_DOG,
  SORT_BREED_ALPHABETICAL,
  FILTER_DOGS_BY_TEMP,
  FILTER_DOGS_BY_CREATED
} from "./action";

const initialState = {
  dogs: [],
  allDogs:[],
  detail: {},
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_DOG_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };
    case SEARCH_DOG:
      return {
        ...state,
        dogs: action.payload,
      };
    case SORT_BREED_ALPHABETICAL:
        let breedsSort = state.dogs
        if(action.payload === "asc"){
            breedsSort = breedsSort.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0
            })

        }else{
            breedsSort = breedsSort.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0
            })
        }
      return {
        ...state,
        dogs: breedsSort
      };
      case FILTER_DOGS_BY_TEMP:
            let allDogsTemps = state.allDogs

            if(action.payload !== "All"){
                allDogsTemps = allDogsTemps.filter((dog) => dog.temperament.includes(action.payload))
            }
            return{
                ...state,
                dogs: allDogsTemps
            }
        case FILTER_DOGS_BY_CREATED:
            const createdDogs = state.allDogs
            const createdFilter = action.payload === "created" ?
            createdDogs.filter(elem => elem.createdInDB === true) :
            createdDogs.filter(elem => !elem.createdInDB)
            return{
                dogs: action.payload === "All" ? createdDogs : createdFilter
            }

    default:
      return { ...state };
  }
};

export default rootReducer;
