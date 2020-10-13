// aqui basicamente reciclo todo lo anterior para agregar las lineas de codigo y comentarios necesario para cubrir el objetivo de este archivo

const { crearArch } = require('./multiplicar/multp')

// let base = 1.2
// para este ejemplo usaremos process o el elemento process
// console.log(process);
// console.log(process.argv); => estos son los argumentos que vienen por defecto al ejecutar un archivo en node

const argv = process.argv
const prm = argv[2]
const base = prm.split('=')[1]

console.log(base);

crearArch(base).then(arch => console.log(`Archivo Creado para la tabla ${base}`))
    .catch(err => console.log(err))