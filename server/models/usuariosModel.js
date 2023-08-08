const { writeFileSync, readFile, unlink, unlinkSync, readdir } = require("fs");
const connection = require("../helpers/db/dbConexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const errorMessage = require("../helpers/scripts/controllerErrors");
const transporter = require("../helpers/scripts/emailConexion");
const getRandomNumber = require("../helpers/scripts/getRandomNumber");
const emailContent = require("../helpers/htmlModel/emailModel");
const codeModel = require("../helpers/htmlModel/codeModel");

const SECRET = process.env.SECRET;
const emailPinsDir = __dirname + "/../files/emailPins/";

class UsuarioModel {
  static postRegistro(res, data) {
    const sql =
      "SELECT 1 FROM usuarios WHERE nombreUsuario = ? OR emailUsuario = ?";

    const prepareData = [data.nombre, data.correo];

    connection.execute(sql, prepareData, (error, result) => {
      try {
        if (error) throw new Error(error);
        if (!result[0]) sendCode();
        else throw new Error("El nombre o correo ya existen.");
      } catch (e) {
        errorMessage(res, e, 400);
      }
    });

    function sendCode() {
      bcrypt.hash(data.pass, 12, (error, hash) => {
        if (error) throw new Error(error);

        const objeto = {
          nombre: data.nombre,
          correo: data.correo,
          pass: hash,
        };
        const objetoContent = JSON.stringify(objeto);
        const code = getRandomNumber();
        const dir = emailPinsDir + data.nombre + "-" + code;

        writeFileSync(dir, objetoContent);

        transporter
          .sendMail({
            from: process.env.EMAIL,
            to: data.correo,
            subject: "Código de confirmación del correo",
            html: codeModel(code),
          })
          .then(() => {
            setTimeout(
              () =>
                unlink(dir, (error) => {
                  try {
                    if (error) throw new Error(error);
                  } catch (error) {
                    console.error(error);
                  }
                }),
              1000 * 60 * 2
            );
            res.json({
              message: "El correo se ha enviado correctamente.",
              ok: true,
            });
          })
          .catch((error) => errorMessage(res, error, 502));
      });
    }
  }

  static postComprobar(res, data) {
    const dir = emailPinsDir + data.nombre + "-" + data.codigo;

    readFile(dir, "utf8", (fsError, dsData) => {
      try {
        if (fsError)
          throw new Error(
            "El código o identificador ingresado es incorrecto, o ya expiró."
          );
        const usuario = JSON.parse(dsData);
        readdir(emailPinsDir, (error, files) => {
          const filterFiles = files.filter(
            (file) => file.split("-")[0] === data.nombre
          );
          filterFiles.forEach((file) =>
            unlink(emailPinsDir + file, (error) => {
              if (error) throw new Error(error);
            })
          );
          registrar(usuario);
        });
      } catch (error) {
        errorMessage(res, error, 400);
      }
    });

    function registrar(usuarioData) {
      const sql = "INSERT INTO usuarios VALUES ('', ?, ?, ?, 'usuario')";
      const sqlLastIndex = "SELECT LAST_INSERT_ID() AS lastIndex";

      const prepareData = [
        usuarioData.nombre,
        usuarioData.correo,
        usuarioData.pass,
      ];

      connection.execute(sql, prepareData, (error) => {
        try {
          if (error) throw new Error(error);

          connection.query(sqlLastIndex, (error, result) => {
            try {
              if (error) throw new Error(error);
              const usuario = {
                id: result[0].lastIndex,
                permiso: "usuario",
              };

              const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: Date.now() * 10 * 365 * 24 * 60 * 60,
              });

              res.cookie("PFToken", token);

              res.json({
                message: "El usuario se ha registrado correctamente.",
                ok: true,
              });
            } catch (e) {
              errorMessage(res, e, 502);
            }
          });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    }
  }

  static postLogin(res, data) {
    const sql =
      "SELECT idUsuario, permisoUsuario, passUsuario FROM usuarios WHERE emailUsuario = ?";

    connection.execute(sql, [data.correo], (queryError, queryResult) => {
      try {
        if (queryError) throw new Error(queryError);

        bcrypt.compare(
          data.pass,
          queryResult[0].passUsuario,
          (error, result) => {
            try {
              if (error) throw new Error(error);
              if (!result) throw new Error("Usuario o contraseña incorrectos");

              const usuario = {
                id: queryResult[0].idUsuario,
                permiso: queryResult[0].permisoUsuario,
              };

              const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: Date.now() * 10 * 365 * 24 * 60 * 60,
              });

              res.cookie("PFToken", token);
              res.json({
                message: "Se ha registrado correctamente.",
                ok: true,
              });
            } catch (e) {
              errorMessage(res, e, 400);
            }
          }
        );
      } catch (e) {
        errorMessage(res, e, 400);
      }
    });
  }

  static postCorreo(res, id, token) {
    const sqlProducto =
      "SELECT nombreProducto, imgProducto, descrProducto, especProducto, precioProducto FROM productos WHERE idProducto = ?";
    const sqlUsuario =
      "SELECT emailUsuario, nombreUsuario FROM usuarios WHERE idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      let prepareData;

      connection.execute(sqlProducto, [id], (error, result) => {
        try {
          if (error) throw new Error(error);
          prepareData = result[0];
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });

      connection.execute(sqlUsuario, [decoded.usuario.id], (error, result) => {
        try {
          if (error) throw new Error(error);
          prepareData = { producto: prepareData, usuario: result[0] };

          transporter
            .sendMail({
              from: process.env.EMAIL,
              to: prepareData.usuario.emailUsuario,
              subject: `Su pedido de ${prepareData.producto.nombreProducto} está procesándose`,
              html: emailContent(prepareData.producto, prepareData.usuario),
            })
            .then(() =>
              res.json({
                message: "El correo se ha enviado correctamente.",
                ok: true,
              })
            )
            .catch((error) => errorMessage(res, error, 502));
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static getUsuarios(res, token) {
    const sql =
      "SELECT idUsuario, nombreUsuario, emailUsuario, permisoUsuario FROM usuarios";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");

      connection.query(sql, (error, result) => {
        try {
          if (error) throw new Error(error);
          res.json(result);
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static getUsuario(res, token) {
    const sql =
      "SELECT nombreUsuario, emailUsuario, permisoUsuario FROM usuarios WHERE idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      connection.query(sql, [decoded.usuario.id], (error, result) => {
        try {
          if (error) throw new Error(error);
          res.json(result[0]);
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static putAdmin(res, data, token) {
    const sql =
      "UPDATE usuarios SET nombreUsuario = ?, passUsuario = ?, permisoUsuario = ? WHERE idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");

      bcrypt.hash(data.pass, 12, (error, hash) => {
        if (error) throw new Error(error);
        const prepareData = [data.nombre, hash, data.permiso, data.id];

        connection.execute(sql, prepareData, (error) => {
          try {
            if (error) throw new Error(error);
            res.json({
              message: "El usuario se ha actualizado correctamente.",
              ok: true,
            });
          } catch (e) {
            errorMessage(res, e, 400);
          }
        });
      });
    });
  }

  static putUsuario(res, data, token) {
    const sql = "UPDATE usuarios SET nombreUsuario = ? WHERE idUsuario = ?";

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);

      const prepareData = [data.nombre, decoded.usuario.id];

      connection.execute(sql, prepareData, (error) => {
        try {
          if (error) throw new Error(error);
          res.json({
            message: "Tu información se ha actualizado correctamente.",
            ok: true,
          });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }

  static delete(res, id, token) {
    const sql = `DELETE FROM listadeseados WHERE idUsuario = ?; 
    DELETE FROM comentarios WHERE idUsuario = ?; 
    DELETE FROM usuarios WHERE idUsuario = ?`;

    jwt.verify(token, SECRET, (tokenError, decoded) => {
      if (tokenError) throw new Error(tokenError);
      if (decoded.usuario.permiso !== "admin")
        throw new Error("El permiso del token es inválido.");
      if (decoded.usuario.id == id)
        throw new Error("No puedes eliminar tu mismo usuario.");

      connection.query(sql, [id, id, id], (error) => {
        try {
          if (error) throw new Error(error);
          res.json({
            message: "El usuario ha sido eliminado correctamente.",
            ok: true,
          });
        } catch (e) {
          errorMessage(res, e, 400);
        }
      });
    });
  }
}

module.exports = UsuarioModel;
