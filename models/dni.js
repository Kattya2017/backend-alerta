const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Administrado = require("./administrado");


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



Dni.hasMany(Administrado,{
    as:'FK_AdministradoDni',
    foreignKey:'id_dni'
});

Administrado.belongsTo(Dni,{
    sourcekey:'id',
    foreignKey:'id_dni'
});



module.exports = Dni;