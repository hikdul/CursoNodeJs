const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options => middleware
app.use(fileUpload({ useTempFiles: true }));
// =>NOTA: este middlewaare hace que todo lo que se carge se ingrese a req.files OJO



// aqui es indiferente el uso que default es post
// en el caso de este usaremos put pues bien sabemos que es para actuañizar la fotografia de los usuarios
app.put('/upload', (req, res) => {
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

    // validando extenciones

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
            // fin de validacion de extenciones
            // => NOTA: la verdad no me gusto como se validaron me parece poco fiable!! buscar un modo que si de seguridad de lo que se hace

    // asi asignamos un nombre de modo arbotratrio
    // archivo.mv('UP/archivo.png', err => {
    // asi colocamos el nombre del archivo como viene por defecto
    archivo.mv(`UP/${archivo.name}`, err => {
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