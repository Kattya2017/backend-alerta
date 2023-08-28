const { Router } = require("express");
const { getTipoAlertas, getTipoAlerta, postTipoAlerta, putTipoAlerta, deleteTipoAlerta } = require("../controllers/tipo-alerta");


const router = Router();

router.get('', getTipoAlertas);
router.get('/:id', getTipoAlerta);
router.post('', postTipoAlerta);
router.put('/:id', putTipoAlerta);
router.delete('/:id', deleteTipoAlerta);

module.exports = router;