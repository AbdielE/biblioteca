const consultasLectores = {
    conVerLectores:                                 //Consulta para ver todos los usuarios de la tabla.
    `SELECT ID, Usuario, Nombre, Apellidos, Edad, Activo, Creado, Modificado
        FROM lectores`,                            
    conVerLectorPorID:                              //Consulta para ver el usuario lector según el ID dado.
    `SELECT ID,  Usuario, Nombre,  Apellidos, Edad, Activo, Creado, Modificado
        FROM lectores
        WHERE ID = ?`,       
    conExisteLector:                                //Consulta para comprobar si ya existe un usuario igual.
    `SELECT Usuario 
        FROM lectores 
        WHERE 
        Usuario = ?`,  
    conAgregarLector:                               //Consulta para agregar usuario lector.
    `INSERT INTO lectores (
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Contrasena,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    obtInfoUsuario:                                 //Consulta para obtener información del usuario dado.
    `SELECT Usuario, Nombre, Apellidos, Edad 
        FROM lectores 
        WHERE Usuario = ?`,
    actlzrUsuario:                                  //Consulta para actualizar información del usuario dado.
    `UPDATE lectores SET
        Nombre = ?,
        Apellidos = ?,
        Edad = ?
    WHERE Usuario = ?`,
    desactLector:                                   //Consulta para desactivar un usuario dado.
    `UPDATE lectores SET Activo='N' WHERE ID = ?`,
    conIniSesion:                                    //Consulta para iniciar sesión.
    `SELECT Usuario, Contrasena, Activo FROM lectores WHERE Usuario = ?`,
    conActlzContra:                                 //Consulta para actualizar contraseña.
    `UPDATE lectores SET
        Contrasena = ?
    WHERE Usuario = ?` 
}
module.exports = {consultasLectores}