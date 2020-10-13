const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const { number } = require('yargs');

//este seria una forma de agregarlo al modulo
// consr module.exports.crearArch = base => {
const crearArch = (base, limite) => {
    return new Promise((resolve, rejects) => {

        if (!Number(base) || !Number(limite)) {
            rejects('valor no numerico')
            return
        }

        if (limite <= 0) {
            rejects('valor de limite no valido')
            return
        }

        let datos = '';



        for (let i = 1; i <= limite; i++)
            datos += `${base} * ${i} = ${base*i}\n`;

        fs.writeFile(`tablas/tabla-${base}.txt`, datos, err => {
            if (err)
                rejects(err)
            else
                resolve(`tabla-${base}.txt`)
        })
    })
}

// aqui van los datos de las tablas que se van a listar

const listarTablas = (base, limite) => {
    return new Promise((resolve, rejects) => {
        if (!Number(base) || !Number(limite)) {
            rejects('valor no numerico')
            return
        }
        if (limite <= 0) {
            rejects('valor de limite no valido')
            return
        }

        let datos = ''
        datos += '#######################\n'
        datos += `=> tabla del ${base} <=`
        datos += '\n'
        datos += `=> iterada ${limite} veces <=`
        datos += '\n'
        datos += '#######################\n'
        datos += '\n'

        for (let i = 1; i <= limite; i++)
            datos += `${base} * ${i} = ${base*i}\n`

        resolve(datos)

    })
}


// aqui indicamos los elementos que se iran al modulo para ser exportados
//esta es la segunda manera solo qur aqui se coloca la lista de los elementos
module.exports = {
    crearArch,
    listarTablas
}


// estos archivos van a ser observados en 2.2-impor...