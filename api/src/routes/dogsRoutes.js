const {Router} = require("express")

const dogsRouter = Router()

//GET /dogs
dogsRouter.get("/", (req, res) => {
    res.status(200).send("NIY: Here we are going to see all the cards and filters")
})

//GET /dogs/{idRaza}
dogsRouter.get("/:id", (req, res) => {
    res.status(200).send("NIY: Here we are going to search dog by ID")
})

//GET /dogs?name="..."
dogsRouter.get("/?name", (req, res) => {
    res.status(200).send("NIY: Here we are going to search dog by name")
})

//POST /dogs
dogsRouter.post("/", (req, res) => {
    res.status(200).send("NIY: Here we are going to create a new dog")
})



module.exports = dogsRouter;


