const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Dni extends Model{};

Dni.init({
    dni:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName: 'dni',
    timestamps: false
});


module.exports = Dni;