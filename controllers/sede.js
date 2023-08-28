const { request, response } = require("express");
const { Sede } = require("../models");


const getSedes = async(req = request, res = response) => {
    try {
        const { estado } = req.query;
        const resp = await Sede.findAll({
            where:{
                estado,
            },
        });

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
        const {id} = req.params;
        const resp = await Sede.findOne({
            where:{
                id,
            }
        });

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
        const {id} = req.params;
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await Sede.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
            msg: 'Los datos se atualizaron con exito',
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
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado}
        const resp = await Sede.update(data,{
            where:{
                id,
            }
        });

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