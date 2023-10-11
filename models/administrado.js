const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Alerta = require("./alerta");


class Administrado extends Model{};

Administrado.init({
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    dni:{
        type:DataTypes.CHAR
    },
    tipo_area:{
        type:DataTypes.TINYINT
    },
    area:{
        type:DataTypes.INTEGER
    },
    telefono:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName: 'administrado',
    timestamps: false
});


Administrado.hasMany(Alerta,{
    as:'FK_AlertaAdministrado',
    foreignKey:'id_administrado'
});

Alerta.belongsTo(Administrado,{
    sourcekey:'id',
    foreignKey:'id_administrado'
});


module.exports = Administrado;