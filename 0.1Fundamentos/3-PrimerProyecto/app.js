//para pintar todo
const colors = require('colors');

// NUESTROS REQUIRED
const { crearArch, listarTablas } = require('./multiplicar/multp')


// aqui en el command lo argumentos son el nombre m, descripcion, commando y especificaciones
// de este modo podemos imponer estos detalles de ingresso de datos pór medio de la documentacion
const { argv } = require('./config/yargs')
    // de este modo se pueden traer las constantes tambien
    // const  argv  = require('./config/yargs').argv



// aqui empiezas nuestros required



let comando = argv._[0];

switch (comando) {
    case 'listar':
        listarTablas(argv.base, argv.limite)
            .then(rp => console.log(rp.rainbow))
            .catch(err => console.log(err.red))
        break;
    case 'crear':
        crearArch(argv.base, argv.limite)
            .then(arch => console.log(`archivo creado para la tabla de los numero ${argv.base}`.rainbow))
            .catch(e => console.log(e).red)
        break;
    default:
        console.log('cmd no reconocido');
        break
}







// crearArch(base).then(arch => console.log(`Archivo Creado para la tabla ${base}`))
//     .catch(err => console.log(err))