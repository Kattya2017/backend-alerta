const { request, response } = require("express");
const Alerta = require("../models/alerta");
const { Administrado, TipoAlerta } = require("../models");


const getAlertas = async (req = request, res = response) => {
   try {
      const resp = await Alerta.findAll({
         include:[{
            model:Administrado,
         },{
         model:TipoAlerta
         },]
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


const getAlerta = async (req = request, res = response) => {
   try {
      const {id} = req.params;
      const resp = await Alerta.findOne({
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

const postAlerta = async (req = request, res = response)=> {
   try {
      const {fecha, hora, conformidad, ...data} = req.body;
      data.fecha = fecha;
      data.hora = hora;
      data.conformidad = conformidad;
      const resp = await Alerta.create(data);
      
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

const putAlerta = async (req = request, res = response) => {
   try {
      const {id} = req.params;
      const {fecha, hora, conformidad, ...data} = req.body;
      data.fecha = fecha;
      data.hora = hora;
      data.conformidad = conformidad;
      const resp = await Alerta.update(data,{
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

const deleteAlerta = async (req = request, res = response) => {
   try {
      const resp = await Alerta.update();

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
   getAlertas,
   getAlerta,
   postAlerta,
   putAlerta,
   deleteAlerta
}