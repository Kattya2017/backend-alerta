const { request, response } = require("express");
const { Usuario } = require("../models");

const getUsuarios = async(req = request, res = response) => {
    try {
        const {estado} = req.query;
        const resp = await Usuario.findAll({
            where:{
                estado,
            }
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


const getUsuario = async(req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Usuario.findOne({
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

const postUsuario = async(req = request, res = response) => {
    try {
        const {nombre, apellido, password, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        data.password = password;
        const resp = await Usuario.create(data);

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

const putUsuario = async(req = request, res = response) => {
    try {
        const {id} = req.params;
        const {nombre, apellido, password, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        data.password = password;
        const resp = await Usuario.update(data,{
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
}

const deleteUsuario = async(req = request, res = response) => {
    try {
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado};
        const resp = await Usuario.update(data,{
            where:{
                id,
            }
        });
        
        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito el usuario con exito":"Se deshabilito el usuario con exito",
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
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}