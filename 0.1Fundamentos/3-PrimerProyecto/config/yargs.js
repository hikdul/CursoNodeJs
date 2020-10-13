const opciones = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    },

}
const argv = require('yargs')
    .command('listar', 'Imprime por consola la tabla de multiplicar', opciones)
    .command('crear', 'Crea una nueva tabla segun el valor numerico asignado', opciones)
    .help()
    .argv


module.exports = {
    argv
}