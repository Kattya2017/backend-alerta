const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const funDate=require('./fc-fecha');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...funDate
};
