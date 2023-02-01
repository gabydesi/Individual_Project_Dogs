const { getDogsTemperament } = require("../controllers/dogsTemperaments");

//función que se va a ejecutar cuando yo reciba la req en el endpoint
//no será responsabilidad del handler pedir info directamente en la db o en la api externa
//esta función llamará a la función que obtiene los datos de la db, en este caso los controllers
//y cuando ya tenga los datos dará la respuesta

const dogTemperament = async (req, res) => {
  try {
    const dogsTemperament = await getDogsTemperament();
    res.status(200).json(dogsTemperament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  dogTemperament,
};
