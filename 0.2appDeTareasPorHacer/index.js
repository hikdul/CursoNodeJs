const ph = require('./por-hacer/por-hacer');
const colors = require('colors')

// const argv = require('yargs').argv
const argv = require('./config/yargs').argv
    //console.log(argv);

let comando = argv._[0]

switch (comando) {

    case 'crear':
        // console.log('crear una nueva tarea');
        const tarea = ph.Crear(argv.descripcion)
        console.log(tarea);
        break

    case 'listar':
        const lista = ph.getListado(argv.completado);

        console.log('\n########## Tareas Por Hacer ##########\n'.rainbow);

        // for (let tarea of lista) {
        lista.forEach(tarea => {
            console.log('Tarea: '.grey + tarea.descripcion);
            console.log('completada: '.grey + (tarea.completado ? 'SI'.green : 'NO'.red) + '\n');

        });

        console.log('########## <=### END  ###=> ##########\n'.rainbow);
        break
    case 'actualizar':


        // const act = ph.Actualizar(argv.descripcion, argv.completado)
        // console.log(act ? 'Cambio echos' : 'cambios no echos');
        // console.log(act)


        const act = ph.Actualizar(argv.descripcion, argv.completado)

        console.log(act ? 'Tarea Actualizada'.green : 'No Hubieron cambios'.red);


        break
    case 'borrar':
        console.log(argv.descripcion);
        let borrado = ph.borrar(argv.descripcion)
        console.log(borrado ? 'Elemento Eliminado'.green : 'No Hubo Coincidencia'.red);
        // console.log(borrado);
        break
    default:
        console.log('cmd no reconocido');
        break
}