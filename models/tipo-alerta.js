const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Alerta = require("./alerta");


class TipoAlerta extends Model{}

TipoAlerta.init({
    descripcion:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName: 'tipo_alerta',
    timestamps: false
});


TipoAlerta.hasMany(Alerta,{
    as:'FK_AlertaTipoAlerta',
    foreignKey:'id_tipo_alerta'
});

Alerta.belongsTo(TipoAlerta,{
    sourcekey:'id',
    foreignKey:'id_tipo_alerta'
});


module.exports = TipoAlerta;

