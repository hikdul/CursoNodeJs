const express = require('express');

// este es para codificar nuestra contraseña
const encrpita = require('bcrypt');

const app = express();

// NOTA; estas dos lineas me permiten leer mis entradas para el uso de postman
// son de la instalacion de un paquete llamado body-parse
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: false }));


const Usuario = require('../models/usuario');

//Esta libreria trae un monton de funciones qwue seria bueno el nodejs trajera por defecto
// luego con tiempo revisarla un poco
// y si asi es el estandar de la libreria
const _ = require("underscore");

// para traer nuestro middleware de autenticacon

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');




// =========================
//  GET
// =========================

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    const CondicionDeBusqueda = {
        estado: true
    }


    Usuario.find(CondicionDeBusqueda, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.count(CondicionDeBusqueda, (err, conteo) => {

                return res.json({
                    ok: true,
                    conteo,
                    usuarios
                })
            });
        })
})

// =========================
//  POST
// =========================

app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    // en el encriptar entran dos valores 
    // (el string o contraseña , el numero de vueltas o hash )
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        psw: encrpita.hashSync(body.psw, 10),
        role: body.role
    });

    usuario.save((err, usuariodb) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            // de este modo "limpio" mi contraseña para no devolverla
            // usuariodb.psw = "*_*_*" //lo comento pues se soluciono de un modo masd viable

            res.json({
                ok: true,
                usuario: usuariodb
            })
        }
    });
});


// ================================
// PUT
// ================================

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;
    // de este modo ignoramos y decimos que campos podemos modificar
    _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    // aqui lo busca para actualizar -- pero me destaca que aqui no tiene para no tener como definir si el usuario no existe
    usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuariobd) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.json({
                ok: true,
                usuario: usuariobd
            });
        }
    });

    res.json({
        id
    });
});

// eato seria en general para hacer una busqueda por usuario
// usuario.findByIdan(id,(err,usuario) =>{
//     usuario
// });

// hay dos formas de borrar de forma fisica o deshabbilitandolo de la base de datos
// para este se usaria el valor de 'estado'


// primero implementaremos el borrado fisico del usuario
// app.delete('/usuario/:id', function(req, res) {

//     let id = req.params.id;

//     Usuario.findByIdAndRemove(id, (err, usrRemove) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//         if (!usrRemove) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Usuario No Encontrado'
//                 }
//             })

//         } else {

//             return res.json({
//                 ok: true,
//                 usuario: usrRemove
//             });
//         }
//     });

// });

// la anterior de comenta para dejarlo como ejemplo al final utilizaremos esta

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    let CambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, CambiaEstado, { new: true }, (err, usrRemove) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usrRemove) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario No Encontrado'
                }
            })

        } else {

            return res.json({
                ok: true,
                usuario: usrRemove
            });
        }
    });

});

// para poder usarlo fuera

module.exports = app;