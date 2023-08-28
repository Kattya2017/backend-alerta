const { Router } = require("express");
const { getDnis, getDni, postDni, putDni, deleteDni } = require("../controllers/dni");


const router = Router();

router.get('', getDnis);
router.get('/:id', getDni);
router.post('', postDni);
router.put('/:id', putDni);
router.delete('/:id', deleteDni);

module.exports = router;