const express = require('express')
const cors = require("cors")
const lectores = require("./routes/lectores")
const libros = require("./routes/libros")
const prestamos = require("./routes/prestamos")
class Server{
    constructor(){
        this.app = express()
        this.paths = {
            lectores:"/api/v1/lectores",
            libros:"/api/v1/libros",
            prestamos:"/api/v1/prestamos",
        }
        this.middlewares()
        this.routes()
    }

    routes(){
        this.app.use(this.paths.lectores, lectores)
        this.app.use(this.paths.libros, libros)
        this.app.use(this.paths.prestamos, prestamos)
    }

    middlewares(){
        this.app.use(cors())//Permite solicitudes de origen cruzado
        this.app.use(express.json()) //Habilita la lectura de contenido en formato JSON
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log("Proyecto en ejecución en el puerto",process.env.PORT)
        })
    }
}

module.exports = Server //Exporta módulo