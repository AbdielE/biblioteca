const {Router} = require("express")
const {verlibros, buscarLibro,agregarLibro, actlzEdoLibro} = require("../controllers/libros")
const router = Router()

// http://localhost:4000/api/v1/libros

//GET
router.get("/",verlibros)
router.get("/isbn/:isbn",buscarLibro) //http://localhost:4000/api/v1/libros/isbn/11

//POST
router.post("/", agregarLibro)

//PUT
router.put("/", actlzEdoLibro)

module.exports = router