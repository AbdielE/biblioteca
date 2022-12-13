const { request, response } = require("express");
const pool = require("../db/conexion");
const {consultasPrestamos} = require("../models/prestamos");

//Endpoint para ver todos los Prestamos.
const verPrestamos = async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const Prestamos = await conn.query(consultasPrestamos.conVerprestamos, (error)=>{throw new error})
        
        if(!Prestamos){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({Prestamos})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para buscar un Prestamo.
const buscarPrestamo= async (req =request, res = response) => {
    const {id} = req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [Prestamos] = await conn.query(consultasPrestamos.conBuscarPrestamo, [id], (error)=>{throw new error})
        
        if(!Prestamos){
            res.status(404).json({msg:`No se encontraron prestamos con el ID dado.`})
            return
        }
        res.json({Prestamos})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para agregar un Prestamo.
const registrarPrestamo = async (req =request, res = response) => {
    const {
        ISBNlibro,
        IDlector,
        fcEntrega,
	    estado
    } = req.body

    if(
        !ISBNlibro||
        !IDlector||
        !fcEntrega||
        !estado
    ){
        res.status(400).json({msg:"Falta información del prestamo."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [prestamo] = await conn.query(consultasPrestamos.conLibroDisp, [ISBNlibro])
        if(!prestamo){
            res.status(403).json({msg:`El libro con ISBN '${ISBNlibro}' no se encuentra disponible para préstamo.`})
            return
        }

        const {affectedRows} = await conn.query(consultasPrestamos.conAgregarPrestamo, [
            ISBNlibro,
            IDlector,
            fcEntrega,
            estado
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del prestamo.`})
            return
        }
        res.json({msg:`El prestamo del libro con ISBN ${ISBNlibro} se agregó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para actualizar un Prestamo.
const actlzEdoPrestamo = async (req =request, res = response) => {
    const {
        ID,
	    estado
    } = req.body

    if(
        !ID||
        !estado
    ){
        res.status(400).json({msg:"Falta información del Prestamo."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [Prestamo] = await conn.query(consultasPrestamos.conExistePrestamo, [ID])

        if(!Prestamo){
            res.status(403).json({msg:`El Prestamo con ID '${ID}' no se encuentra registrado.`})
            return
        }


        const {affectedRows} = await conn.query(consultasPrestamos.conActlzEdoPrestamo, [
            estado,
            ID
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el estado del prestamo.`})
            return
        }
        res.json({msg:`El estado del prestamo se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {verPrestamos, buscarPrestamo,registrarPrestamo,actlzEdoPrestamo}