const { Router } = require("express");
const { getAdministrado, getAdministrados, postAdministrado, putAdministrado, deleteAdministrado, getSedeAdministrado, putAdministradoJurisdiccion, putAdministradoPassword } = require("../controllers/administrado");
const { check } = require("express-validator");
const { validarCampos, validarJWTAdministrado } = require("../middlewares");


const router = Router ();

router.get('',getAdministrados);
router.get('/validar/sede',[
    validarJWTAdministrado,
    validarCampos
],getSedeAdministrado)
router.get('/:id', getAdministrado);
router.post('',[ 
    validarCampos
], postAdministrado);
router.put('/:id', putAdministrado);
router.put('/jurisdiccion/administrado',[
    validarJWTAdministrado,
    validarCampos
], putAdministradoJurisdiccion);
router.put('/actualizar/password',[
    validarJWTAdministrado,
    validarCampos
], putAdministradoPassword);
router.delete('/:id', deleteAdministrado);

module.exports = router;