
const fs = require('fs')
// ========================================
// aqui creamos una clase de tickets para tenerlos mas organizados
// ========================================

class ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


// ========================================
// aqui ira nuestra clase de ticket control; 
// en resumen es el epicentro de nuestro codigo, o de la logicca del codigo
// ========================================

class TicketControl{

// aqui se declaran las propiedades de la clase

    constructor(){
    
        this.ultimo = 0
        this.hoy = new Date().getDate()
        // lista de ticket que no se han atendidos
        this.tickets = [];
        // lista de los ultimos 4 tickets que se estan atendiendo en el mnomento
        this.ultimos4 = [];

        // de donde obtenemos nuestra lista de elementos necesarios para continuar nuestro dia a dia
        let data = require('../data/data.json')
    
// aqui veremos si es el mismo dia o uno diferente

        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }

    }

// ==================================
//  para guardar datos
// ==================================
guardarDatos(){
    let jsonData = {
        ultimo: this.ultimo,
        hoy: this.hoy,
        tickets: this.tickets,
        ultimos4: this.ultimos4 
    }

    let jsonString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonString);

}

// =====================================
// para reiniciar conteo
// =====================================

reiniciarConteo(){
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    this.guardarDatos();
    console.log('Nuevo dia a empezar echandole ganas');
    
}


// =====================================
// para poder generar el ultimo o el siguiente ticket
// =====================================

siguiente(){

    this.ultimo += 1;

    let tickete = new ticket(this.ultimo,null);
    this.tickets.push(tickete);

    this.guardarDatos();

    return `el siguiente ticket es ${this.ultimo}`

}

// =====================================
// para verificar quien es el ultimo numero y poderlo usar desde el front
// tambien el que retorna los ultimos 4, o los que se estan atendiendo enneste momento
// =====================================

getUltimoTicket(){
    return this.ultimo;
}

getUltimos4(){ 
    return this.ultimos4;
}


// =====================================
// para asignar quien atiende el proximo ticket
// =====================================

atenderTk(escritorio){
    if(this.tickets.length === 0)
        return 'no hay nadie en cola';
    
        // se estrae asi para romper la relacion de que todos los parametros se trabajan por referencia
    let nmticket = this.tickets[0].numero;
    // asi elimino el primer elemento de la cola
    this.tickets.shift();

    // genero elticket que se va a atender
    let atenderTicket = new ticket(nmticket,escritorio);
    // y se agrega al inicio de su arreglo
    this.ultimos4.unshift(atenderTicket);
    // aqui borro todos los que sean mayores a 4
    // verificar informacion sobre esa funcion splice
    if(this.ultimos4.length>4)
        this.ultimos4.splice(-1,1);

    console.log('Ultimos 4');
    console.log(this.ultimos4);

    this.guardarDatos();

    return atenderTicket;
}

// =====================================
// expórtar modulos
// =====================================


}


module.exports = {
    TicketControl
}