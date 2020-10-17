const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options => middleware
app.use(fileUpload({ useTempFiles: true }));
// =>NOTA: este middlewaare hace que todo lo que se carge se ingrese a req.files OJO



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
        if (err)
            return res.status(500).json({
                ok: false,
                err
            })

        return res.json({
            ok: true,
            message: 'archivo subido'
        })
    });

})


module.exports = app