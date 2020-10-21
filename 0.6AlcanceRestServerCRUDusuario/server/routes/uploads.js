const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

// default options => middleware
app.use(fileUpload({ useTempFiles: true }))
    // =>NOTA: este middlewaare hace que todo lo que se carge se ingrese a req.files OJO

// para poder usar mi datos de usuario o de producto los importo
const usuario = require('../models/usuario')
const producto = require('../models/producto')

// con este accedemos al file sistem y asi poder verificar is existe o no un archivo
const fs = require('fs')
    // este es para contruir rutas a partir del path
const path = require('path')

// aqui es indiferente el uso que default es post
// en el caso de este usaremos put pues bien sabemos que es para actuañizar la fotografia de los usuarios
app.put('/upload/:tipo/:id', (req, res) => {

    // el tipó es para que me defina si es de algun producto o de un usuario
    // el id es para identificarlo

    let tipo = req.params.tipo
    let id = req.params.id




    // aqui si no viene un archivo o si por casualidad el archivo entrante pesa nada entonces enviamos en error
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no hay ningun archivo cargado'
            }
        })
    }


    let archivo = req.files.archivo

    // validando extenciones ##########
    let extencionesValidas = ['png', 'jpg', 'gif'];

    let nombreArch = archivo.name.split('.')
    let ext = nombreArch[nombreArch.length - 1]


    if (extencionesValidas.indexOf(ext) < 0)
        return res.status(405).json({
            ok: false,
            err: {
                message: 'las extenciones permitidas son: ' + extencionesValidas.join(',', ' ')
            },
            message: 'la extencion del archivo ingresado fue .' + ext
        })

    // validando tipo ################
    let tipoV = ['usuario', 'producto']

    if (tipoV.indexOf(tipo) < 0)
        return res.status(405).json({
            ok: false,
            err: {
                message: 'error solo se permite subir imagenes para: ' + tipoV.join(',', ' ')
            }
        })


    // => NOTA: la verdad no me gusto como se validaron me parece poco fiable!! buscar un modo que si de seguridad de lo que se hace

    // cambiar el nombre del archivo

    let nvoNombre = `${id}-${new Date().getMilliseconds()}.${ext}`




    // asi asignamos un nombre de modo arbotratrio
    // archivo.mv('UP/archivo.png', err => {
    // asi colocamos el nombre del archivo como viene por defecto
    archivo.mv(`UP/${tipo}/${nvoNombre}`, err => {
        if (err) {
            borraImg(nvoNombre, tipo)
            return res.status(500).json({
                ok: false,
                err
            })
        }

        // aqui ya la imagen esta lista para usarla
        switch (tipo) {
            case 'usuario':
                imagenUsr(id, res, nvoNombre, tipo)
                break
            case 'producto':
                imagenProducto(id, res, nvoNombre, tipo)
                break
            default:
                borraImg(nvoNombre, tipo)
                break;
        }
    });

})

// aqui vamos a usar las imagenes
function imagenUsr(id, res, nombreArch, tipo) {

    usuario.findById(id, (err, usrBd) => {

        if (err) {
            borraImg(nombreArch, tipo)
            return res.status(500).json({

                ok: false,
                err: {
                    message: 'Error interno o datos suministrados no validos'
                }
            })
        }
        if (!usrBd) {
            borraImg(nombreArch, tipo)
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el usuario no existe'
                }
            })
        }


        borraImg(usrBd.img, tipo)

        // let pathImagen = path.resolve(__dirname, `../../UP/usuario/${usrBd.img}`)

        // if (fs.existsSync(pathImagen))
        //     fs.unlinkSync(pathImagen)

        usrBd.img = nombreArch

        usrBd.save((err, usrSave) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                })
            return res.json({
                ok: true,
                usuario: usrSave,
                img: nombreArch
            })
        })

    })

}

function imagenProducto(id, res, nombreArch, tipo) {

    producto.findById(id, (err, prodBd) => {

        if (err) {
            borraImg(nombreArch, tipo)
            return res.status(500).json({

                ok: false,
                err: {
                    message: 'Error interno o datos suministrados no validos'
                }
            })
        }
        if (!prodBd) {
            borraImg(nombreArch, tipo)
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'producto no registrado'
                }
            })
        }


        borraImg(prodBd.img, tipo)


        prodBd.img = nombreArch

        prodBd.save((err, prodSave) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                })
            return res.json({
                ok: true,
                producto: prodSave,
                img: nombreArch
            })
        })

    })

}


const borraImg = (nombreImagen, dirTipo) => {

    let pathImagen = path.resolve(__dirname, `../../UP/${dirTipo}/${nombreImagen}`)
    if (fs.existsSync(pathImagen))
        fs.unlinkSync(pathImagen)

}

module.exports = app