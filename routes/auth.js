const { Router, request, response } = require("express");
const { postLoginAdministrado, getLoginAdministrado, postLoginUsuario, getLoginUsuario } = require("../controllers/auth");
const {validarCampos, validarJWTAdministrado, validarJWTUsuario} = require('../middlewares')
const router = Router();

router.post('/administrado',[
    validarCampos
], postLoginAdministrado);
router.get('/administrado',[
    validarJWTAdministrado,
    validarCampos
], getLoginAdministrado);


router.post('/usuario',[
    validarCampos
], postLoginUsuario);

router.get('/usuario',[
    validarJWTUsuario,
    validarCampos
], getLoginUsuario);

module.exports = router;