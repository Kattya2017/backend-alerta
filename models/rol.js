
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');



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


module.exports = Rol;