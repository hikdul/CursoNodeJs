const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control')


const ticketControl = new TicketControl()

io.on('connection', client => {

    client.on('siguienteTicket', (datos, callback) => {
        let siguiente = ticketControl.siguienteTicket()
            // console.log(siguiente)
        callback(siguiente)

    })

    client.emit('estadoActual', {
        actual: ticketControl.getUstimoTicket()
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio)
            return callback({
                err: true,
                message: 'el escritorio es necesario'
            })

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)
            // falta algo para actualizar las pantallas

    })

});