const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const alertaDerivadaSocket = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('nueva-alerta-derivada',()=>{
        cliente.broadcast.emit('nueva-alerta-derivada')
    })
}

module.exports = {
    alertaDerivadaSocket
}