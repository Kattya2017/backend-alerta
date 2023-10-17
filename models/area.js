const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Area extends Model{};

Area.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    id_unidad_organica:{
        type:DataTypes.INTEGER
    },
    anexo:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName: 'area',
    timestamps: false
});

module.exports = Area;