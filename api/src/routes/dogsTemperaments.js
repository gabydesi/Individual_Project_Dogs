const {Router} = require("express")

const temperamentRouter = Router()


//GET /temperaments
temperamentRouter.get("/", (req, res) => {
    res.status(200).send("NIY: Here we are going to see all the dogs temperaments")
})

module.exports = temperamentRouter;