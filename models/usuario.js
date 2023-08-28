//const { Schema, model } = require("mongoose");
/*const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname:{
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'ADMIN_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, ...usuario}= this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);*/

const { Model, DataTypes } = require("sequelize");
const AlertaDerivada = require("./alerta-derivada");
const sequelize = require('../database/database');

class Usuario extends Model{}

Usuario.init({
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'usuario',
    timestamps:false
});



Usuario.hasMany(AlertaDerivada,{
    as:'FK_ADerivadaUsuario',
    foreignKey:'id_usuario'
});

AlertaDerivada.belongsTo(Usuario,{
    sourcekey:'id',
    foreignKey:'id_usuario'
});



module.exports = Usuario;