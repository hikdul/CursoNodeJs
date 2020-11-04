// aqui vamos a importar lo necesario
const fs = require('fs');

// Nota: vertificar si se pueden generar constructores de copia y de los demas tiops tambien en js


// esta es la clase ticket, para abastecer dela informacion personal de cada tocket


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}



// aqui vamos a generar la clases para el control de tickets 

class TicketControl {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4Tickets = []

        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4Tickets = data - this.ultimos4Tickets
        } else {
            this.reiniciarConteo()
        }


    }

    // aqui almaceno os datos en la bse de datos
    reiniciarConteo() {
        this.ultimo = 0
        this.tickets = []
        console.log('Nuevo dia, Sistema iniciado')
        this.grabarArchivo()

    }

    // para grabar en el archivo o si en us defecto es una base de datos

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tikest: this.tickets,
            ultimos4Tickets: this.ultimos4Tickets
        }

        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString)

    }


    // aqui buscamos cual es el ultimo

    siguienteTicket() {

        this.ultimo += 1
            // NOTA pór ahora el escritorio es null
        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)


        this.grabarArchivo()

        return `ticket N° ${this.ultimo}`

    }

    // con esta funcion sabremos los datos de los tickets

    getUstimoTicket() {
        return `ticket N° ${this.ultimo}`
    }

    // con esta funcion sabremos a quien se le asginara el tocket

    atenderTicket(escritorio) {
        if (this.tickets.length === 0)
            return `NO Hay Tickets`

        let numerroTicket = this.tickets[0].numero
            // asi elimino el tiket que retire alli arriba
            //    en verdad elimina el primer elemento
        this.tickets.shift()

        let atenderTicket = new Ticket(numerroTicket.numero, escritorio)
            // asi agrego el toocket al inicio del arreglo
        this.ultimos4Tickets.unshift(atenderTicket)
            // asi borro el ultimo elemento, si es mayor a cuatro el arreglo
            // buscar informacion sobre las funciones usadas aca
        if (this.ultimos4Tickets > 4)
            this.ultimos4Tickets.splice(-1, 1)
            // aqui guardo el archivo
        this.grabarArchivo()
            // retorno el nuevo archivo
        return atenderTicket
    }
}



module.exports = {
    TicketControl
}