import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_DOG_TEMPERAMENT = "GET_DOG_TEMPERAMENT";
export const SEARCH_DOG = "SEARCH_DOG";

export const SORT_BREED_ALPHABETICAL = "SORT_BREED_ALPHABETICAL";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const FILTER_DOGS_BY_TEMP = "FILTER_DOGS_BY_TEMP"
export const FILTER_DOGS_BY_CREATED = "FILTER_DOGS_BY_SOURCE"



export function getDogs() {
  return function (dispatch) {
    axios("http://localhost:3001/dogs").then((res) =>
      dispatch({
        type: GET_DOGS,
        payload: res.data,
      })
    );
  };
}

export function searchDog(name) {
  return function (dispatch) {
    axios(`http://localhost:3001/dogs?name=${name}`).then((res) =>
      dispatch({
        type: SEARCH_DOG,
        payload: res.data,
      })
    );
  };
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
