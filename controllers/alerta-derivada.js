const { request, response } = require("express");
const AlertaDerivada = require("../models/alerta-derivada");
const { Alerta, Usuario, Estado } = require("../models");


const getAlertaDerivadas = async(req = request, res = response) => {
    try {
        const { estado } = req.query;
        const resp = await AlertaDerivada.findAll({
            where:{
                estado,
            },
            include:[{
                model:Alerta,
            },{
                model:Usuario,
            },{
                model:Estado,
            }]
        });
        res.json({
            ok: true,
            msg: 'Los datos se muestran con exito',
            resp
         });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
         });
    }
}

const getAlertaDerivada = async(req = request, res=response) => {
    try {
        const {id} = req.params;
        const resp = await AlertaDerivada.findOne({
            where:{
                id,
            }
        });
        res.json({
            ok: true,
            msg: 'Se muestran los datos del id',
            resp
         });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
         });
    }
}

const postAlertaDerivada = async(req = request, res=response) => {
    try {
        const {descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, ...data} = req.body;
        data.descripcion = descripcion;
        data.fecha_inicio = fecha_inicio;
        data.fecha_fin = fecha_fin;
        data.hora_inicio = hora_inicio;
        data.hora_fin = hora_fin;
        const resp = await AlertaDerivada.create(data);

        res.json({
            ok: true,
            msg: 'Se registro los datos con exito',
            resp
         });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
         });
    }
}

const putAlertaDerivada = async(req = request, res=response) => {
    try {
        const {id} = req.params;
        const {descripcion, fecha_inicio, fecha_fin, hora_inicio, hora_fin, ...data} = req.body;
        data.descripcion = descripcion;
        data.fecha_inicio = fecha_inicio;
        data.fecha_fin = fecha_fin;
        data.hora_inicio = hora_inicio;
        data.hora_fin = hora_fin;
        const resp = await AlertaDerivada.update(data,{
            where:{
                id,
            }
        });
        
        res.json({
            ok: true,
            msg: 'Los datos se actualizaron con exito',
            resp
         });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
         });
    }
}

const deleteAlertaDerivada = async(req = request, res=response) => {
    try {
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado};
        const resp = await AlertaDerivada.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito la alerta derivada con exito":"Se deshabilito la alerta derivada con exito",
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
    getAlertaDerivadas,
    getAlertaDerivada,
    postAlertaDerivada,
    putAlertaDerivada,
    deleteAlertaDerivada
}