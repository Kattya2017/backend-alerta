const { request, response } = require("express");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { Alerta, Administrado, TipoAlerta, AlertaDerivada, Usuario } = require("../models");

const reporteAlertaTipo = async (req = request, res = response) => {
    try {
        const { tipo } = req.params;
        const html = fs.readFileSync(
            path.join(__dirname, '../reportes/html/alertatipo.html')
            , "utf8");
        const filename = "reportetipo.pdf";
        const pathUrl = path.join(__dirname, "../reportes", "pdf", filename);

        let array = []

        if (tipo === '0') {
            const resp = await Alerta.findAll({
                attributes: ['id', 'fecha', 'hora', 'descripcion'],
                include: [
                    {
                        model: Administrado,
                        attributes: ['nombre', 'apellido']
                    },
                    {
                        model: TipoAlerta,
                        attributes: ['descripcion']
                    },
                ],
            });

            if (resp.length === 0) {
                const obj = {
                    id: '',
                    ids: '',
                    fecha: '',
                    hora: '',
                    descripcion: '',
                    administrado: '',
                    tipoalertum: '',
                }
                array.push(obj);
            } else {
                for (let i = 0; i < resp.length; i++) {
                    const obj = {
                        id: resp[i].id,
                        ids: i + 1,
                        fecha: resp[i].fecha,
                        hora: resp[i].hora,
                        descripcion: resp[i].descripcion,
                        administrado: `${resp[i].Administrado.nombre} ${resp[i].Administrado.apellido}`,
                        tipoalertum: `${resp[i].TipoAlertum.descripcion}`
                    }
                    array.push(obj);
                }
            }

        } else {
            const resp = await Alerta.findAll({
                attributes: ['id', 'fecha', 'hora', 'descripcion'],
                include: [
                    {
                        model: Administrado,
                        attributes: ['nombre', 'apellido']
                    },
                    {
                        model: TipoAlerta,
                        where: {
                            id: tipo
                        },
                        attributes: ['id', 'descripcion']
                    },
                ],
            });
            if (resp.length === 0) {
                const obj = {
                    id: '',
                    ids: '',
                    fecha: '',
                    hora: '',
                    descripcion: '',
                    administrado: '',
                    tipoalertum: '',
                }
                array.push(obj);
            } else {
                for (let i = 0; i < resp.length; i++) {
                    const obj = {
                        id: resp[i].id,
                        ids: i + 1,
                        fecha: resp[i].fecha,
                        hora: resp[i].hora,
                        descripcion: resp[i].descripcion,
                        administrado: `${resp[i].Administrado.nombre} ${resp[i].Administrado.apellido}`,
                        tipoalertum: `${resp[i].TipoAlertum.descripcion}`
                    }
                    console.log(obj);
                    array.push(obj);
                }
            }
        }

        const obj = {
            prodlist: array,
        };
        const options = {
            format: "A4",
            orientation: "landscape",
            border: "10mm",
        };
        const document = {
            html: html,
            data: {
                products: obj,
            },
            path: pathUrl,
        };
        const archivo = await pdf.create(document, options);
        return res.sendFile(pathUrl)
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `${error}`
        })
    }
}
const reporteAlertaDerivada = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const html = fs.readFileSync(
            path.join(__dirname, '../reportes/html/alertaderivada.html')
            , "utf8");
        const filename = "reportealertaderivada.pdf";
        const pathUrl = path.join(__dirname, "../reportes", "pdf", filename);

        let array = []

        if (id === '0') {
            const resp = await AlertaDerivada.findAll({
                include: [
                    {
                        model: Alerta,
                        include: [
                            {
                                model: TipoAlerta
                            },
                            {
                                model: Administrado
                            }
                        ]
                    },
                    {
                        model: Usuario
                    }

                ]
            });
            if (resp.length === 0) {
                const obj = {
                    id: '',
                    ids: '',
                    fecha_inicio:'',
                    hora_inicio:'',
                    fecha_fin:'',
                    hora_fin:'',
                    observacion:'',
                    administrado: '',
                    problema: '',
                    tipoalertum: '',
                    sede: '',
                    organo: '',
                    unidad: '',
                    area: '',
                    informatico: '',
                }
                array.push(obj);
            } else {
                for (let i = 0; i < resp.length; i++) {
                    const obj = {
                        id: resp[i].id,
                        ids: i + 1,
                        fecha_inicio: resp[i].fecha_inicio,
                        hora_inicio: resp[i].hora_inicio,
                        fecha_fin: resp[i].fecha_fin,
                        hora_fin: resp[i].hora_fin,
                        observacion: resp[i].descripcion,
                        administrado: `${resp[i].Alertum.Administrado.nombre} ${resp[i].Alertum.Administrado.apellido}`,
                        problema: `${resp[i].Alertum.descripcion}`,
                        tipoalertum: `${resp[i].Alertum.TipoAlertum.descripcion}`,
                        sede: resp[i].sede,
                        organo: resp[i].organo,
                        unidad: resp[i].unidad,
                        area: resp[i].area,
                        informatico: `${resp[i].Usuario.nombre} ${resp[i].Usuario.apellido}`,

                    }
                    array.push(obj);
                }
            }

        } else {
            const resp = await AlertaDerivada.findAll({
                where: {
                    id_usuario: id
                },
                include: [
                    {
                        model: Alerta,
                        include: [
                            {
                                model: TipoAlerta
                            },
                            {
                                model: Administrado
                            }
                        ]
                    },
                    {
                        model: Usuario
                    }
                ]
            });
            if (resp.length === 0) {
                const obj = {
                    id: '',
                    ids: '',
                    fecha_inicio:'',
                    hora_inicio:'',
                    fecha_fin:'',
                    hora_fin:'',
                    observacion:'',
                    administrado: '',
                    problema: '',
                    tipoalertum: '',
                    sede: '',
                    organo: '',
                    unidad: '',
                    area: '',
                    informatico: '',
                }
                array.push(obj);
            } else {
                for (let i = 0; i < resp.length; i++) {
                    const obj = {
                        id: resp[i].id,
                        ids: i + 1,
                        fecha_inicio: resp[i].fecha_inicio,
                        hora_inicio: resp[i].hora_inicio,
                        fecha_fin: resp[i].fecha_fin,
                        hora_fin: resp[i].hora_fin,
                        observacion: resp[i].descripcion,
                        administrado: `${resp[i].Alertum.Administrado.nombre} ${resp[i].Alertum.Administrado.apellido}`,
                        problema: `${resp[i].Alertum.descripcion}`,
                        tipoalertum: `${resp[i].Alertum.TipoAlertum.descripcion}`,
                        sede: resp[i].sede,
                        organo: resp[i].organo,
                        unidad: resp[i].unidad,
                        area: resp[i].area,
                        informatico: `${resp[i].Usuario.nombre} ${resp[i].Usuario.apellido}`,

                    }
                    array.push(obj);
                }
            }
        }

        const obj = {
            prodlist: array,
        };
        const options = {
            format: "A4",
            orientation: "landscape",
            border: "5mm",
        };
        const document = {
            html: html,
            data: {
                products: obj,
            },
            path: pathUrl,
        };
        const archivo = await pdf.create(document, options);
        //return res.sendFile(pathUrl);
        return res.sendFile(pathUrl)
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `${error}`
        })
    }
}


module.exports = {
    reporteAlertaDerivada,
    reporteAlertaTipo
}