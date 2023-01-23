import axios from 'axios'

export const GET_DOGS = "GET_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
export const GET_DOG_TEMPERAMENT = "GET_DOG_TEMPERAMENT"
export const POST_DOG = "POST_DOG"




export function getDogs(){
        return function(dispatch){
            axios("http://localhost:3001/dogs").then(res => dispatch({
                type: GET_DOGS, 
                payload: res.data
            }))
        }
}


export function getDogDetail(id){
    return function(dispatch){
        axios(`http://localhost:3001/dogs/${id}`).then(res => dispatch({
            type: GET_DOG_DETAIL,
            payload: res.data
        }))
    }
}

export function getDogTemperaments(){
    return function(dispatch){
        axios(`http://localhost:3001/temperaments`).then(res => dispatch({
            type: GET_DOG_TEMPERAMENT,
            payload:res.data
        }))
    }
}

export function postDog(){
    return function(dispatch){
        axios("http://localhost:3001/dogs/create").then(res => dispatch({
            type: POST_DOG,
            payload:res.data
        }))
    }
}

// export function searchDog(race){
//     return function(dispatch){
//         axios(`http://localhost:3001/dogs?name=${race}`).then(res => dispatch({
//             type:SEARCH_DOG
//         }))
//     }
// }