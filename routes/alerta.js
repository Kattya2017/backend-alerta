const { Router } = require("express");
const { getAlertas, getAlerta, postAlerta, putAlerta, deleteAlerta } = require("../controllers/alerta");


const router = Router ();

router.get('', getAlertas);
router.get('/:id', getAlerta);
router.post('', postAlerta);
router.put('/:id', putAlerta);
router.delete('/:id', deleteAlerta);

module.exports = router;