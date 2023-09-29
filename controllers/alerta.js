const { request, response } = require("express");
const Alerta = require("../models/alerta");
const { Administrado, TipoAlerta } = require("../models");
const { funDate } = require("../helpers");
const { Op } = require("sequelize");

const getAlertas = async (req = request, res = response) => {
  try {
    const resp = await Alerta.findAll({
      include: [
        {
          model: Administrado,
        },
        {
          model: TipoAlerta,
        },
      ],
    });

    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getAlertasHoy = async (req = request, res = response) => {
  try {
    const { fecha } = funDate();
    const resp = await Alerta.findAll({
      where: {
        fecha,
      },
      include: [
        {
          model: Administrado,
        },
        {
          model: TipoAlerta,
        },
      ],
    });

    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getAlertaAdministrado = async (req = request, res = response) => {
  try {
    const administrado = req.administradoToken;
    const resp = await Alerta.findAll({
      where: {
        id_administrado: administrado.id,
        conformidad: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Administrado,
        },
        {
          model: TipoAlerta,
        },
      ],
    });

    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const getAlerta = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Alerta.findOne({
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: "Se muestran los datos del id correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const postAlerta = async (req = request, res = response) => {
  try {
    const administrado = req.administradoToken;
    const data = req.body;
    const { fecha, hora } = funDate();
    data.hora = hora;
    data.fecha = fecha;
    data.id_administrado = administrado.id;
    const resp = await Alerta.create(data);

    res.json({
      ok: true,
      msg: "La alerta informatica ha sido enviado con exito, en breve atenderan su problema",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const putAlerta = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resp = await Alerta.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: "Los datos se atualizaron con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const deleteAlerta = async (req = request, res = response) => {
  try {
    const resp = await Alerta.update();

    res.json({
      ok: true,
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
  getAlertas,
  getAlertasHoy,
  getAlerta,
  getAlertaAdministrado,
  postAlerta,
  putAlerta,
  deleteAlerta,
};
