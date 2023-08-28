const { request, response } = require("express");
const { Rol } = require("../models");


const getRoles = async (req = request, res = response) => {
    try {
        const { estado } = req.query;
        const resp = await Rol.findAll({
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
}

const getRol = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Rol.findOne({
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
}

const postRol = async (req = request, res = response) => {
    try {
        const {tipo, ...data} = req.body;
        data.tipo = tipo.toUpperCase();
        const resp = await Rol.create(data);

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

const putRol = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {tipo, ...data} = req.body;
        data.tipo = tipo.toUpperCase();
        const resp = await Rol.update(data,{
            where:{
                id,
            }
        })

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
}


const deleteRol = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado};
        const resp = await Rol.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito el rol con exito":"Se deshabilito el rol con exito",
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}


module.exports = {
    getRoles,
    getRol,
    postRol,
    putRol,
    deleteRol
}