const { request, response } = require("express");
const { Usuario } = require("../models");
const bcrypt = require('bcryptjs');
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

const getUsuarioInformatico=async(req=request,res=response)=>{
    try {
        const resp = await Usuario.findAll({
            where:{
                id_rol:3
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
        const {nombre, apellido,usuario, password, ...data} = req.body;
        
        const resp = await Usuario.findOne({
            where:{
                usuario
            }
        });
        if (resp) {
            return res.json({
                ok:false,
                msg:'Usted ya tiene una cuenta creada!'
            })
        }
        //const resp = await Usuario.create(data);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        data.password=hash;
        data.usuario=usuario;
        const user = await Usuario.create(data);
        res.json({
            ok: true,
            msg: 'Datos registrados correctamente',
            usuario:user
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
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            data.password=hash;
        }
        data.nombre = nombre.toUpperCase();
        data.apellido = apellido.toUpperCase();
        
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
    getUsuarioInformatico,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}