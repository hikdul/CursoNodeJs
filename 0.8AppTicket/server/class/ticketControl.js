const fs = require('fs');

class TicketControl {

    // ===============================================
    // el constructos se llama tal cual,
    //  investigar sobre contructores de copia y demas si son viables 
    // ===============================================

    constructor() {

            this.ultimo = 0;
            this.hoy = new Date().getDate();


            let data = require('../data/data.json');
            // console.log(data);

            if (data.hoy === this.hoy) {
                this.ultimo = data.ultimo;
            } else {
                this.reiniciarConteo();
            }

        } //fin del contructor

    // ===============================================
    // cual es el aiguiente ticket
    // ===============================================

    siguiente() {
        this.ultimo += 1;
        this.grabarArch();

        return `Ticket N° ${this.ultimo}`;
    }

    // ===============================================
    // reiniciar conteo
    // ===============================================
    reiniciarConteo() {
        console.log('dia nuevo, caras sonrrientes y buena energia');
        this.grabarArch();
    }

    // ===============================================
    // guardar en archivo
    // ===============================================
    grabarArch() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }



}

// ===============================================
// exportacion de nuestra clase para el uso desde socket.js
// ===============================================

module.exports = {
    TicketControl
}