// aqui vamos a organizar el codigo de un modo que sea mas lumpio de leer 
// e incluso mas comodo de escribir

// primero mi data base
const Empleados = [{
    id: 1,
    nombre: "luis"
}, {
    id: 2,
    nombre: "gabri"

}, {
    id: 3,
    nombre: "jackeline"

}, {
    id: 4,
    nombre: "Rommel"

}, {
    id: 5,
    nombre: "Alejandra"
}]

const Salario = [{
    id: 1,
    salario: 100
}, {
    id: 2,
    salario: 200

}, {
    id: 4,
    salario: 400

}, {
    id: 3,
    salario: 500
}]

//ahora copio mis funciones hechas con promesas

// const getEmpleado = (id) => {
//     return new Promise((resolve, reject) => {

//         let empleadoDB = Empleados.find(empleado => empleado.id === id)
//             // console.log(empleadoDB) //=> jajajajaaaa
//         if (!empleadoDB)
//             reject(`no existe el empleado con id ${id}`)
//         else {
//             resolve(empleadoDB)
//         }
//     });

// }
// asi lo volvemos asincrono
const getEmpleado = async(id) => {
    let empleadoDB = Empleados.find(empleado => empleado.id === id)
    if (!empleadoDB)
        throw new Error(`no existe el empleado con id ${id}`)
    else
        return empleadoDB
}

const getSalario = async(Employed) => {


    let salariodb = Salario.find(salario => salario.id === Employed.id)

    if (!salariodb)
        throw new Error(` el empleado ${Employed.nombre} no tiene un salario asignado $`);
    else
        return {
            id: Employed.id,
            nombre: Employed.nombre,
            salario: salariodb.salario
        };

}


// aqui si mostrasremos el uso de async y await

let getInf = async(id) => {
    let empleado = await getEmpleado(id)
    let resp = await getSalario(empleado)
        // todo eso lo resumo asi
        // let resp = await getSalario(await getEmpleado(id))

    return `el ciudadano ${resp.nombre} gana ${resp.salario}`

}

const llamarPromesa = (id) => {

    getInf(id).then(mens => console.log(mens))
        .catch(err => console.log(err))
}

llamarPromesa(1)
llamarPromesa(777)
llamarPromesa(5)

//esto falla que jode con los errores