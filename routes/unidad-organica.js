const { Router } = require("express");
const { getUnidadesOrganicas, getUnidadOrganica, postUnidadOrganica, putUnidadOrganica, deleteUnidadOrganica } = require("../controllers/unidad-organica");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('', getUnidadesOrganicas);
router.get('/:id', getUnidadOrganica);
router.post('',[check('nombre'), validarCampos], postUnidadOrganica);
router.put('/:id', putUnidadOrganica);
router.delete('/:id', deleteUnidadOrganica);

module.exports = router;