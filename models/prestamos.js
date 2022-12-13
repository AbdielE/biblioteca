const consultasPrestamos = {
    conVerprestamos:                                 //Consulta para ver todos los prestamos de la tabla.
    `SELECT * FROM prestamo`,                            
    conBuscarPrestamo:                              //Consulta para buscar un libro.
    `SELECT * FROM prestamo
        WHERE ID = ?`,       
    conLibroDisp:                                //Consulta para comprobar si ya existe un libro igual.
    `SELECT ISBN 
        FROM libros 
        WHERE 
        ISBN = ? AND estado = "Activo"`,  
    conAgregarPrestamo:                               //Consulta para agregar usuario libro.
    `INSERT INTO prestamo (
        ISBNlibro,
        IDlector,
        fcEntrega,
        estado
    ) VALUES (
        ?,
        ?,
        ?,
        ?
    )`,
    conExistePrestamo:
    `SELECT ID 
    FROM prestamo 
    WHERE 
    ID = ?`
    ,
    conActlzEdoPrestamo:                                 //Consulta para actualizar estado del libro.
    `UPDATE prestamo SET
        estado = ?
    WHERE ID = ?` 
}
module.exports = {consultasPrestamos}