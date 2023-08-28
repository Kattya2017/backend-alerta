const { Router } = require("express");
const { getEstados, getEstado, postEstado, putEstado, deleteEstado } = require("../controllers/estado");


const router = Router();

router.get('', getEstados);
router.get('/:id', getEstado);
router.post('', postEstado);
router.put('/:id', putEstado);
router.delete('/:id', deleteEstado);

module.exports = router;

