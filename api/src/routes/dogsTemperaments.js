const {Router} = require("express")
const { dogTemperament } = require("../handlers/temperamentHandler")

const temperamentRouter = Router()

//GET /temperaments
temperamentRouter.get("/", dogTemperament)

module.exports = temperamentRouter;