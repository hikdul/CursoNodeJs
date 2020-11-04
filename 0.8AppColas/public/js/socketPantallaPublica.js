var socket = io();


let lblescritorio1 = $('#lblEscritorio1');
let lblescritorio2 = $('#lblEscritorio2');
let lblescritorio3 = $('#lblEscritorio3');
let lblescritorio4 = $('#lblEscritorio4');


let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let labelD = [lblescritorio1,lblescritorio2,lblescritorio3,lblescritorio4];
let labelTk = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];

// lblTicket2
// lblEscritorio2

// esta funcion me actualiza los datos

let actualizarHTML =  ultimos4 =>{
    for(let i=0 ; i<ultimos4.length ; i++){
        labelTk[i].text('Ticket '+ ultimos4[i].numero);
        labelD[i].text('Escritorio '+ ultimos4[i].escritorio);
    }
}

// este es el socket en si 
// este evento escucha los cambios en el estado actual y  actualiza la data de este pantalla
// ojo solo la data no me la refresca

socket.on('estadoActual', data =>{
    // console.log(data);
    actualizarHTML(data.ultimos4);
})

// con este evento refrescamos

socket.on('ultimos4Reload', data =>{
  console.log(data);
    actualizarHTML(data.ultimos4);
    var Alerta = new Audio('audio/asdf.mp3');
    Alerta.play();
});
