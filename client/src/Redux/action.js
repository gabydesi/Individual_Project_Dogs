import axios from 'axios'

export const GET_DOGS = "GET_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"



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