const { createDog, getDogById, searchDogByName, getAllDogs } = require('../controllers/dogsController')



//función que se va a ejecutar cuando yo reciba la req en el endpoint
//no será responsabilidad del handler pedir info directamente en la db o en la api externa
//esta función llamará a la función que obtiene los datos de la db, en este caso los controllers
//y cuando ya tenga los datos dará la respuesta


const getDogsHandler = async(req, res) => {
    const { name } = req.query;

    const results = name ? await searchDogByName(name) : await getAllDogs()

    res.status(200).json(results)


}



const getDogIdHandler = async(req, res) => {
    const { id } = req.params;

    const dogsSource = isNaN(id)? "DB" : "API"
   
    try {
        const dogRace = await getDogById(id, dogsSource)
        res.status(200).json(dogRace)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getDogNameHandler = (req, res) => {
    res.status(200).send("NIY: Here we should see the name")
}


const createDogHandler = async(req, res) => {
    const { name, height, weight, life_span, temperament, image } = req.body;
    try {
        const newDog = await createDog(name, height, weight, life_span, temperament, image)
        res.status(201).json(newDog)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}




module.exports = {
    getDogsHandler,
    getDogIdHandler,
    getDogNameHandler,
    createDogHandler
}