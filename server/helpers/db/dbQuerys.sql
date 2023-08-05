-- Productos
INSERT INTO productos VALUES ('', ?, ?, ?, ?, ?)

SELECT idProducto, nombreProducto, imgProducto, descrProducto, precioProducto FROM productos

SELECT * FROM productos WHERE idProducto = ?
SELECT usuarios.nombreUsuario, comentarios.textoComentario, comentarios.idComentario FROM productos INNER JOIN comentarios ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE productos.idProducto = ?

SELECT imgProducto FROM productos WHERE idProducto = ?
UPDATE productos SET nombreProducto = ?, imgProducto = ?, descrProducto = ?, especProducto = ?, precioProducto = ? WHERE idProducto = ?

SELECT imgProducto FROM productos WHERE idProducto = ?
DELETE FROM productos WHERE idProducto = ?


-- Usuarios
INSERT INTO usuarios VALUES ('', ?, ?, ?, 'usuario')

SELECT nombreProducto, imgProducto, descrProducto, especProducto, precioProducto FROM productos WHERE idProducto = ?
SELECT emailUsuario, nombreUsuario FROM usuarios WHERE idUsuario = ?

SELECT idUsuario, nombreUsuario, emailUsuario, permisoUsuario FROM usuarios

UPDATE usuarios SET nombreUsuario = ?, passUsuario = ?, permisoUsuario = ? WHERE idUsuario = ?

UPDATE usuarios SET nombreUsuario = ?, passUsuario = ? WHERE idUsuario = ?

DELETE FROM usuarios WHERE idUsuario = ?


-- Comentarios
INSERT INTO comentarios VALUES ('', ?, ?, ?)

UPDATE comentarios SET textoComentario = ?, idProducto = ? WHERE idComentario = ? AND idUsuario = ?

DELETE FROM comentarios WHERE idComentario = ? AND idUsuario = ?


-- Lista de Deseos
SELECT idUsuario FROM listadeseados WHERE idUsuario = ? AND idProducto = ?
INSERT INTO listadeseados VALUES ('', ?, ?)

SELECT productos.idProducto, nombreProducto, imgProducto, descrProducto, precioProducto FROM listadeseados INNER JOIN productos ON productos.idProducto = listadeseados.idProducto WHERE idUsuario = ?

DELETE FROM listadeseados WHERE idUsuario = ? AND idProducto = ?
