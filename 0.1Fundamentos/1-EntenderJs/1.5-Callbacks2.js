/// aqui veremos las ventajas y desventajas de usar callbacks
/// pero primero intentare crear una pequeña base de datos
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

///
///

let getEmpleado = (id, callback) => {
    let empleadoDB = Empleados.find(empleado => empleado.id === id)
        // console.log(empleadoDB) //=> jajajajaaaa
    if (!empleadoDB)
        return callback(`no existe el empleado con id ${id}`)
    else {
        callback(null, empleadoDB)
    }

}


///aqui hacemos la funcion de get salario

let getSalario = (empleado, callback) => {
    let salariodb = Salario.find(salario => salario.id === empleado.id)

    if (!salariodb)
        return callback(` el empleado ${empleado.nombre} no existe o no tiene un salario asignado `)
    else
        callback({
            id: empleado.id,
            nombre: empleado.nombre,
            salario: salariodb.salario
        });
    /// El problema de mantener estos callback es que si se necesitan mas consultan la identacion crece de modo exponencial!!

}



// getEmpleado(7, (err, emp) => {
//     if (err)
//         return console.log(err)
//     else
//         console.log('datos del empleado' + emp)
// })


getEmpleado(3, (err, emp) => {
        if (err)
            return console.log(err)
        else {
            console.log('datos del empleado ' + emp + ' ' + emp.nombre + ' ' + emp.id)
            getSalario(emp, (err, respuesta) => {
                if (err)
                    return console.log(err)
                else {
                    console.log(respuesta);
                }
            });
        }
    })
    // getEmpleado(2, (err, emp) => {
    //     if (err)
    //         return console.log(err)
    //     else
    //         console.log('datos del empleado' + emp)
    // });



// getEmpleado(777, (err, emp) => {
//     if (err)
//         return console.log(err)
//     else
//         console.log('datos del empleado' + emp)
// })