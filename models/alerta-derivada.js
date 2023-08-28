const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class AlertaDerivada extends Model{};

AlertaDerivada.init({
    descripcion:{
        type:DataTypes.TEXT
    },
    fecha_inicio:{
        type:DataTypes.CHAR
    },
    fecha_fin:{
        type:DataTypes.CHAR
    },
    hora_inicio:{
        type:DataTypes.CHAR
    },
    hora_fin:{
        type:DataTypes.CHAR
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue: 1
    },
    id_alerta:{
        type:DataTypes.INTEGER
    },
    id_usuario:{
        type:DataTypes.INTEGER
    },
    id_estado:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName: 'alerta_derivada',
    timestamps: false
});

module.exports = AlertaDerivada;