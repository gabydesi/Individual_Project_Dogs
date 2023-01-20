import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDogTemperaments, postDog } from '../../Redux/action';


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
    
    const [errors, setErrors] = useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        image:"",
        temperament:[]
    })

    
    const [selectNameState, setSelectNameState] = useState([])
    

    //añadir datos en el input
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({...form, [property]:value})
        
        validate({...form, [property]:value})
    }
    
    
    //opción de selección de temperamentos
    const handlerSelect = (event) => {
        if(form.temperament.includes(event.target.value)) return

    setForm({
      ...form,
      temperament: [...form.temperament, event.target.value]
    })

    const selectName = event.target.value;
    if(selectName === "default") return;
    setForm({...form , temperament:[...form.temperament, selectName]})

    setSelectNameState([...selectNameState, dogTemperament.find(element => element.id === parseInt(selectName))])
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        dispatch(postDog(form))
        setForm({
            name:"",
            height:"",
            weight:"",
            life_span:"",
            image:"",
            temperament:[]
        })
        setSelectNameState([])
    }

    //validaciones
    const validate = (form) => {
        if(!form.name) {
            setErrors({...errors, name:"Please add a name"})
        }else if(/^[A-Za-z][A-Za-z]{4,20}$/.test(form.name)){
            setErrors({...errors, name:""})
        }else{
            setErrors({...errors, name:"There is a mistake with name"})
        }
        
        //pendiente
        if(!form.height) {
            setErrors({...errors, height:"Please add the information requested"})
        }else if(/^[1-9][1-9]{0,2}$/.test(form.height)){
            setErrors({...errors, height:""})
        }else{
            setErrors({...errors, height:"There is a mistake with height"})
        }

       
    }


    return(
        <div>

        <h2>Let's create a new dog!</h2>
        
        <form action='' onSubmit={handlerSubmit}>
            <div>
            <label>Name: </label>
            <input type="text" value={form.name} onChange={changeHandler} name="name" />
            <span>{errors.name}</span>
            </div>

            <div>
            <label>Height: </label>
            <input type="text" value={form.height} onChange={changeHandler} name="height"/>
            <span>{errors.height}</span>
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
                <select name="temperamentos" onChange={handlerSelect}>
              {dogTemperament.map((temp, id) => {
                return(
                  <option className='option_form' key={id} value={temp.id}>{temp.name}</option>
                )
              })}
            </select>
            </div>

            <div>
                <button>Create</button>
            </div>
            
            
        </form>
        
        </div>
    )
}

export default Form;