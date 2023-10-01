const { Router } = require("express");
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, getUsuarioInformatico } = require("../controllers/usuario");


const router = Router();

router.get('', getUsuarios);
router.get('/user/informatico', getUsuarioInformatico);
router.get('/:id', getUsuario);
router.post('', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;