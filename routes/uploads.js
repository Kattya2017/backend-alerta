
const { Router } = require("express");
const { check } = require('express-validator');
const { validarArchivoSubir, validarCampos } = require("../middlewares");
const { coleccionesPermitidas } = require('../helpers');
const { mostrarImagenAlerta, actualizarImagenAlerta } = require("../controllers/uploads");



const router= Router();

router.get('/tipoalerta/:id/:nombre',mostrarImagenAlerta);
router.put('/tipoalerta/:id',actualizarImagenAlerta);


/* router.post('/', validarArchivoSubir, cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','pruebax'])),
    validarCampos
],actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','pruebax'])),
    validarCampos], mostrarImagen) */


module.exports = router;
