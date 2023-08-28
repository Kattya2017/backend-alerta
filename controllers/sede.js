const { request, response } = require("express");
const Sede = require("../models/sede");


const getSedes = async(req = request, res = response) => {
    try {
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`,
        });
    }
};


const getSede = async (req = request, res = response) => {
    try {
        res.json({
            ok:true,
            msg:'Se muestran los datos del id correctamente',
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });
    }
};


const postSede = async (req = request, res = response) => {
    try {
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await Sede.create(data);
        
        res.json({
            ok: true,
            msg: 'Datos registrados correctamente',
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });
    }
}


const putSede = async (req = request, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'Los dato se atualizaron con exito',
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
};


const deleteSede = async (req = request, res = response) => {
    try {
        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito la sede con exito":"Se deshabilito la sede con exito",
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
};


module.exports = {
    getSedes,
    getSede,
    postSede,
    putSede,
    deleteSede
}