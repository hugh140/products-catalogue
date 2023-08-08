-- Productos
INSERT INTO productos VALUES ('', ?, ?, ?, ?, ?)

SELECT idProducto, nombreProducto, imgProducto, descrProducto, precioProducto FROM productos

SELECT * FROM productos WHERE idProducto = ?
SELECT usuarios.nombreUsuario, comentarios.textoComentario, comentarios.idComentario, usuarios.idUsuario FROM productos INNER JOIN comentarios ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE productos.idProducto = ? ORDER BY comentarios.idComentario DESC

SELECT usuarios.nombreUsuario, comentarios.textoComentario, comentarios.idComentario, usuarios.idUsuario FROM productos INNER JOIN comentarios ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE productos.idProducto = ? ORDER BY comentarios.idComentario DESC
SELECT * FROM `listadeseados` WHERE idUsuario = ? AND idProducto = ?

SELECT imgProducto FROM productos WHERE idProducto = ?
UPDATE productos SET nombreProducto = ?, imgProducto = ?, descrProducto = ?, especProducto = ?, precioProducto = ? WHERE idProducto = ?

SELECT imgProducto FROM productos WHERE idProducto = ?
DELETE FROM listadeseados WHERE idProducto = ?; 
DELETE FROM comentarios WHERE idProducto = ?; 
DELETE FROM productos WHERE idProducto = ?


-- Usuarios
SELECT 1 FROM usuarios WHERE nombreUsuario = ? OR emailUsuario = ?

INSERT INTO usuarios VALUES ('', ?, ?, ?, 'usuario')
SELECT LAST_INSERT_ID() AS lastIndex

SELECT idUsuario, permisoUsuario, passUsuario FROM usuarios WHERE emailUsuario = ?

SELECT nombreProducto, imgProducto, descrProducto, especProducto, precioProducto FROM productos WHERE idProducto = ?
SELECT emailUsuario, nombreUsuario FROM usuarios WHERE idUsuario = ?

SELECT idUsuario, nombreUsuario, emailUsuario, permisoUsuario FROM usuarios

SELECT nombreUsuario, emailUsuario, permisoUsuario FROM usuarios WHERE idUsuario = ?

UPDATE usuarios SET nombreUsuario = ?, passUsuario = ?, permisoUsuario = ? WHERE idUsuario = ?

UPDATE usuarios SET nombreUsuario = ? WHERE idUsuario = ?

DELETE FROM usuarios WHERE idUsuario = ?


-- Comentarios
INSERT INTO comentarios VALUES ('', ?, ?, ?)

SELECT productos.idProducto, idComentario, nombreProducto, imgProducto, textoComentario FROM comentarios INNER JOIN productos ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE usuarios.nombreUsuario = ? ORDER BY productos.idProducto DESC

UPDATE comentarios SET textoComentario = ?, idProducto = ? WHERE idComentario = ? AND idUsuario = ?

DELETE FROM comentarios WHERE idComentario = ?
DELETE FROM comentarios WHERE idComentario = ? AND idUsuario = ?


-- Lista de Deseos
SELECT idUsuario FROM listadeseados WHERE idUsuario = ? AND idProducto = ?
INSERT INTO listadeseados VALUES ('', ?, ?)

SELECT productos.idProducto, nombreProducto, imgProducto, descrProducto, precioProducto FROM listadeseados INNER JOIN productos ON productos.idProducto = listadeseados.idProducto WHERE idUsuario = ?

DELETE FROM listadeseados WHERE idUsuario = ? AND idProducto = ?
