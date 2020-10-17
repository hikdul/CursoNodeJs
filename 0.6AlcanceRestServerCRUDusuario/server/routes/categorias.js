const express = require('express');
const app = express();
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const Categoria = require('../models/categoria');

// ############################
// GET || obtener la lista completa sin paginacion
// #############################


app.get('/categoria', verificaToken, (req, res) => {

    // el populate me ayuda a traer los datos de otras tablas para indentarlos
    // populate( "nobre de la tabla a buscar" , "elementos quie se desean mostrar de la tabla")
    // pueden haber mas de un esquema para mostrar o mas de una tabla para mostrar

    //el sort apoya en el orden en este caso se ordenaron por su deescripcion


    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'email nombre')
        .exec((err, categoriaBD) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                categoria: categoriaBD
            })
        });
})


// ############################
// GET BY ID || buescar por ID
// #############################

app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;


    Categoria.findById(id, (err, catDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }

        if (!catDB) {

            res.status(400).json({
                ok: false,
                err: {
                    message: 'las cat no existe'
                }
            })
        }


        return res.json({
            ok: true,
            categoria: catDB
        })
    })

})

// ############################
// POST || Insertar Datos
// #############################


app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id

    });

    categoria.save((err, categoriadb) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        return res.json({
            ok: true,
            categoria: categoriadb
        })

    });
});



// ############################
// PUT || Actualiza datos
// #############################

app.put('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let DescCat = () => {
        descripcion = body.descripcion
    }

    Categoria.findByIdAndUpdate(id, DescCat, { new: true, runValidators: true }, (err, categoriabd) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriabd) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriabd
        })

    })
})

// ############################
// DELETE || AQUI SE ELIMINARA DE VERDAD
// #############################

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, catDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!catDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'categoria No Encontrado'
                }
            })

        } else {

            return res.json({
                ok: true,
                categoria: catDelete,
                message: 'categoria borrada'
            });
        }
    });

});



// ############################
// EXPORTANDO NUESTRO MODULO
// #############################

module.exports = app;