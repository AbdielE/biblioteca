const {Router} = require("express")
const {verLectores, verLectorPorID, agregarLector, actlzrLectorPorUsuario, desactLector, iniSesion, actlzContrasena} = require("../controllers/lectores")
const router = Router()

// http://localhost:4000/api/v1/lectores

//GET
router.get("/",verLectores)
router.get("/id/:id",verLectorPorID) //http://localhost:4000/api/v1/lectores/id/11

//POST
router.post("/", agregarLector)
router.post("/iniciar", iniSesion)

//PUT
router.put("/", actlzrLectorPorUsuario)
router.put("/actContra", actlzContrasena)

//DELETE
router.delete("/", desactLector) // http://localhost:4000/api/v1/lectores/?id=1

module.exports = router