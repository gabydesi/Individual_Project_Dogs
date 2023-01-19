const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament } = require('../db')


const getDogsTemperament = async() => {
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const format = apiDogsAll.map(recordDog => recordDog.temperament)
    const union = format.filter(result => result != null)
    .join().split(", ").join().split(",")

    //verificando repetidos
    let result = union.reduce((a, e) => {
      if(!a.find(d => d == e)) a.push(e)
      return a
    }, []);

    result = result.map(temp => {return{name: temp}})

    const allTemps = await Temperament.findAll()
    
    if(allTemps.length === 0) {
      await Temperament.bulkCreate(result)
    } 
    const temper = await Temperament.findAll()
    return temper;
};

module.exports = {
  getDogsTemperament
};
