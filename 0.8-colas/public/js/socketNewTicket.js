// comando para establecer la conexion

var socket = io()
var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('coneectado al servidosr');
})
socket.on('disconnect', function() {
    console.log('Desconectado  al servidosr');
})

socket.on('estadoActual', function(resp) {
    // console.log(resp);
    label.text(resp.actual)
})

// esto ya es jQuery
// siguiente ticket
$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(valorSiguienteTicket) {
        label.text(valorSiguienteTicket)
    })
})