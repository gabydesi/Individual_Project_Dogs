import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogTemperaments } from "../../Redux/action";
import { Link } from "react-router-dom";
import style from "./Form.module.css";
import axios from "axios";
import validate from "./validation";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogTemperaments());
  }, [dispatch]);

  const dogTemperament = useSelector((state) => state.temperaments);

  const [form, setForm] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  let historyObject = useHistory();

  //añadir datos en el input
  const changeHandler = (event) => {
    setErrors(validate({ ...form, [event.target.name]: event.target.value }));
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //opción de selección de temperamentos
  const handlerSelect = (event) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments, event.target.value],
    });
  };

  //cargar datos en la db

  const handlerSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/dogs/create", form)
      .then(alert("Dog created successfully!"));
    historyObject.push("/home");
    window.location.reload();
  };

  return (
    <div className={style.back_form}>
      <div>
        <br />
        <br />
        <Link className={style.buttonHome} to="/home">
          BACK HOME
        </Link>
      </div>

      <h2>Let's create a new dog for our database!</h2>

      <form className={style.formContainer} onSubmit={handlerSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
          />
          {errors.name ? <span>{errors.name}</span> : null}
        </div>

        <div>
          <label>Height min: </label>
          <input
            type="text"
            value={form.height_min}
            onChange={changeHandler}
            name="height_min"
          />
          {errors.height_min ? <span>{errors.height_min}</span> : null}
        </div>

        <div>
          <label>Height max: </label>
          <input
            type="text"
            value={form.height_max}
            onChange={changeHandler}
            name="height_max"
          />
          {errors.height_max ? <span>{errors.height_max}</span> : null}
        </div>

        <div>
          <label>Weight min: </label>
          <input
            type="text"
            value={form.weight_min}
            onChange={changeHandler}
            name="weight_min"
          />
          {errors.weight_min ? <span>{errors.weight_min}</span> : null}
        </div>

        <div>
          <label>Weight max: </label>
          <input
            type="text"
            value={form.weight_max}
            onChange={changeHandler}
            name="weight_max"
          />
          {form.weight_max ? <span>{errors.weight_max}</span> : null}
        </div>

        <div>
          <label>Life span: </label>
          <input
            type="text"
            value={form.life_span}
            onChange={changeHandler}
            name="life_span"
          />
          {errors.life_span ? <span>{errors.life_span}</span> : null}
        </div>

        <span>You can add an image or leave the space blank</span>
        <div>
          <label>Image: </label>
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={changeHandler}
            name="image"
          />
        </div>

        <div>
          <label>Temperament: </label>
          <select
            name="temperaments"
            onChange={(event) => handlerSelect(event)}
          >
            {dogTemperament.map((temp) => {
              return (
                <option key={temp.id} value={temp.name}>
                  {temp.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <button
            className={style.button}
            type="submit"
            disabled={
              !form.name ||
              !form.height_min ||
              !form.height_max ||
              !form.weight_min ||
              !form.weight_max ||
              !form.life_span ||
              form.temperaments.length === 0
            }
          >
            CREATE
          </button>
        </div>
      </form>

      <div>
        <img className={style.logo} src={logo} alt="" />
      </div>
    </div>
  );
};

export default Form;
