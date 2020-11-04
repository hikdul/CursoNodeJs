const { io } = require('../server');

const { TicketControl } = require('../class/ticketControl');
const ticketControl = require('../class/ticketControl');


// aqui va la logica para generar nuevos tockest

const Ctikect = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTk', (data,callback)=>{
        
    let siguiente = Ctikect.siguiente();
    console.log(siguiente);
    callback(siguiente);
    })

    client.emit('estadoActual',{
         actual: Ctikect.getUltimoTicket(),
         ultimos4: Ctikect.getUltimos4()
        });

// aqui va la logica para atender tiockets

client.on('atenderTk', (data,callback) =>
{
    if(!data.escritorio)
        return callback({
            err: true,
            mensaje: 'el escritorio es necesario'
        });

        // let atenderTk = ticketControl.atenderTk(data.escritorio);

        let atenderTk = Ctikect.atenderTk(data.escritorio);

        callback(atenderTk);

})

// aqui va la logica para refrescar la pantalla publica

client.broadcast.emit('ultimos4Reload', {
    ultimos4 : Ctikect.getUltimos4()
});


});