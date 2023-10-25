const { request, response } = require("express");
const path = require("path");
const fs = require("fs");

const getNotificacion = async (req = request, res = response) => {
    try {
        const pathImg = path.join(
            __dirname,
            "../assets",
            "audio",
            "notificacionalerta.mp3"
        );
        return res.sendFile(pathImg);
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}

module.exports = {
    getNotificacion
}