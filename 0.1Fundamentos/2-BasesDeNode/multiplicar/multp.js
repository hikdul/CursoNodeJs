const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

//este seria una forma de agregarlo al modulo
// consr module.exports.crearArch = base => {
const crearArch = base => {
    return new Promise((resolve, rejects) => {

        if (!Number(base)) {
            rejects('vañor no numerico')
            return
        }

        let datos = '';

        for (let i = 1; i <= 10; i++)
            datos += `${base} * ${i} = ${base*i}\n`;

        fs.writeFile(`tablas/tabla-${base}.txt`, datos, err => {
            if (err)
                rejects(err)
            else
                resolve(`tabla-${base}.txt`)
        })
    })
}

// aqui indicamos los elementos que se iran al modulo para ser exportados
//esta es la segunda manera solo qur aqui se coloca la lista de los elementos
module.exports = {
    crearArch
}


// estos archivos van a ser observados en 2.2-impor...