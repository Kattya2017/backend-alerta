const { Router } = require("express");
const { getOrganos, getOrgano, postOrgano, putOrgano, deleteOrgano } = require("../controllers/organo");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('', getOrganos);
router.get('/:id', getOrgano);
router.post('',[check('nombre'), validarCampos], postOrgano);
router.put('/:id', putOrgano);
router.delete('/:id', deleteOrgano);

module.exports = router;