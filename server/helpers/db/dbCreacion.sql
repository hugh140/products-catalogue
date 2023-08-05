DROP DATABASE cat_productos;
CREATE DATABASE cat_productos;
USE cat_productos;

CREATE TABLE Productos (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  nombreProducto VARCHAR(200) NOT NULL,
  imgProducto VARCHAR(200) NOT NULL,
  descrProducto VARCHAR(1000),
  especProducto VARCHAR(1000),
  precioProducto FLOAT NOT NULL
);

CREATE TABLE Usuarios (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  nombreUsuario VARCHAR(100) UNIQUE NOT NULL,
  emailUsuario VARCHAR(100) UNIQUE NOT NULL,
  passUsuario VARCHAR(100) NOT NULL,
  permisoUsuario VARCHAR(100) NOT NULL
);

CREATE TABLE Comentarios (
  idComentario INT AUTO_INCREMENT PRIMARY KEY,
  textoComentario VARCHAR(2000) NOT NULL,
  idUsuario INT,
  idProducto INT,
  FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
  FOREIGN KEY (idProducto) REFERENCES Productos(idProducto)
);

CREATE TABLE ListaDeseados (
  idLista INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT,
  idProducto INT,
  FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
  FOREIGN KEY (idProducto) REFERENCES Productos(idProducto)
);