const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const alertaSocket = ( cliente= Socket, io= socketIO.Server ) => {
    cliente.on('nueva-alerta',()=>{
        cliente.broadcast.emit('nueva-alerta')
    })
}

module.exports = {
    alertaSocket
}