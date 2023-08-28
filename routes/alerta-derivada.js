const { Router } = require("express");
const { getAlertaDerivadas, getAlertaDerivada, postAlertaDerivada, putAlertaDerivada, deleteAlertaDerivada } = require("../controllers/alerta-derivada");


const router = Router ();

router.get('', getAlertaDerivadas);
router.get('/:id', getAlertaDerivada);
router.post('', postAlertaDerivada);
router.put('/:id', putAlertaDerivada);
router.delete('/:id', deleteAlertaDerivada);

module.exports = router;