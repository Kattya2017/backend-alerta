const { request, response } = require("express");
const { TipoAlerta } = require("../models");
const { subirArchivo } = require("../helpers");


const getTipoAlertas = async (req = request, res = response) => {
    try {
        const {estado} = req.query;
        const resp = await TipoAlerta.findAll({
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


const getTipoAlerta = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await TipoAlerta.findOne({
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

const getImagenTipoalerta = async (req = request, res = response) =>{
    try {
        const { archivosubido } = req.params;
        const resp = await TipoAlerta.findOne({
            where:{
                imagen:archivosubido
            }
        });
        if (resp.imagen) {
            const pathImagen = path.join(
                "../uploads", "imagen", resp.imagen
            );
        }
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`,
        });
    }
}



const postTipoAlerta = async (req = request, res = response) => {
    try {
        const {descripcion, imagen, ...data} = req.body;
        const files = req.files;
        const archivosubido = await subirArchivo(files, ['png', 'jpg'], 'tipoalerta')

        data.descripcion = descripcion.toUpperCase();
        data.imagen = archivosubido;

        const resp = await TipoAlerta.create(data);
        res.json({
            ok: true,
            msg: 'Datos registrados correctamente',
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });  
    }
}


const putTipoAlerta = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {descripcion, ...data} = req.body;
        data.descripcion = descripcion.toUpperCase();
        const resp = await TipoAlerta.update(data,{
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


const deleteTipoAlerta = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado};
        const resp = await TipoAlerta.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito el tipo de alerta con exito":"Se deshabilito el tipo de alerta con exito",
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
    getTipoAlertas,
    getTipoAlerta,
    postTipoAlerta,
    putTipoAlerta,
    deleteTipoAlerta,
    getImagenTipoalerta
}