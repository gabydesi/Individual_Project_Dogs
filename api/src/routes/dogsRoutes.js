const {Router} = require("express")
const {
    getDogsHandler,
    getDogIdHandler,
    getDogNameHandler,
    createDogHandler
} = require("../handlers/dogsHandlers")


const dogsRouter = Router()



//GET /dogs
dogsRouter.get("/", getDogsHandler)

//GET /dogs/{idRaza}
dogsRouter.get("/:id", getDogIdHandler)

//GET /dogs?name="..."
dogsRouter.get("/?name", getDogNameHandler)

//POST /dogs
dogsRouter.post("/create", createDogHandler)



module.exports = dogsRouter;


