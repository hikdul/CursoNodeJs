// traemos nuestras configuraciones
require('./config/config')
    // Requerimentos del express
const express = require('express')
const app = express()
    //requeromentos del body-parse
var bodyParser = require('body-parser')
    // luego se configura el middleware para el uso del body parce

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// genero las petociones(pruebas) del server

// app.get('/', function(req, res) {
//     res.json('Hello World')
// })
app.get('/usuarios', function(req, res) {
    res.json('Get Usuarios')
})
app.post('/usuarios', function(req, res) {
    let body = req.body

    res.json({
        body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
})