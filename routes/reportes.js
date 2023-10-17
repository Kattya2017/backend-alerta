const { Router } = require("express");
const { reporteAlertaTipo, reporteAlertaDerivada } = require("../controllers/reportes");



const router = Router();


router.get('/alerta/:tipo',reporteAlertaTipo);
router.get('/alertaderivada/:id',reporteAlertaDerivada);

module.exports = router;