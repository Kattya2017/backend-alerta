const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const RespuestaDerivadaSocket = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('respuesta-alerta-derivada',(token='',callback)=>{
        cliente.emit('respuesta-alerta-derivada',token)
    });
}

module.exports = {
    RespuestaDerivadaSocket
}