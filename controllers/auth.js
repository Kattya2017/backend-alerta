const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const { Administrado, Usuario, Rol } = require("../models");
const { generarJWT } = require("../helpers");

const postLoginAdministrado = async (req = request, res = response) => {
  try {
    const {dni,password} = req.body;
    const resp = await Administrado.findOne({
      where:{
        dni
      }
    });
    if (!resp) {
      return res.status(400).json({
        ok:false,
        msg:'Usted no tiene una cuenta creada, porfavor registrese'
      })
    }
    const boleano = bcrypt.compareSync(password,resp.password);
    if (!boleano) {
      return res.status(400).json({
        ok:false,
        msg:'La contraseña es incorrecta!!'
      })
    }
    const token = await generarJWT(resp.id);
    res.json({
      ok:true,
      msg:'Se inicio sesion con exito',
      user:resp,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error:${error}`
    })
  }
};
const postLoginUsuario = async (req = request, res = response) => {
  try {
    const {usuario,password} = req.body;
    const resp = await Usuario.findOne({
      where:{
        usuario
      },
      include:[
        {
          model:Rol
        }
      ]
    });
    if (!resp) {
      return res.status(400).json({
        ok:false,
        msg:'Usted no tiene una cuenta creada, converse con el administrador'
      })
    }
    const boleano = bcrypt.compareSync(password,resp.password);
    if (!boleano) {
      return res.status(400).json({
        ok:false,
        msg:'La contraseña es incorrecta!!'
      })
    }
    const token = await generarJWT(resp.id);
    res.json({
      ok:true,
      msg:'Se inicio sesion con exito',
      user:resp,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error:${error}`
    })
  }
};

const getLoginAdministrado = async (req = request, res = response) => {
  try { 
    const administrado = req.administradoToken;
    const token = await generarJWT(administrado.id);
    res.json({
      ok:true,
      msg:'Se genero nuevo token',
      user:administrado,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error:${error}`
    })
  }
};

const getLoginUsuario = async (req = request, res = response) => {
  try {
    const usuario = req.usuarioToken;
    const token = await generarJWT(usuario.id);
    res.json({
      ok:true,
      msg:'Se genero nuevo token',
      user:usuario,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error:${error}`
    })
  }
};

  module.exports = {
    postLoginAdministrado,
    postLoginUsuario,
    getLoginAdministrado,
    getLoginUsuario
  }