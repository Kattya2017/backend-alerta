const { request, response } = require("express");
const { Dni } = require("../models");


const getDnis = async (req = request, res = response) => {
    try {
        const resp = await Dni.findAll();

        res.json({
            ok: true,
            msg:'Se muestran los datos con exito',
            resp
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}


const getDni = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Dni.findOne({
            where:{
                id,
            }
        })
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


const postDni = async (req = request, res = response) => {
    try {
        const {dni, ...data}= req.body;
        data.dni = dni;
        const resp = await Dni.create(data);

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


const putDni = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {dni, ...data} = req.body;
        data.dni = dni;
        const resp = await Dni.update(data,{
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


const deleteDni = async (req = request, res = response) => {
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
    getDnis,
    getDni,
    postDni,
    putDni,
    deleteDni
}