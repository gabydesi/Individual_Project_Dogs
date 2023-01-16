//función que se va a ejecutar cuando yo reciba la req en el endpoint
//no será responsabilidad del handler pedir info directamente en la db o en la api externa
//esta función llamará a la función que obtiene los datos de la db, en este caso los controllers
//y cuando ya tenga los datos dará la respuesta


const getDogsHandler = (req, res) => {
    const { name } = req.query;
    if(name) res.status(200).send(`NIY: Here we are going to search a dog with name: ${name}`)
    else res.status(200).send("We'll see all te cards")
}


const getDogIdHandler = (req, res) => {
    const { id } = req.params;
    res.status(200).send(`NIY: Here we are going to see the dog with ID: ${id}`)
}


const getDogNameHandler = (req, res) => {
    res.status(200).send("NIY: Here we should see the name")
}


const createDogHandler = (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body;
    res.status(200).send(`NIY: Here we are going to create a new dog with the following data:
        name:${name},
        height:${height}, 
        weight:${weight}, 
        life_span:${life_span}, 
        temperament:${temperament}
    `)
}




module.exports = {
    getDogsHandler,
    getDogIdHandler,
    getDogNameHandler,
    createDogHandler
}