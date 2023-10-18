const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const informaticoDerivadaSocket = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('informatico-alerta-derivada',(token='',callback)=>{
        cliente.emit('informatico-alerta-derivada',token)
    });
}

module.exports = {
    informaticoDerivadaSocket
}