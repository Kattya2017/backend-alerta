const { Router } = require("express");
const { getDnis, getDni, postDni, putDni, deleteDni, validarDni } = require("../controllers/dni");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('', getDnis);
router.get('/validar/:dni',validarDni)
router.get('/:id', getDni);
router.post('', postDni);
router.put('/:id', putDni);
router.delete('/:id', deleteDni);

module.exports = router;