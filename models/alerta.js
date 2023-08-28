const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaDerivada = require("./alerta-derivada");


class Alerta extends Model{};

Alerta.init({
    fecha:{
        type:DataTypes.CHAR
    },
    hora:{
        type:DataTypes.CHAR
    },
    conformidad:{
        type:DataTypes.TINYINT,
        defaultValue: 0,
    },
    id_administrado:{
        type:DataTypes.INTEGER
    },
    id_tipo_alerta:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName: 'alerta',
    timestamps: false
});



Alerta.hasMany(AlertaDerivada,{
    as:'FK_ADerivadaAlerta',
    foreignKey:'id_alerta'
});

AlertaDerivada.belongsTo(Alerta,{
    sourcekey:'id',
    foreignKey:'id_alerta'
});


module.exports = Alerta;