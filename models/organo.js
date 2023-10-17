const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const UnidadOrganica = require("./unidad-organica");


class Organo extends Model{};

Organo.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    id_sede:{
        type:DataTypes.INTEGER
    },
    anexo:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName: 'organo',
    timestamps: false
});


Organo.hasMany(UnidadOrganica,{
as:'FK_UndOrganicaOrgano',
foreignKey: 'id_organo'
});

UnidadOrganica.belongsTo(Organo,{
    sourcekey:'id',
    foreignKey:'id_organo'
})

module.exports = Organo;