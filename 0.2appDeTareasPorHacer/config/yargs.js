const completado = {
    alias: 'c',
    desc: 'para actualiza el estado a completado',
    default: true,
    // demand: true
}

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripocion de la descripcion'
}


const argv = require('yargs')
    .command('listar', 'Imprime por consola una lista', { completado })
    .command('crear', 'Crea una nueva tarea', { descripcion })
    .command('actualizar', 'actualiza una tarea', { descripcion, completado })
    .command('borrar', 'actualiza una tarea', { descripcion })
    .help()
    .argv


module.exports = {
    argv
}