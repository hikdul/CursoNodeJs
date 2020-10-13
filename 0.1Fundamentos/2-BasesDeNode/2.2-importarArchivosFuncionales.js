// EN EL CASO DE LLAMAR A UN JS se puede ovbiar la extencion ya qie es completamente rebundante y 
// const mult = require('./multiplicar/multp.js')
const { crearArch } = require('./multiplicar/multp')
    //para poder simular como una herencia se deestructuro

let base = 1.2

crearArch(base).then(arch => console.log(`Archivo Creado para la tabla ${base}`))
    .catch(err => console.log(err))