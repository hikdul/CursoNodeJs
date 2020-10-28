const { io } = require('../server');
// aqui importamos nuestra clase de tiket control
const { TicketControl } = require('../class/ticketControl')
const tiketControl = new TicketControl();
// asi la llamamos de nuevo y lo instaciamos

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


    client.on('NextTickect', () => {
        let siguiente = tiketControl.siguiente();

        console.log(siguiente);
    });



});