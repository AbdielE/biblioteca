const {Router} = require("express")
const {verLectores, verLectorPorID, agregarLector, actlzrLectorPorUsuario} = require("../controllers/lectores")
const router = Router()

// http://localhost:4000/api/v1/lectores

//GET
router.get("/",verLectores)
router.get("/id/:id",verLectorPorID) //http://localhost:4000/api/v1/lectores/id/11

//POST
router.post("/", agregarLector)

//PUT
router.put("/", actlzrLectorPorUsuario)

module.exports = router