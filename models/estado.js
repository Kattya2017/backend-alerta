const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const AlertaDerivada = require("./alerta-derivada");


class Estado extends Model{}

Estado.init({
    tipo:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName: 'estado',
    timestamps: false
});



Estado.hasMany(AlertaDerivada,{
    as:'FK_ADerivadaEstado',
    foreignKey:'id_estado'
});

AlertaDerivada.belongsTo(Estado,{
    sourcekey:'id',
    foreignKey:'FK_ADerivadaEstado'
});


module.exports = Estado;