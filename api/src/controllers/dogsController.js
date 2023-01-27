const axios = require('axios')
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db')

const { Op } = require('sequelize');

//función para limpiar la info que me traerá por name y cards desde la api
const cleanArray = (arr) =>{
    const clean = arr.map(element =>{
        return{
            id: element.id,
            name: element.name, 
            height_min: parseInt(element.height.metric.slice(0, 2).trim()),
            height_max: parseInt(element.height.metric.slice(4).trim()), 
            weight_min: parseInt(element.weight.metric.slice(0, 2).trim()), 
            weight_max: parseInt(element.weight.metric.slice(4).trim()),
            life_span: element.life_span, 
            temperament:element.temperament || "Playful",
            image: element.image.url,
            createdInDB: false
        }
    })
    return clean;
}

//función para limpiar la info que me traerá por db de todos los perros creados en la db
const cleanDbArray = (arr) =>{
    const clean = arr.map(element =>{
        return{
            id: element.id,
            name: element.name, 
            height_min: element.height_min,
            height_max: element.height_max,  
            weight_min: element.weight_min, 
            weight_max: element.weight_max,
            life_span: element.life_span, 
            temperament:element.temperaments.map(temp=> temp.name).join(","),
            image: element.image,
            createdInDB: true
        }
    })
    return clean;
}

//función para limpiar la info que me traerá por db cuando quiero ver la info por ID
const cleanDBArrayId = async(id) => {
    const dbDogs = await Dog.findOne({where: {id}, include: Temperament })
     return {
        id: dbDogs.id,
            name: dbDogs.name, 
            height_min: dbDogs.height_min,
            height_max: dbDogs.height_max,
            weight_min: dbDogs.weight_min, 
            weight_max: dbDogs.weight_max,
            life_span: dbDogs.life_span, 
            temperament:dbDogs.temperaments.map(temp=> temp.name).join(","),
            image: dbDogs.image,
            createdInDB: true
     }
    
}

//función para limpiar la info y poder traerla por ID desde la api
const cleanArrayId = async(id) => {
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data
    if(apiDogsAll){

        let dogApi = apiDogsAll
        return{
            id: dogApi.id,
            name: dogApi.name, 
            height_min: parseInt(dogApi.height.metric.slice(0, 2).trim()),
            height_max: parseInt(dogApi.height.metric.slice(4).trim()), 
            weight_min: parseInt(dogApi.weight.metric.slice(0, 2).trim()), 
            weight_max: parseInt(dogApi.weight.metric.slice(4).trim()),
            life_span: dogApi.life_span, 
            temperament:dogApi.temperament,
            image: `https://cdn2.thedogapi.com/images/${dogApi.reference_image_id}.jpg`,
            createdInDB: false
        }
    } 
}



//funciones que interactuan con el modelo de la db y con la api externa, esta función le entrega la info a los handlers
const getAllDogs = async() => {
    const dbDogs = await Dog.findAll({include: Temperament })
    const mapDogs = cleanDbArray(dbDogs)
    
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const apiDogs = cleanArray(apiDogsAll)

    return [ ...apiDogs, ...mapDogs ]

}

const searchDogByName = async(name) => {
    const dbDogs = await Dog.findAll({
        where: {name: {[Op.iLike]:`${name}%`}}, 
        include: Temperament
    })
    console.log("comprobando", dbDogs)
    const apiDogsAll = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const apiDogs = cleanArray(apiDogsAll)
    const filterApi = apiDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
    return [...filterApi, ...mapDogs]
} 


const getDogById = async(id, dogsSource) => {

    const dog = dogsSource === "API" ? await cleanArrayId(id) : await cleanDBArrayId(id);
    return dog;
}


const createDog = async(name, height_min, height_max, weight_min, weight_max, life_span, temperaments,image) => {
    let dogDb = await Dog.create({name, height_min, height_max, weight_min, weight_max, life_span, image:image || "https://i.pinimg.com/originals/18/35/81/183581a9055feb63d670187fc2ac51f5.jpg"})
    temperaments.map(async temp=> {
        let temperament = await Temperament.findOne({
        where: { 
            name: temp
         }})
        await dogDb.addTemperament(temperament)
    })
} 





module.exports={
    createDog,
    getDogById,
    getAllDogs,
    searchDogByName
}

