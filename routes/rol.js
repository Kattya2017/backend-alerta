const { Router } = require("express");
const { getRoles, getRol, postRol, putRol, deleteRol } = require("../controllers/rol");


const router = Router();

router.get('', getRoles);
router.get('/:id', getRol);
router.post('', postRol);
router.put('/:id', putRol);
router.delete('/:id', deleteRol);

module.exports = router;