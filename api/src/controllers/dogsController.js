const axios = require('axios')
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db')

const { Op } = require('sequelize');

//función para limpiar la info que me traerá por name y cards
const cleanArray = (arr) =>{
    const clean = arr.map(element =>{
        return{
            id: element.id,
            name: element.name, 
            height: element.height.metric, 
            weight: element.weight.metric, 
            life_span: element.life_span, 
            temperament:element.temperament,
            image: element.image.url,
            created: false
        }
    })
    return clean;
}

//función para limpiar la info que me traerá por db
const cleanDbArray = (arr) =>{
    const clean = arr.map(element =>{
        return{
            id: element.id,
            name: element.name, 
            height: element.height.metric, 
            weight: element.weight.metric, 
            life_span: element.life_span, 
            temperament:element.temperaments.map(temp=> temp.name).join(","),
            image: element.image,
            created: true
        }
    })
    return clean;
}

//función para limpiar la info y poder traerla por ID
const cleanArrayId = async(id) => {
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data
    
    if(apiDogsAll){

        let dogApi = apiDogsAll
        return{
            id: dogApi.id,
            name: dogApi.name, 
            height: dogApi.height.metric, 
            weight: dogApi.weight.metric, 
            life_span: dogApi.life_span, 
            temperament:dogApi.temperament,
            image: `https://cdn2.thedogapi.com/images/${dogApi.reference_image_id}.jpg`,
            create: false
        }
    } 
}



//funciones que interactuan con el modelo de la db y con la api externa, esta función le entrega la info a los handlers
const getAllDogs = async() => {
    const dbDogs = await Dog.findAll({include: Temperament })
    const mapDogs = cleanDbArray(dbDogs)
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const apiDogs = cleanArray(apiDogsAll)

    return [...mapDogs, ...apiDogs]

}

const searchDogByName = async(name) => {
    const dbDogs = await Dog.findAll({
        where: {name: {[Op.iLike]:`${name}%`}}, 
        include: Temperament
    })
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const apiDogs = cleanArray(apiDogsAll)

    const filterApi = apiDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))

    return [...filterApi, ...dbDogs]
} 


const getDogById = async(id, dogsSource) => {

    const dog = dogsSource === "API" ? await cleanArrayId(id) : await Dog.findByPk(id);
    return dog;
}


const createDog = async(name, height, weight, life_span, temperaments, image) => {
    let dogDb = await Dog.create({name, height, weight, life_span, image})
    temperaments.map(async temp=> {
        let temperament = await Temperament.findOne({
        where: { 
            name: temp
         }})
        await dogDb.addTemperament(temperament)
    })
    return `Dog created succesfully ${dogDb.name} with temperaments ${temperaments}`
} 





module.exports={
    createDog,
    getDogById,
    getAllDogs,
    searchDogByName
}

