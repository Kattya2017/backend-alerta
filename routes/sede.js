const { Router } = require("express");
const { getSedes, getSede, postSede, putSede, deleteSede } = require("../controllers/sede");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('', getSedes);
router.get('/:id', getSede);
router.post('',[
    check('nombre'), validarCampos
], postSede);
router.put('/:id', putSede);
router.delete('/:id', deleteSede);

module.exports = router;