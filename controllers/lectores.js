const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/conexion");
const {consultasLectores} = require("../models/lectores");

//Endpoint para ver todos los usuarios de la tabla lectores.
const verLectores = async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const [lectores] = await conn.query(consultasLectores.conVerLectores, (error)=>{throw new error})
        
        if(!lectores){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({lectores})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para ver el usuario lector según el ID dado.
const verLectorPorID = async (req =request, res = response) => {
    const {id} = req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [lectores] = await conn.query(consultasLectores.conVerLectorPorID, [id], (error)=>{throw new error})
        
        if(!lectores){
            res.status(404).json({msg:`No se encontraron registros con el ID ${id}`})
            return
        }
        res.json({lectores})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para agregar un usuario en la tabla lectores.
const agregarLector = async (req =request, res = response) => {
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Contrasena,
        Activo
    } = req.body

    if(
        !Usuario||
        !Nombre||
        !Apellidos||
        !Edad||
        !Contrasena||
        !Activo
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [lector] = await conn.query(consultasLectores.conExisteLector, [Usuario])
        if(lector){
            res.status(403).json({msg:`El usuario '${Usuario}' ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

        const {affectedRows} = await conn.query(consultasLectores.conAgregarLector, [
            Usuario,
            Nombre,
            Apellidos,
            Edad,
            contrasenaCifrada,
            Activo
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg:`El usuario ${Usuario} se agregó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {verLectores, verLectorPorID, agregarLector}