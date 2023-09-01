const { Router } = require("express");
const { getAdministrado, getAdministrados, postAdministrado, putAdministrado, deleteAdministrado } = require("../controllers/administrado");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");


const router = Router ();

router.get('',getAdministrados);
router.get('/:id', getAdministrado);
router.post('',[check('id_dni'), validarCampos], postAdministrado);
router.put('/:id', putAdministrado);
router.delete('/:id', deleteAdministrado);

module.exports = router;