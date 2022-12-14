const consultasPrestamos = {
    conVerprestamos:                        //Consulta para ver todos los prestamos de la tabla.
    `SELECT * FROM prestamo`,                            
    conBuscarPrestamo:                      //Consulta para buscar un prestamo.
    `SELECT * FROM prestamo
        WHERE ID = ?`,       
    conLibroDisp:                           //Consulta para comprobar si el libro está disponible para préstamo.
    `SELECT ISBN 
        FROM libros 
        WHERE 
        ISBN = ? AND estado = "Activo"`,  
    conAgregarPrestamo:                     //Consulta para registrar un Prestamo.
    `INSERT INTO prestamo (
        ISBNlibro,
        IDlector,
        fcEntrega,
        estado
    ) VALUES (
        ?,
        ?,
        ?,
        'Activo'
    )`,
    conActLibro:                            //Consulta para actualizar el estado del libro a Prestado.
    `UPDATE libros SET
        estado = 'Prestado'
    WHERE ISBN = ?`
    ,
    conExistePrestamo:                      //Consulta para comprobar que exista el préstamo y a su vez recopilar datos de este.
    `SELECT ID, ISBNlibro, estado
    FROM prestamo 
    WHERE 
    ID = ?`
    ,
    conDevolverPrestamo:                    //Consulta para devolver Prestamo.
    `UPDATE prestamo INNER JOIN libros SET
        prestamo.estado = ?,
        libros.estado = "Activo"
    WHERE prestamo.ID = ? AND libros.ISBN = ?`,
    conAtrasarPrestamo:                    //Consulta para atrasar Prestamo.
    `UPDATE prestamo SET
        estado = "Atrasado"
    WHERE ID = ?` 
}
module.exports = {consultasPrestamos}