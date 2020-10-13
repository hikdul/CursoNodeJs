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


let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {

        let empleadoDB = Empleados.find(empleado => empleado.id === id)
            // console.log(empleadoDB) //=> jajajajaaaa
        if (!empleadoDB)
            reject(`no existe el empleado con id ${id}`)
        else {
            resolve(empleadoDB)
        }
    });

}

const getSalario = (Employed) => {
    return new Promise((resolve, reject) => {

        let salariodb = Salario.find(salario => salario.id === Employed.id)

        if (!salariodb)
            reject(` el empleado ${Employed.nombre} no tiene un salario asignado $`);
        else
            resolve({
                id: Employed.id,
                nombre: Employed.nombre,
                salario: salariodb.salario
            });




    });
}

//aqui va,os hacer el llamado de promesas en cadena
const llamarPromesasEncadenadas = (valor) => {

    getEmpleado(valor).then(emp => {
        return getSalario(emp)
    }).then(resp => {
        console.log(`el salario de ${resp.nombre} es de ${resp.salario}`)
    }).catch(err => {
        console.log(err)
    })
}


llamarPromesasEncadenadas(1);
llamarPromesasEncadenadas(3);
llamarPromesasEncadenadas(777);
llamarPromesasEncadenadas(5);


// esta es una añternativa para poder realizar el llamado en cadena.. y con el chas
// que es lo0 que mas me gusto se maneja las excepcion que sea lanzada