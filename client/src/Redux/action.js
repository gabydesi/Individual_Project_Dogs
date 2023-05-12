import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_DOG_TEMPERAMENT = "GET_DOG_TEMPERAMENT";
export const SEARCH_DOG = "SEARCH_DOG";

export const SORT_BREED_ALPHABETICAL = "SORT_BREED_ALPHABETICAL";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const FILTER_DOGS_BY_TEMP = "FILTER_DOGS_BY_TEMP"
export const FILTER_DOGS_BY_CREATED = "FILTER_DOGS_BY_SOURCE"
export const RESET="RESET"

export const getDogs = ()=>{
  return async(dispatch) => {
      try {
          const response = await axios.get("http://localhost:3001/dogs")
          return dispatch({
              type: GET_DOGS,
              payload: response.data
          })

      } catch (error) {
          console.log(error.message)
      } 
  }
}


export const searchDog = (name) => {
  return async(dispatch)=> {
      try {
          var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
          if (!json) throw Error
          return dispatch ({
              type: SEARCH_DOG,
              payload: json.data  //es lo q devuelve la ruta una vez q le asigno algo por name
          })
      } catch (error) {
          dispatch({ type: SEARCH_DOG,
          payload: "404"
      })
      }

  }
}


export function getDogDetail(id) {
  return function (dispatch) {
    axios(`http://localhost:3001/dogs/${id}`).then((res) =>
      dispatch({
        type: GET_DOG_DETAIL,
        payload: res.data,
      })
    );
  };
}

export function getDogTemperaments() {
  return function (dispatch) {
    axios(`http://localhost:3001/temperaments`).then((res) =>
      dispatch({
        type: GET_DOG_TEMPERAMENT,
        payload: res.data,
      })
    );
  };
}


//limpiar el state
export function resetAll () {
  return (dispatch) => {
    dispatch({
      type: RESET,
    });
  };
};

//filtrado y ordenamiento

export function alphabeticalOrder(payload) {
  return {
    type: SORT_BREED_ALPHABETICAL,
    payload,
  };
}

export function weightOrder(payload) {
  return {
      type: ORDER_BY_WEIGHT,
      payload
  }
}

export function temperamentsFilter (payload) {

        return{
            type: FILTER_DOGS_BY_TEMP,
            payload
        }
}

export function dogsCreatedFilter (payload) {
    return  {
            type: FILTER_DOGS_BY_CREATED,
            payload
    }
}
