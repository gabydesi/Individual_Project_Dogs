import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDogTemperaments, postDog } from '../../Redux/action';
import axios from 'axios';


const Form = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogTemperaments())
    }, [dispatch])

    const dogTemperament = useSelector(state => state.temperaments)
    
    const [form, setForm] = useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        image:"",
        temperament:[]
    })
    
    // const [errors, setErrors] = useState({
    //     name:"",
    //     height:"",
    //     weight:"",
    //     life_span:"",
    //     image:"",
    //     temperament:[]
    // })

    
    const [selectNameState, setSelectNameState] = useState([])
    

    //añadir datos en el input
    const changeHandler = (event) => {
        
        setForm({...form, [event.target.name]:event.target.value})
        
        //validate({...form, [property]:value})
    }
    
    
    //opción de selección de temperamentos
    const handlerSelect = (event) => {
    setForm({
      ...form,
      temperament: [...form.temperament, event.target.value]
    })
    }


    //validaciones
    // const validate = (form) => {

    //     if(!form.name) {
    //         setErrors({...errors, name:"Please add a name"})
    //     }else if(!/^[A-Za-z][A-Za-z]/.test(form.name)){
    //         setErrors({...errors, name:"The name can only contain letters"})
    //     }else if(parseInt(form.name.length) >= 25){
    //         setErrors({...errors, name:"The name can only contain less than 25 characters"})
    //     }
        
    //     //height
    //     if(!form.height) {
    //         setErrors({...errors, height:"Please add the information requested"})
    //     }else if(!/^[1-9][1-9]/.test(form.height)){
    //         setErrors({...errors, height:"You can only use numbers for this information"})
    //     }else if(parseInt(form.height) > 85){
    //         setErrors({...errors, height:"The dog's height must be less than 85cm"})
    //     }

    //     //weight
    //     if(!form.weight) {
    //         setErrors({...errors, weight:"Please add the information requested"})
    //     }else if(!/^[1-9][1-9]/.test(form.weight)){
    //         setErrors({...errors, weight:"You can only use numbers for this information"})
    //     }else if(parseInt(form.weight) > 90){
    //         setErrors({...errors, weight:"The dog's weight must be less than 90kg"})
    //     }

    //     //life_span
    //     if(!/^[1-9][1-9]/.test(form.life_span)){
    //         setErrors({...errors, life_span:"You can only use numbers for this information"})
    //     }else if(parseInt(form.life_span) > 20){
    //         setErrors({...errors, life_span:"The dog's age must be less than 20 years"})
    //     }

    // }

    //cargar datos en la db
       
    const handlerSubmit = (event) => {
    event.preventDefault()
    console.log(form)
    axios.post('http://localhost:3001/dogs/create', form)
    .then(res=> alert(res))
    
    }

    return(
        <div>

        <h2>Let's create a new dog!</h2>
        
        <form onSubmit={handlerSubmit}>
            <div>
            <label>Name: </label>
            <input type="text" value={form.name} onChange={changeHandler} name="name" />
            
            </div>

            <div>
            <label>Height: </label>
            <input type="text" value={form.height} onChange={changeHandler} name="height"/>
           
            </div>

            <div>
            <label>Weight: </label>
            <input type="text" value={form.weight} onChange={changeHandler} name="weight" />
            
            </div>

            <div>
            <label>Life span: </label>
            <input type="text" value={form.life_span} onChange={changeHandler} name="life_span" />
            
            </div>

            <div>
            <label>Image: </label>
            <input placeholder='Image URL' value={form.image} onChange={changeHandler} name="image"/>
            </div>

            <div>
            <label>Temperament: </label>
            <select name="temperament" onChange={handlerSelect}>
                {dogTemperament.map((temp, id) => {
                    return(
                    <option className='option_form' key={id} value={temp.name}>{temp.name}</option>
                    )
                })}
            </select>
            </div>

            <div>
                <button type='submit' >Create</button>
            </div>
            
            
        </form>
        
        </div>
    )
}

export default Form;