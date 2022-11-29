require('dotenv').config()

const Server = require('./server') //Importa módulo
const server = new Server()

server.listen()