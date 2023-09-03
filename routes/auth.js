const { Router, request, response } = require("express");
const { postLoginAdministrado, getLoginAdministrado } = require("../controllers/auth");
const {validarCampos, validarJWT, validarJWTAdministrado} = require('../middlewares')
const router = Router();

router.post('/administrado',[
    validarCampos
], postLoginAdministrado);
router.get('/administrado',[
    validarJWTAdministrado,
    validarCampos
], getLoginAdministrado);

module.exports = router;