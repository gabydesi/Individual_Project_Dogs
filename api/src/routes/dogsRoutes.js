const {Router} = require("express")
const {
    getDogsHandler,
    getDogIdHandler,
    createDogHandler
} = require("../handlers/dogsHandlers")


const dogsRouter = Router()

//validations for db protection
const postValidate = (req, res, next) => {
    const { name, height, weight } = req.body;
    if(!name || !height || !weight) res.status(404).json({error: "Missing data"})
    
    next();
}




//GET /dogs also dogs?name="..."
dogsRouter.get("/", getDogsHandler)

//GET /dogs/{idRaza}
dogsRouter.get("/:id", getDogIdHandler)

//POST /dogs
dogsRouter.post("/create", postValidate, createDogHandler)



module.exports = dogsRouter;


