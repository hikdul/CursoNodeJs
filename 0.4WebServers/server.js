const express = require('express');
const app = express();
const hbs = require('hbs');
//en el caso de los helpers no se llaman por una constante ya que se necesita que al llamar estas funciones se ejecuten
// => seria similar al require de php
require('./hbs/helpers');
/// => asi definimos el puerto en caso de que sea en global y si no asignamos el 3000
const port = process.env.PORT || 3000;

/// aqui partimos con la muestra de nuestros elementos publicos o estadticos
app.use(express.static(__dirname + '/public'));

/// expres hbs engine
/// aqui configuramos el hbs para que express pueda renderizar los mostachos {{}}
/// Ojo con esa puta S del final de la funcion me hizo perder como media hora buscando solucion a este peo
hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');




app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Hector Contreras'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});




app.listen(port, () => {
    console.log(`peticiones puesto ${port}`);
});