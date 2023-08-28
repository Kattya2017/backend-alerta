const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/database');
const http = require('http');
const socketIO = require('socket.io');
const sequelize = require('../database/database');
const { conectarCliente } = require('../sockets/usuario-socket');
class Server{
    static _intance=Server;
    io=socketIO.Server;
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            //usuario: '/api/usuario',
            //uploads: '/api/uploads'
            auth: '/api/auth',
            administrado: '/api/administrado',
            alertaderivada: '/api/alertaderivada',
            alerta: '/api/alerta',
            area: '/api/area',
            dni: '/api/dni',
            estado: '/api/estado',
            organo: '/api/organo',
            rol: '/api/rol',
            sede: 'api/sede',
            tipoalerta: '/api/tipoalerta',
            unidadorganica: '/api/unidadorganica',
            usuario: '/api/usuario',
        };

        //Connect to socket
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors:{
                origin:true,
                credentials:true
            },
        });
        // Connect to database
        this.connectDB();
        //  listen Sockets
        this.listenSockets();
        // Middlewares
        this.middlewares();
        // Routes application
        this.routes();
    }
    static get instance(){
        return this._intance || (this._intance=new this());
    }
    async connectDB(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
    listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', (cliente)=>{
            console.log('Cliente conectado');
            conectarCliente(cliente, this.io);
        });
    }
    middlewares(){
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        
    }
    routes(){
        /*this.app.use(this.paths.usuario, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));*/
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.administrado, require('../routes/administrado'));
        this.app.use(this.paths.alerta, require('../routes/alerta'));
        this.app.use(this.paths.alertaderivada, require('../routes/alerta-derivada'));
        this.app.use(this.paths.area, require('../routes/area'));
        this.app.use(this.paths.dni, require('../routes/dni'));
        this.app.use(this.paths.estado, require('../routes/estado'));
        this.app.use(this.paths.organo, require('../routes/organo'));
        this.app.use(this.paths.rol, require('../routes/rol'));
        this.app.use(this.paths.sede, require('../routes/sede'));
        this.app.use(this.paths.tipoalerta, require('../routes/tipo-alerta'));
        this.app.use(this.paths.unidadorganica, require('../routes/unidad-organica'));
        this.app.use(this.paths.usuario, require('../routes/usuario'));
        
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;