const { Router } = require("express");
const { getAlertas, getAlerta, postAlerta, putAlerta, deleteAlerta, getAlertaAdministrado, getAlertasHoy } = require("../controllers/alerta");
const { validarCampos, validarJWTAdministrado } = require("../middlewares");


const router = Router ();

router.get('', getAlertas);
router.get('/ultimas/24', getAlertasHoy);
router.get('/mostrar/administrado',[
    validarJWTAdministrado,
    validarCampos
], getAlertaAdministrado);
router.get('/:id', getAlerta);
router.post('',[
    validarJWTAdministrado,
    validarCampos
], postAlerta);
router.put('/:id', putAlerta);
router.delete('/:id', deleteAlerta);

module.exports = router;