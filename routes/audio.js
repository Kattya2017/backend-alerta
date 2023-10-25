const { Router } = require("express");
const { getNotificacion } = require("../controllers/audio");


const router = Router();

router.get('',getNotificacion);


module.exports = router;