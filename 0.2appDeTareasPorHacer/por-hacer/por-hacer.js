// aqui llamamos a nuestros generador de archivos
const fs = require('fs');
// inicializamos nuestro objeto donde iran los datos que luego seran guardados
let listadoPorHacer = [];

// ###############################
//aqui iria nuestra funcion de ller los datos
// ###############################


const cargarDB = () => {
    //si no hay datos en el json me lanza un error por eso llenamos el listado
    try {
        // en js eso esto es lo mejor que hay
        listadoPorHacer = require('../db/data.json')
    } catch {
        listadoPorHacer = []
    }
}


// ###############################
//creamos nuestras funcion de guardar
// ###############################

// const guardarDB = () => {

//     //sampamos el nuevo datos
//     let data = JSON.stringify(listadoPorHacer)

//     return new Promise((resolve, rejects) => {
//         fs.writeFile('db/data.json', data, err => {
//             if (err)
//                 rejects(err)
//             else
//                 resolve(`db/data.json`)
//         })
//     })


// }

// por el error que me genera en la opcion de actualizar evito el uso de la promesa y literal copio el codigo del profesor

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}


// ###############################
// Empezaremos con nuestra funcion crear
// ###############################

const Crear = descripcion => {
    let porHacer = {
        descripcion,
        completado: false
    }
    cargarDB()
    listadoPorHacer.push(porHacer)
    guardarDB()
    return porHacer
}

// ###############################
// aqui nuestra funcion de get listado
// ###############################

const getListado = completado => {
    if (completado === 'all') {
        cargarDB()
        return listadoPorHacer
    } else {
        cargarDB()
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === completado);
        listadoPorHacer = nuevoListado;
        return listadoPorHacer

    }
}

// ###############################
//  aqui hacemos nuestra clase de actualizar tarea
// ###############################

const Actualizar = (descripcion, completado) => {

    cargarDB()
        //asi busco el index o la pocicion del elemento
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarDB()
        return true
    } else {
        return false
    }
}

// ###############################
// aqui vamos a colocar los datos de la funcion borrar
// ###############################

const borrar = descripcion => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }



    // cargarDB();
    // let retorno = false;
    // let nvaLista = listadoPorHacer.filter(x => x.descripcion !== descripcion);
    // if (nvaLista.length !== listadoPorHacer.length) {
    //     retorno = true;
    //     listadoPorHacer = nvaLista;
    //     guardarDB();
    // }

    // return (nvaLista.length - listadoPorHacer.length);
    // return retorno;


}

// ###############################
// aqui colocamos los modulos que seran exportados
// ###############################

module.exports = {
    Crear,
    Guardar: guardarDB,
    getListado,
    Actualizar,
    borrar
}