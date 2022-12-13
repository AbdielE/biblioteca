const {Router} = require("express")
const {verPrestamos, buscarPrestamo,registrarPrestamo,actlzEdoPrestamo} = require("../controllers/prestamos")
const router = Router()

// http://localhost:4000/api/v1/prestamos

//GET
router.get("/",verPrestamos)
router.get("/id/:id",buscarPrestamo) //http://localhost:4000/api/v1/prestamos/id/11

//POST
router.post("/", registrarPrestamo)

//PUT
router.put("/", actlzEdoPrestamo)

module.exports = router