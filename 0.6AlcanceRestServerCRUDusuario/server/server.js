require('./config/config');

const express = require('express');
// auqi cargamos nuestro mongose
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');


// =============================
// Habilitar mi carpeta publlic
// =============================

// esta linea deberia de ir arriba pero para mantener la idea de su uso la coloco aqui

const path = require('path');
// ya que literal este paquete que viene en node js me resuelve todo  por medio de sus sintasis

app.use(express.static(path.resolve(__dirname, '../public')));



// =============================

// asi llamamos a los required de usuario
// app.use(require('./routes/usuario'));
// este se cambia por una ruta con todas las salidas y entradas de usuario
app.use(require('./routes/index'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// aqui configuraremos la coneccion a la base de datos
//la funcion de flecha es para definir un call back de si la coneccion se logra o no
mongoose.connect(process.env.DATA_BASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;

        console.log(`Base De Datos ONLINE`);
    });


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// con mongo si la base de datos no esite pero la coneccion es viable igual funciona

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});