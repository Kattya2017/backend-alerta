const { Model, DataTypes } = require("sequelize");
const Area = require("./area");
const sequelize = require('../database/database');

class UnidadOrganica extends Model{}

UnidadOrganica.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    id_organo:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName: 'unidad_organica',
    timestamps: false
});


UnidadOrganica.hasMany(Area,{
    as:'FK_AreaUndOrganica',
    foreignKey: 'id_unidad_organica'
});

Area.belongsTo(UnidadOrganica,{
    sourcekey:'id',
    foreignKey:'id_unidad_organica'
});


module.exports = UnidadOrganica;