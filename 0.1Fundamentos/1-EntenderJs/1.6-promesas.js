//para resolver estos problemas vamos a tomar la base de datos que teniamos anteriormente

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


///las promesas asi como los callback nos ayudan a resolver problemas donde necesitamoas realizar algo luego de ejecutar algina accion
///se pueden trabajar de forma sincrona o asincrono

///y asi llamamos una promesa

let getEmpleado = (id) => {
    /// primero declaramos que es una proimesa
    /// esta promesa recibe dos parametros resolve y reject
    /// no son parametros son 3 callbacks resolve, reject y en donde nosotros escribimos codigo
    /// reject => es en caso de ocurrir un error y especificamos que hbacer
    /// resolve => es en caso de estar resuelto devolvemos nuestros valor
    /// no necesitan tener estos nombres pero para este ejemplo si
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
console.log('maricoo');

getEmpleado(2).then(empleado => {
    console.log('empleado de Bd: ', empleado);
}, err => console.log(err));
/// para implementar en reject hay que colocar esta linea donde esta err
// asi no hay problemas de implementacion ni errores durante la ejecucion
getEmpleado(777).then(empleado => {
    console.log('empleado de Bd: ', empleado);
}, err => console.log(err));



/** ############## */
console.log('anora con salario');

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

// para que ese $ al final DUDA!!

getEmpleado(3).then(empleado => {
    getSalario(empleado).then(salario => {
        console.log(`el empleado ${salario.nombre} gana ${salario.salario} $`);
    });
}, err => console.log(err));


getEmpleado(5).then(empleado => {
    getSalario(empleado).then(salario => {
        console.log(`el empleado ${salario.nombre} gana ${salario.salario}`);
    }, err => console.log(err));
}, err => console.log(err));


getSalario(getEmpleado(5555).then(emp => {
        console.log(emp)
    }, err => console.log(err))).then(sal => {
        console.log(sal);
    }, err => console.log(err)) ///en este orden se vuelve loco

// el gran problema que aqui podemos tener es que las llamadas en cadena se vuelvan engorrozas