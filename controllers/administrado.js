const { request, response } = require("express");
const Administrado = require("../models/administrado");


const getAdministrados = async (req = request, res = response) => {
    try {
        const resp = await Administrado.findAll();

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


const getAdministrado = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Administrado.findOne({
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


const postAdministrado = async (req = request, res = response) => {
    try {
        const {nombre, apellido, password, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        data.password = password;
        const resp = await Administrado.create(data);

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


const putAdministrado = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {nombre, apellido, password, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        data.password = password;
        const resp = await Administrado.update(data,{
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


const deleteAdministrado = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Administrado.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
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
    getAdministrados,
    getAdministrado,
    postAdministrado,
    putAdministrado,
    deleteAdministrado
}