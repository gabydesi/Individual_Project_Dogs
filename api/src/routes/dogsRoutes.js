const {Router} = require("express")
const {
    getDogsHandler,
    getDogIdHandler,
    createDogHandler
} = require("../handlers/dogsHandlers")


const dogsRouter = Router()



//GET /dogs also dogs?name="..."
dogsRouter.get("/", getDogsHandler)

//GET /dogs/{idRaza}
dogsRouter.get("/:id", getDogIdHandler)

//POST /dogs
dogsRouter.post("/create", createDogHandler)



module.exports = dogsRouter;


