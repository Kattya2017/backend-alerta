const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Dni extends Model{};

Dni.init({
    dni:{
        type:DataTypes.CHAR
    },
    apellido:{
        type:DataTypes.STRING
    },
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName: 'dni',
    timestamps: false
});


module.exports = Dni;