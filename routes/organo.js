const { Router } = require("express");
const { getOrganos, getOrgano, postOrgano, putOrgano, deleteOrgano } = require("../controllers/organo");


const router = Router();

router.get('', getOrganos);
router.get('/:id', getOrgano);
router.post('', postOrgano);
router.put('/:id', putOrgano);
router.delete('/:id', deleteOrgano);

module.exports = router;