const { response, request } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { subirArchivo } = require("../helpers");
const { Usuario, TipoAlerta } = require("../models");

const mostrarImagenAlerta = async (req = request, res = response)  => {
  try {
    const {id} = req.params;
    const resp = await TipoAlerta.findOne({
      where:{
        id
      }
    });

    if (!resp) {
      return res.status(400).json({
        ok:false,
        msg:`El id: ${id} no esta registrado`
      })
    }
    if (!resp.imagen) {
      const pathImagen = path.join(
        __dirname,
        "../assets/",
        'no-image.jpg'
      );
      return res.sendFile(pathImagen);
    }
    const pathImg = path.join(
      __dirname,
      "../uploads",
      "tipoalerta",
      resp.imagen
    );
    return res.sendFile(pathImg);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`
    });
  }
}

const actualizarImagenAlerta = async (req = request, res = response)  => {
  try {
    const {id} = req.params;
    const resp = await TipoAlerta.findOne({
      where:{
        id
      }
    });
    if (!resp) {
      return res.status(400).json({
        ok:false,
        msg:`El id: ${id} no esta registrado`
      })
    }
    if (resp.imagen) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        'tipoalerta',
        resp.imagen
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    const file =req.files;
    const nombre = await subirArchivo(file,['jpg','png','jpeg'],'tipoalerta');
    const data ={
      imagen:nombre
    }
    const image = await TipoAlerta.update(data,{
      where:{
        id
      }
    })
    res.json({
      ok:true,
      msg:'Se actualizo la imagen con exito',
      resp:image
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`
    });
  }
}

const cargarArchivos = async (req = request, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, ["txt", "md"], "textos");
    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }
  // Limpiar imagenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }
  nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();
  res.json({
    modelo,
  });
};

const actualizarImagenCloudinary = async (req, res) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }
  // Limpiar imagenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();
  res.json({
    modelo,
  });
};
const mostrarImagen = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }
  // Limpiar imagenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(pathImagenDefault);
};

module.exports = {
  mostrarImagenAlerta,
  actualizarImagenAlerta
  /* cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary, */
};
