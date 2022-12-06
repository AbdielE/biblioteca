const consultasLectores = {
    conVerLectores:"SELECT * FROM lectores",                            //Consulta para ver todos los usuarios de la tabla.
    conVerLectorPorID: `SELECT * FROM lectores WHERE ID = ?`,           //Consulta para ver el usuario lector según el ID dado.
    conExisteLector: `SELECT Usuario FROM usuarios WHERE Usuario = ?`,  //Consulta para comprobar si ya existe un usuario igual.
    conAgregarLector:                                                   //Consulta para agregar usuario lector.
    `
    INSERT INTO lectores (
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
    )
    `,
}
module.exports = {consultasLectores}