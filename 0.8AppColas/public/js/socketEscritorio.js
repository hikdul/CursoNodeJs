var socket = io();

let label = $('small');
let searchParams = new URLSearchParams(window.location.search);

// este me retorna un booleano copn true si existe
if(!searchParams.has('escritorio') || Number.isInteger(searchParams.get('escritorio'))){
    window.location='index.html';
    throw new Error('El Escritorio Es Necesario');
}

// y asi tengo obtengo el valor

let escritorio = searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', () => {
    
    socket.emit('atenderTk',{escritorio},resp =>{
        console.log(resp);
        if(resp === 'no hay nadie en cola'){
            alert(resp);
            label.text(resp);
        }
        else
            label.text('N°: ' + resp.numero );
    })
});

