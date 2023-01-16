//función que se va a ejecutar cuando yo reciba la req en el endpoint
//no será responsabilidad del handler pedir info directamente en la db o en la api externa
//esta función llamará a la función que obtiene los datos de la db, en este caso los controllers
//y cuando ya tenga los datos dará la respuesta

const dogTemperament = (req, res) => {
    res.status(200).send("NIY: Here we are going to see all the dogs temperaments")
}

module.exports = {
    dogTemperament
}