const { request, response } = require("express");
const { Area, UnidadOrganica, Organo, Sede } = require("../models");


const getAreas = async (req = request, res = response) => {
    try {
        const {estado} = req.query;
        const resp = await Area.findAll({
            where:{
                estado,
            },
            attributes:['id','nombre','estado']
            /* include:[
                {
                    model: UnidadOrganica,
                }
            ] */
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


const getArea = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await Area.findOne({
            where:{
                id,
            },
            include:[
                {
                    model: UnidadOrganica,
                    include:[
                        {
                            model:Organo,
                            include:[
                                {
                                    model:Sede
                                }
                            ]
                        }
                    ]
                }
            ]
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


const postArea = async (req = request, res = response) => {
    try {
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await Area.create(data);

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


const putArea = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await Area.update(data,{
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


const deleteArea = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado};
        const resp = await Area.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito el area con exito":"Se deshabilito el area con exito",
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
    getAreas,
    getArea,
    postArea,
    putArea,
    deleteArea
}