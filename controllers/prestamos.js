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
        fcEntrega
    } = req.body

    if(
        !ISBNlibro||
        !IDlector||
        !fcEntrega
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
            fcEntrega
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del prestamo.`})
            return
        }
        const {affectedRows2} = await conn.query(consultasPrestamos.conActLibro, [ISBNlibro], (error)=>{throw new error})
        if(affectedRows2===0){
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
        IDPrestamo,
	    edoPrestamo
    } = req.body

    if(
        !IDPrestamo||
        !edoPrestamo
    ){
        res.status(400).json({msg:"Falta información del Prestamo."})
        return
    }

    if (edoPrestamo=="Devuelto" || edoPrestamo=="Atrasado") {
        let conn;
        try{
            conn = await pool.getConnection()

            const [Prestamo] = await conn.query(consultasPrestamos.conExistePrestamo, [IDPrestamo])

            if(!Prestamo){
                res.status(403).json({msg:`El Prestamo con ID '${ID}' no se encuentra registrado.`})
                return
            }

            if (Prestamo.estado=="Devuelto") {
                res.status(404).json({msg:`El prestamo ya se encuentra registrado como `+Prestamo.estado+"."})
                return
            }

            if(edoPrestamo=="Devuelto"){
                const {affectedRows} = await conn.query(consultasPrestamos.conDevolverPrestamo, [
                    edoPrestamo,
                    IDPrestamo,
                    Prestamo.ISBNlibro
                ], (error)=>{throw new error})
        
                if(affectedRows===0){
                    res.status(404).json({msg:`No se pudo actualizar el estado del prestamo.`})
                    return
                }
                res.json({msg:`El estado del prestamo ha cambiado a `+edoPrestamo})
            }

            if(edoPrestamo=="Atrasado"){
                const {affectedRows} = await conn.query(consultasPrestamos.conAtrasarPrestamo,[IDPrestamo], (error)=>{throw new error})
        
                if(affectedRows===0){
                    res.status(404).json({msg:`No se pudo actualizar el estado del prestamo.`})
                    return
                }
                res.json({msg:`El estado del prestamo ha cambiado a `+edoPrestamo})
            }
    
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
            }
        }
    }else{
        res.status(400).json({msg:"El estado '"+edoPrestamo+"' no está permitido. Los prestamos solo pueden cambiar a 'Devuelto' o 'Atrasado'."})
        return
    }
}

module.exports = {verPrestamos, buscarPrestamo,registrarPrestamo,actlzEdoPrestamo}