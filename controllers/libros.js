const { request, response } = require("express");
const pool = require("../db/conexion");
const {consultasLibros} = require("../models/libros");

//Endpoint para ver todos los libros.
const verlibros = async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const [libros] = await conn.query(consultasLibros.conVerlibros, (error)=>{throw new error})
        
        if(!libros){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({libros})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para buscar un libro.
const buscarLibro= async (req =request, res = response) => {
    const {isbn} = req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [libros] = await conn.query(consultasLibros.conBuscarLibro, [isbn,isbn], (error)=>{throw new error})
        
        if(!libros){
            res.status(404).json({msg:`No se encontraron libros con el ISBN o título dado.`})
            return
        }
        res.json({libros})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para agregar un libro.
const agregarLibro = async (req =request, res = response) => {
    const {
        ISBN,
        titulo,
        autor,
        editorial,
	    volumen,
        edicion,
	    genero,
        lugarPub,
	    fechaPub,
	    estado
    } = req.body

    if(
        !ISBN||
        !titulo||
        !autor||
        !editorial||
        !edicion||
        !lugarPub||
        !fechaPub||
        !estado
    ){
        res.status(400).json({msg:"Falta información del libro."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [lector] = await conn.query(consultasLibros.conExisteLibro, [ISBN])
        if(lector){
            res.status(403).json({msg:`El ISBN '${ISBN}' ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(consultasLibros.conAgregarlibro, [
            ISBN,
            titulo,
            autor,
            editorial,
            volumen,
            edicion,
            genero,
            lugarPub,
            fechaPub,
            estado
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del libro ${titulo}`})
            return
        }
        res.json({msg:`El libro ${titulo} se agregó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para actualizar un libro.
const actlzEdoLibro = async (req =request, res = response) => {
    const {
        ISBN,
	    estado
    } = req.body

    if(
        !ISBN||
        !estado
    ){
        res.status(400).json({msg:"Falta información del libro."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [libro] = await conn.query(consultasLibros.conExisteLibro, [ISBN])

        if(!libro){
            res.status(403).json({msg:`El libro con ISBN '${ISBN}' no se encuentra registrado.`})
            return
        }


        const {affectedRows} = await conn.query(consultasLibros.conActlzEdoLibro, [
            estado,
            ISBN
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el estado del libro.`})
            return
        }
        res.json({msg:`El estado del libro se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {verlibros, buscarLibro,agregarLibro,actlzEdoLibro}