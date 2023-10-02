const { Router } = require("express");
const { getAlertaDerivadas, getAlertaDerivada, postAlertaDerivada, putAlertaDerivada, deleteAlertaDerivada, getAlertaInformatico, getAlertaInformaticoId, getAlertaDerivadaHoy } = require("../controllers/alerta-derivada");
const { validarCampos, validarJWTUsuario } = require("../middlewares");


const router = Router ();

router.get('', getAlertaDerivadas);
router.get('/derivada/hoy', getAlertaDerivadaHoy);
router.get('/alerta/informatico/:id', getAlertaInformaticoId);
router.get('/alerta/informatico',[
    validarJWTUsuario,
    validarCampos
], getAlertaInformatico);
router.get('/:id', getAlertaDerivada);
router.post('', postAlertaDerivada);
router.put('/:id', putAlertaDerivada);
router.delete('/:id', deleteAlertaDerivada);

module.exports = router;