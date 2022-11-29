const express = require('express')
const cors = require("cors")
const lectores = require("./routes/lectores")
class Server{
    constructor(){
        this.app = express()
        this.paths = {
            lectores:"/api/v1/lectores",
        }
        this.middlewares()
        this.routes()
    }

    routes(){
        this.app.use(this.paths.lectores, lectores)
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