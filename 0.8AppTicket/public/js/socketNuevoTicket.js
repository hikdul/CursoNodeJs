// =====================================================
// aqui iria la logica de nuestra ventana de nuevo tickes
// =====================================================


// este me lo lanzo el de improvisto
// const { io } = require("../../server/server");

var socket = io();


socket.on('connect', function() {
        console.log('conectado al servidor');
    })
    // con esto ya nuestro front end estara pendiente de cualñqueir cambio en el servidor

socket.on('disconnect', function() {
    console.log('servidor desconectado');
})


$('button').on('click', function() {
    socket.emit('NextTickect');
});