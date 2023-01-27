import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDogTemperaments } from '../../Redux/action';
import { Link } from 'react-router-dom';
import style from "./Form.module.css"
import axios from 'axios';

const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name ="Please add a name"
    }else if(!/^[A-Za-z][A-Za-z]/.test(form.name)){
        errors.name = "The name can only contain letters"
    }else if(parseInt(form.name.length) >= 25){
        errors.name = "The name can only contain less than 25 characters"
    }
    
    //height
    // if(!form.height) {
    //     errors = "Please add the information requested"
    // }else if(!/^[1-9][1-9]/.test(form.height)){
    //     errors = "You can only use numbers for this information"
    // }else if(parseInt(form.height) > 85){
    //     errors = "The dog's height must be less than 85cm"
    // }

    // //weight
    // if(!form.weight) {
    //     setErrors({...errors, weight:"Please add the information requested"})
    // }else if(!/^[1-9][1-9]/.test(form.weight)){
    //     setErrors({...errors, weight:"You can only use numbers for this information"})
    // }else if(parseInt(form.weight) > 90){
    //     setErrors({...errors, weight:"The dog's weight must be less than 90kg"})
    // }

    // //life_span
    // if(!/^[1-9][1-9]/.test(form.life_span)){
    //     setErrors({...errors, life_span:"You can only use numbers for this information"})
    // }else if(parseInt(form.life_span) > 20){
    //     setErrors({...errors, life_span:"The dog's age must be less than 20 years"})
    // }

    return errors;
}




const Form = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogTemperaments())
    }, [dispatch])

    const dogTemperament = useSelector(state => state.temperaments)
    
    const [form, setForm] = useState({
        name:"",
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:"",
        life_span:"",
        image:"",
        temperament:[]
    })
    
    const [errors, setErrors] = useState({})

    

    //añadir datos en el input
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]:event.target.value})
        setErrors(validate({...form, [event.target.name]:event.target.value}))
    }
    
    
    //opción de selección de temperamentos
    const handlerSelect = (event) => {
    setForm({
      ...form,
      temperaments: [...form.temperament, event.target.value]
    })
    }

    //cargar datos en la db
       
    const handlerSubmit = (event) => {
    event.preventDefault()
    console.log(form)
    axios.post('http://localhost:3001/dogs/create', form)
    .then(res=> alert(res))
    
    }

    //validaciones

    return(
        <div className={style.back_form}>

        <div>
        <Link to="/home">BACK HOME</Link>
        </div>

        <h2>Let's create a new dog!</h2>
        
        <form onSubmit={handlerSubmit}>
            <div>
            <label>Name: </label>
            <input type="text" value={form.name} onChange={changeHandler} name="name" />
            <span>{errors.name}</span>
            </div>

            <div>
            <label>Height min: </label>
            <input type="text" value={form.height_min} onChange={changeHandler} name="height_min"/>
            
            </div>

            <div>
            <label>Height max: </label>
            <input type="text" value={form.height_max} onChange={changeHandler} name="height_max"/>
            
            </div>

            <div>
            <label>Weight min: </label>
            <input type="text" value={form.weight_min} onChange={changeHandler} name="weight_min" />
            
            </div>

            <div>
            <label>Weight max: </label>
            <input type="text" value={form.weight_max} onChange={changeHandler} name="weight_max" />
            
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
            <select name="temperaments" onChange={handlerSelect}>
                {dogTemperament.map((temp) => {
                    return(
                    <option className='option_form' value={temp.name}>{temp.name}</option>
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