const connection = require("../helpers/db/dbConexion");
const errorMessage = require("../helpers/scripts/controllerErrors");
const {
  saveImgBinaries,
  deleteImages,
} = require("../helpers/scripts/manipulateImages");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

class ProductoModel {
  static post(res, data, token) {
    const sql = "INSERT INTO productos VALUES ('', ?, ?, ?, ?, ?)";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");

      const prepareData = [
        data.nombre,
        saveImgBinaries(data.imagen),
        data.descripcion,
        data.especificacion,
        data.precio,
      ];

      connection.execute(sql, prepareData, (error) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El producto se ha guardado correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static getProductos(res) {
    const sql =
      "SELECT idProducto, nombreProducto, imgProducto, descrProducto, precioProducto FROM productos ORDER BY idProducto DESC";

    connection.query(sql, (error, results) => {
      try {
        if (error) throw new Error(error);
        else res.json(results);
      } catch (e) {
        errorMessage(res, e, 400);
      }
    });
  }

  static getProducto(res, id) {
    const sqlProducto = "SELECT * FROM productos WHERE idProducto = ?";

    const sqlComentarios =
      "SELECT usuarios.nombreUsuario, comentarios.textoComentario, comentarios.idComentario, usuarios.idUsuario FROM productos INNER JOIN comentarios ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE productos.idProducto = ? ORDER BY comentarios.idComentario DESC";

    let resultados;

    connection.execute(sqlProducto, [id], (error, results) => {
      try {
        if (error) throw new Error(error);
        else resultados = results[0];
      } catch (e) {
        errorMessage(res, e, 400);
      }
    });

    connection.execute(sqlComentarios, [id], (error, results) => {
      try {
        if (error) throw new Error(error);
        else res.json({ ...resultados, comentarios: results });
      } catch (e) {
        errorMessage(res, e, 400);
      }
    });
  }

  static getProductoAuth(res, id, token) {
    const sqlProducto = "SELECT * FROM productos WHERE idProducto = ?";

    const sqlComentarios =
      "SELECT usuarios.nombreUsuario, comentarios.textoComentario, comentarios.idComentario, usuarios.idUsuario FROM productos INNER JOIN comentarios ON comentarios.idProducto = productos.idProducto INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE productos.idProducto = ? ORDER BY comentarios.idComentario DESC";

    const sqlLista =
      "SELECT * FROM `listadeseados` WHERE idUsuario = ? AND idProducto = ?";

    let resultados;

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      connection.execute(sqlProducto, [id], (error, results) => {
        try {
          if (error) throw new Error(error);
          else resultados = results[0];
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });

      connection.execute(
        sqlLista,
        [decoded.usuario.id, id],
        (error, results) => {
          try {
            if (error) throw new Error(error);
            else
              resultados = { ...resultados, guardado: Boolean(results.length) };
          } catch (e) {
            errorMessage(res, e, 400);
          }
        }
      );

      connection.execute(sqlComentarios, [id], (error, results) => {
        try {
          if (error) throw new Error(error);
          else res.json({ ...resultados, comentarios: results });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static put(res, data, id, token) {
    const sqlGetImgUrl = `SELECT imgProducto FROM productos WHERE idProducto = ?`;
    const sqlUpdate = `UPDATE productos SET nombreProducto = ?, imgProducto = ?, descrProducto = ?, especProducto = ?, precioProducto = ? WHERE idProducto = ?`;

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");

      connection.execute(sqlGetImgUrl, [id], (error, results) => {
        try {
          if (error) throw new Error(error);
          else deleteImages(results[0].imgProducto);
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });

      const prepareData = [
        data.nombre,
        saveImgBinaries(data.imagen),
        data.descripcion,
        data.especificacion,
        data.precio,
        id,
      ];

      connection.execute(sqlUpdate, prepareData, (error) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El producto se ha actualizado correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static delete(res, id, token) {
    const sqlGetImgUrl = `SELECT imgProducto FROM productos WHERE idProducto = ?`;

    const sqlDelete = `DELETE FROM listadeseados WHERE idProducto = ?; 
    DELETE FROM comentarios WHERE idProducto = ?; 
    DELETE FROM productos WHERE idProducto = ?`;

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");

      connection.execute(sqlGetImgUrl, [id], (error, results) => {
        try {
          if (error) throw new Error(error);
          deleteImages(results[0].imgProducto);
        } catch (e) {
          errorMessage(res, e, 502);
        }
      });

      connection.query(sqlDelete, [id, id, id], (error) => {
        try {
          if (error) throw new Error(error);
          else
            res.json({
              message: "El producto se ha eliminado correctamente.",
              ok: true,
            });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }
}

module.exports = ProductoModel;
