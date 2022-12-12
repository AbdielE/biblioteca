const consultasLibros = {
    conVerlibros:                                 //Consulta para ver todos los libros de la tabla.
    `SELECT ISBN, titulo, autor, editorial, volumen, edicion, genero, lugarPub, fechaPub, estado
        FROM libros`,                            
    conBuscarLibro:                              //Consulta para buscar un libro.
    `SELECT ISBN, titulo, autor, editorial, volumen, edicion, genero, lugarPub, fechaPub, estado
        FROM libros
        WHERE ISBN = ? OR titulo = ?`,       
    conExisteLibro:                                //Consulta para comprobar si ya existe un libro igual.
    `SELECT ISBN 
        FROM libros 
        WHERE 
        ISBN = ?`,  
    conAgregarlibro:                               //Consulta para agregar usuario libro.
    `INSERT INTO libros (
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
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
    	?,
        ?,
        ?,
        ?
    )`,
    conActlzEdoLibro:                                 //Consulta para actualizar estado del libro.
    `UPDATE libros SET
        estado = ?
    WHERE ISBN = ?` 
}
module.exports = {consultasLibros}