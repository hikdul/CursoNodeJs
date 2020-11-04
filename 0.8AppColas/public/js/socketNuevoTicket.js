

var socket = io();
let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
})


socket.on('disconnect', function() {
    console.log('DESconectado al servidor');
})

socket.on('estadoActual', function(resp){
    console.log(resp);
    label.text(`ticket actual N° ${resp.actual}`);
})


$('button').on('click', function(){
    // alert('click en btn')
    socket.emit('siguienteTk', null, function(sigTk){
        // este callback se ejecuta tanto aqui como eln el servidor
        // si no los llamados de datos son completamente invalido y no pasa absolutamente nada!!
        label.text(sigTk);
    })


})