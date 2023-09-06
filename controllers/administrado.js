const { request, response } = require("express");
const Administrado = require("../models/administrado");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers");

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
        const {nombre, apellido, password, dni, ...data} = req.body;
        const resp = await Administrado.findOne({
            where:{
                dni
            }
        });
        if (resp) {
            return res.json({
                ok:false,
                msg:'Usted ya tiene una cuenta creada!'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        data.password=hash;
        data.dni=dni;
        const administrado = await Administrado.create(data);
        const token = await generarJWT(administrado.id)
        res.json({
            ok: true,
            msg: 'Datos registrados correctamente',
            user:administrado,
            token
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
        const {nombre, apellido,password, ...data} = req.body;

        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            data.password=hash;
        }
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
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