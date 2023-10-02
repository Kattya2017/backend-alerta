const { request, response } = require("express");
const { UnidadOrganica, Organo, Sede } = require("../models");


const getUnidadesOrganicas = async (req = request, res = response) => {
    try {
        const {estado} = req.query;
        const resp = await UnidadOrganica.findAll({
            where:{
                estado,
            },
            /* include:[{
                model: Organo,
            }], */
        });

        res.json({
            ok: true,
            msg: 'Se muestran los datos con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })        
    }
}


const getUnidadOrganica = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const resp = await UnidadOrganica.findOne({
            where:{
                id,
            },
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
        });

        res.json({
            ok: true,
            msg: 'Se muestra los datos del id',
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
};


const postUnidadOrganica = async (req = request, res = response) => {
    try {
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await UnidadOrganica.create(data);

        res.json({
            ok: true,
            msg: 'Los datos se agregaron con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
};


const putUnidadOrganica = async(req = request, res = response) => {
    try {
        const {id} = req.params;
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await UnidadOrganica.update(data,{
            where:{
                id,
            },
        });

        res.json({
            ok: true,
            msg: 'Se actualizo los datos con exito',
            resp,
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}


const deleteUnidadOrganica = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {estado} = req.query;
        const data = {estado};
        const resp = await UnidadOrganica.update(data,{
            where:{
                id,
            }
        });

        res.json({
            ok: true,
            msg: (estado === '1')?"Se habilito la unidad organica con exito":"Se deshabilito la unidad organica con exito",
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
};


module.exports = {
    getUnidadesOrganicas,
    getUnidadOrganica,
    postUnidadOrganica,
    putUnidadOrganica,
    deleteUnidadOrganica
}