// al iniciose acostumbran a colocar los required
const fs = require('fs');
let datos = '';
//=>aquiui esta llamando a la creacion de archivos

// hay 3 tipos de required
// required('fs') => que son librerias 'nativas' de node y por tanto al llamarlo ya simplemente se usan
// required('express') => son cuando se llamar pauqetes externos que no son nativos.. o de otro modo que necesitan ser instalados para luego ser usados
// required('./ptah') => archivbos propios que estan en algun lugar de nuestro proyecto o   pc

const base = 8;

for (let i = 1; i <= 10; i++)
    datos += `${base} * ${i} = ${base*i}\n`;


///aqui es donde vamos a llamar y guardar nuestro archivo
// donde fs es nuestro archivo que se llamo como const arriba
//whrite file => para escribir en nuestro arch WhiiteFile('elem1','elem2',callbacck(err))
//elem1 => nombre del archivo
//elem2 => contenidode a guardar
// callback seria el erroe 



fs.writeFile(`tablas/tabla-${base}.txt`, datos, err => {
    if (err) throw err
    console.log(`Se Guardo El Archivo tabla-${base}.txt`);
})