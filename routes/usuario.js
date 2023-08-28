const { Router } = require("express");
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require("../controllers/usuario");


const router = Router();

router.get('', getUsuarios);
router.get('/:id', getUsuario);
router.post('', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;