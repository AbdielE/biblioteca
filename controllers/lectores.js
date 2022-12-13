const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/conexion");
const {consultasLectores} = require("../models/lectores");

//Endpoint para ver todos los usuarios de la tabla lectores.
const verLectores = async (req =request, res = response) => {
    let conn;

    try{
        conn = await pool.getConnection()
        const lectores = await conn.query(consultasLectores.conVerLectores, (error)=>{throw new error})
        
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
        Domicilio,
	    Telefono,
        Contrasena,
        Activo
    } = req.body

    if(
        !Usuario||
        !Nombre||
        !Apellidos||
        !Domicilio ||
	    !Telefono ||
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
            Domicilio,
            Telefono,
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

//Endpoint para actualizar un usuario en la tabla lectores.
const actlzrLectorPorUsuario = async (req =request, res = response) => {
    const {
        Usuario,
        Nombre,
        Apellidos,
        Domicilio,
	    Telefono,
        Activo
    } = req.body

    if(
        !Usuario||
        !Nombre||
        !Apellidos||
        !Domicilio||
	    !Telefono
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [lector] = await conn.query(consultasLectores.obtInfoUsuario, [Usuario])

        if(!lector){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }


        const {affectedRows} = await conn.query(consultasLectores.actlzrUsuario, [
            Nombre || lector.Nombre,
            Apellidos || lector.Apellidos,
            Domicilio|| lector.Domicilio,
            Telefono|| lector.Telefono,
            Activo||lector.Activo,
            Usuario
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg:`El usuario ${Usuario} se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para desactivar un usuario en la tabla lectores.
const desactLector = async (req =request, res = response) => {
    const {id} = req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(consultasLectores.desactLector, [id], (error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo eliminar el registro con el ID ${id}`})
            return
        }
        res.json({msg:`El usuario con ID ${id} se eliminó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para iniciar sesión.
const iniSesion = async (req =request, res = response) => {
    const {
        Usuario,
        Contrasena
    } = req.body

    if(
        !Usuario||
        !Contrasena
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [lector] = await conn.query(consultasLectores.conIniSesion, [Usuario])

        if(!lector || lector.Activo === 'N'){
            let code = !lector ? 1:2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, lector.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:3})
            return
        }

        res.json({msg:`El usuario ${Usuario} ha iniciado sesión satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Endpoint para actualizar contraseña.
const actlzContrasena = async (req =request, res = response) => {
    const {
        Usuario,
        Contrasena,
        ContrasenaNueva
    } = req.body

    if(
        !Usuario,
        !Contrasena,
        !ContrasenaNueva
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()

        const [lector] = await conn.query(consultasLectores.conIniSesion, [Usuario])

        if(!lector){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }
        if(!lector || lector.Activo === 'N'){
            let code = !lector ? 1:2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, lector.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos.`, errorCode:3})
            return
        }

        if(Contrasena===ContrasenaNueva){
            res.status(403).json({msg:`No puede utilizar la contraseña anterior, ingrese una nueva.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(ContrasenaNueva, salt)

        const {affectedRows} = await conn.query(consultasLectores.conActlzContra, [
            contrasenaCifrada,
            Usuario
        ], (error)=>{throw new error})

        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar la contraseña`})
            return
        }
        res.json({msg:`La contraseña se actualizó satisfactoriamente.`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {verLectores, verLectorPorID, agregarLector,actlzrLectorPorUsuario, desactLector, iniSesion, actlzContrasena}