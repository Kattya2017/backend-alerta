const { request, response } = require("express");
const { Organo, Sede } = require("../models");


const getOrganos = async (req = request, res = response) => {
   try {
      const {estado} = req.query;
      const resp = await Organo.findAll({
         where:{
            estado,
         },
         include:[
            {
               model: Sede,
            },
         ],
      });

      res.json({
         ok: true,
         msg: 'Los datos se muestran con exito',
         resp
      })
   } catch (error) {
      res.status(400).json({
         ok: false,
         msg: `Error: ${error}`
      })
   }
}

const getOrgano = async (req = request, res = response) => {
   try {
      const {id} = req.params;
      const resp = await Organo.findOne({
         where:{
            id,
         }
      });

      res.json({
         ok: true,
         msg: 'Se muestran los datos del id',
         resp
      })
   } catch (error) {
      res.status(400).json({
         ok: false,
         msg: `Error: ${error}`
      });
   }
};

const postOrgano = async (req = request, res = response) => {
   try {
      const {nombre, ...data} = req.body;
      data.nombre = nombre.toUpperCase();
      const resp = await Organo.create(data);

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
};

const putOrgano = async (req = request, res = response) => {
   try {
      const {id} = req.params;
      const {nombre, ...data} = req.body;
      data.nombre = nombre.toUpperCase();
      const resp = await Organo.update(data,{
         where:{
            id,
         },
      });

      res.json({
         ok: true,
         msg: 'Los datos se actualizaron con exito',
         resp
      })
   } catch (error) {
      res.status(400).json({
         ok: false,
         msg: `Error: ${error}`
      })
   }
}

const deleteOrgano = async (req = request, res = response) => {
   try {
      const {id} = req.params;
      const {estado} = req.query;
      const data = {estado};
      const resp = await Organo.update(data,{
         where:{
            id,
         }
      });

      res.json({
         ok: true,
         msg: (estado === '1')?"Se habilito el organo con exito":"Se deshabilito el organo con exito",
         resp
      })
   } catch (error) {
      res.status(400).json({
         ok: false,
         msg: `Error: ${error}`
      })
   }
}

module.exports = {
   getOrganos,
   getOrgano,
   postOrgano,
   putOrgano,
   deleteOrgano
}