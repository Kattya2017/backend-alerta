const { Router } = require("express");
const { getAdministrado, getAdministrados, postAdministrado, putAdministrado, deleteAdministrado } = require("../controllers/administrado");


const router = Router ();

router.get('',getAdministrados);
router.get('/:id', getAdministrado);
router.post('', postAdministrado);
router.put('/:id', putAdministrado);
router.delete('/:id', deleteAdministrado);

module.exports = router;