const { request, response } = require("express");
const AlertaDerivada = require("../models/alerta-derivada");
const { Alerta, Usuario, Estado, TipoAlerta, Administrado } = require("../models");
const { funDate } = require("../helpers");
const FCM = require('fcm-node');
require("dotenv").config();
const getAlertaDerivadas = async (req = request, res = response) => {
  try {
    const resp = await AlertaDerivada.findAll({
      /* include:[{
                model:Alerta,
            },{
                model:Usuario,
            },{
                model:Estado,
            }] */
    });
    res.json({
      ok: true,
      msg: "Los datos se muestran con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const getAlertaDerivadaHoy = async (req = request, res = response) => {
  try {
    const { fecha } = funDate();
    const resp = await AlertaDerivada.findAll({
      where: {
        fecha_inicio: fecha
      },
      include: [
        {
          model: Alerta,
          include: [
            {
              model: TipoAlerta
            },
            {
              model: Administrado
            }
          ]
        },
        {
          model: Usuario
        }
      ]
    });
    res.json({
      ok: true,
      msg: "Los datos se muestran con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
}

const getAlertaInformatico = async (req = request, res = response) => {
  try {
    const usuarioToken = req.usuarioToken;
    const {estado} = req.query;
    const resp = await AlertaDerivada.findAll({
      where: {
        id_usuario: usuarioToken.id,
        id_estado: estado
      },
      include: [
        {
          model: Alerta,
          include: [
            {
              model: TipoAlerta
            },
            {
              model: Administrado
            }
          ]
        },

      ]
    });
    res.json({
      ok: true,
      msg: "Los datos se muestran con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
}
const getAlertaInformaticoId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await AlertaDerivada.findAll({
      where: {
        id_usuario: id,
      },
      include: [
        {
          model: Alerta,
          include: [
            {
              model: TipoAlerta
            },
            {
              model: Administrado
            }
          ]
        },

      ]
    });
    res.json({
      ok: true,
      msg: "Los datos se muestran con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
}
const getAlertaDerivada = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await AlertaDerivada.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestran los datos del id",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const postAlertaDerivada = async (req = request, res = response, next) => {
  try {
    const { id_alerta, ...data } = req.body;
    const { fecha, hora } = funDate();
    
      data.id_estado = 1;
      data.fecha_inicio = fecha;
      data.hora_inicio = hora;
      data.id_alerta = id_alerta;
      const alerta = await Alerta.update(
        {
          estado: 1,
        },
        {
          where: {
            id: id_alerta,
          },
        }
      );
      const resp = await AlertaDerivada.create(data);
      const fcm = new FCM(process.env.SERVER_KEY);
      const message = {
        to: '/topics/' + 'csjucalertainformatico',
        notification: {
          title: 'CSJUCINFORMATICO',
          body: 'Tienes una nueva alerta derivada',
        },
      };
      fcm.send(message, (err, response) => {
        if (err) {
          next(err);
        } else {
          console.log(response);
        }
      });
      res.json({
        ok: true,
        msg: "Se registro los datos con exito",
        resp
      });
    
    /*  */
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const putAlertaDerivada = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { fecha, hora } = funDate();
    data.fecha_fin = fecha;
    data.hora_fin = hora;
    const resp = await AlertaDerivada.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Los datos se actualizaron con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const deleteAlertaDerivada = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    const data = { estado };
    const resp = await AlertaDerivada.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg:
        estado === "1"
          ? "Se habilito la alerta derivada con exito"
          : "Se deshabilito la alerta derivada con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  getAlertaDerivadas,
  getAlertaDerivadaHoy,
  getAlertaInformatico,
  getAlertaInformaticoId,
  getAlertaDerivada,
  postAlertaDerivada,
  putAlertaDerivada,
  deleteAlertaDerivada,

};
