const stringRegExp = /^[a-zA-Z]{1,20}$/;
const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;



const validate = (form) => {

  let errors = {};
  if (!form.name) {
    errors.name = 'Name is required';
  } else if (!stringRegExp.test(form.name)) {
    errors.name = 'Name is invalid';
  }


  if(!form.height_min){
    errors.height_min = 'Minimum height is required';
    } else if (!numberRegExp.test(form.height_min)){
    errors.height_min = 'Height invalid';
  } 

  if(!form.height_max){
    errors.height_max = 'Maximum height is required';
    } else if (!numberRegExp.test(form.height_max)){
    errors.height_max = 'Height invalid';
  }


  if(!form.weight_min){
    errors.weight_min = 'Minimun weight is required';
    } else if (!numberRegExp.test(form.weight_min)){
    errors.weight_min = 'Weight invalid';
  }

  if(!form.weight_max){
    errors.weight_max = 'Maximum weight is required';
    } else if (!numberRegExp.test(form.weight_max)){
    errors.weight_max = 'Weight invalid';
  }

  if(!form.life_span){
    errors.life_span = "The dog's life span is require";
    } else if (!numberRegExp.test(form.life_span)){
    errors.life_span = 'Life Span invalid';
  }

  return errors;

};

export default validate;
