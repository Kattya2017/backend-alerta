
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Usuario = require('./usuario');



class Rol extends Model{}

Rol.init({
    tipo:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue: 1
    }
},{
    sequelize,
    tableName: 'rol',
    timestamps: false
});



Rol.hasMany(Usuario,{
    as:'FK_RolUsuario',
    foreignKey:'id_rol'
});

Usuario.belongsTo(Rol,{
    sourcekey:'id',
    foreignKey:'id_rol'
});


module.exports = Rol;