const express = require('express')

const { verificaToken } = require('../middlewares/autenticacion')

let app = express()

let Producto = require('../models/producto')

// =====================================================
// Get : obtener lista productos
// =====================================================

// paginado
// populate usr y categoria


app.get('/producto', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    const CondicionDeBusqueda = {
        disponible: true
    }

    Producto.find(CondicionDeBusqueda)
        .skip(desde)
        .limit(limite)
        .sort('categoria')
        .populate('usuario', 'email nombre')
        .populate('categoria', 'descripcion')
        .exec((err, productoBD) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                producto: productoBD
            })
        });

});

// =====================================================
// GetId : obtener un producto por su id
// =====================================================

// paginado
// populate


app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;


    Producto.findById(id, (err, valorBd) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }

        if (!valorBd) {

            res.status(400).json({
                ok: false,
                err: {
                    message: 'el producto no existe'
                }
            })
        }


        return res.json({
            ok: true,
            producto: valorBd
        })
    })


});


// =====================================================
// Get: buscar Productos
// =====================================================

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {


    let termino = req.params.termino;
    // al convertir esto en una exprecion regular la busqueda se vuelve un poco mas flexible
    let regex = new RegExp(termino, 'i')

    Producto.find({ nombre: regex, disponible: true })
        .populate('categoria', 'descripcion')
        .exec((err, productoBD) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                producto: productoBD
            })
        });

});


// =====================================================
// Post : guardar un producto
// =====================================================

app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descrippcion: body.descrippcion,
        disponible: body.disponible,
        categoria: body.categoria
    })



    producto.save((err, valorBd) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!valorBd) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        return res.json({
            ok: true,
            producto: valorBd
        })

    });


});



// =====================================================
// Put : actualiaza un producto
// =====================================================

app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let validate = () => {
        nombre = body.nombre;
        precioUni = body.precioUni;
        descrippcion = body.descrippcion;
        disponible = body.disponible;
        usuario = req.usuario._id;
        categoria = req.categoria._id;
    }

    Producto.findByIdAndUpdate(id, validate, { new: true, runValidators: true }, (err, valorBD) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!valorBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: valorBD
        })

    })


});


// =====================================================
// Delete : obtener lista productos
// =====================================================

// disponible = false

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let change = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, change, { new: true }, (err, Remove) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!Remove) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto No Encontrado'
                }
            })

        } else {

            return res.json({
                ok: true,
                producto: Remove
            });
        }
    });
});



module.exports = app