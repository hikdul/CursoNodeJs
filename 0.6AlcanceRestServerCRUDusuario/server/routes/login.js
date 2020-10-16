const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// este par son necesarios para el usoo de google SingIn
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
// const client = new OAuth2Client(CLIENT_ID);
// el CLIEND_ID  se mantendra enn las configuraciones por eso es que las lineas se vvan a modificar



const Usuario = require('../models/usuario');

const app = express();



app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.psw, usuarioDB.psw)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }


        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    });

});
// ==============================================
// aqui vamos a colocar todo lo referente al google SinIn
// ==============================================

// => **configuraciones de google**

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // console.log(payload.name);
    // console.log(payload.email);
    // console.log(payload.picture);
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }


}

// metodo post para recibir los datos de google

app.post('/google', (req, res) => {

    let token = req.body.idtoken;

    verify(token);

    res.json({
        token
    })



});








module.exports = app;