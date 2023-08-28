const { Router } = require("express");
const { getUnidadesOrganicas, getUnidadOrganica, postUnidadOrganica, putUnidadOrganica, deleteUnidadOrganica } = require("../controllers/unidad-organica");


const router = Router();

router.get('', getUnidadesOrganicas);
router.get('/:id', getUnidadOrganica);
router.post('', postUnidadOrganica);
router.put('/:id', putUnidadOrganica);
router.delete('/:id', deleteUnidadOrganica);

module.exports = router;