const { Router } = require("express");
const { getTipoAlertas, getTipoAlerta, postTipoAlerta, putTipoAlerta, deleteTipoAlerta } = require("../controllers/tipo-alerta");
const { validarArchivoSubir, validarCampos } = require("../middlewares");


const router = Router();

router.get('', getTipoAlertas);
router.get('/:id', getTipoAlerta);
router.post('', [validarArchivoSubir], postTipoAlerta);
router.put('/:id', putTipoAlerta);
router.delete('/:id', deleteTipoAlerta);

module.exports = router;