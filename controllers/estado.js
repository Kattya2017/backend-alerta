const { request, response } = require("express");
const { Estado } = require("../models");
const { Op } = require("sequelize");


const getEstados = async (req = request, res = response) => {
    try {
        const resp = await Estado.findAll({
            
            where:{
                id:{
                    [Op.ne]:1
                }
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


const getEstado = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Estado.findOne({
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


const postEstado = async (req = request, res = response) => {
    try {
        const {tipo, ...data} = req.body;
        data.tipo = tipo.toUpperCase();
        const resp = await Estado.create(data);

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


const putEstado = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {tipo, ...data} = req.body;
        data.tipo = tipo.toUpperCase();
        const resp = await Estado.update(data,{
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


const deleteEstado = async (req = request, res = response) => {
    try {
        res.json({
            ok: true
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}


module.exports = {
    getEstados,
    getEstado,
    postEstado,
    putEstado,
    deleteEstado
}