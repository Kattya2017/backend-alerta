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
    usuario:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    id_rol:{
        type:DataTypes.INTEGER
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