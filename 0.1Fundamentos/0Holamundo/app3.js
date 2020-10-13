console.log('inicio del programa');
//asi genera una tarea asincrona
setTimeout(() => {
    console.log('primer timerOut');
}, 3000);

setTimeout(() => {
    console.log('segundo timerOut');
}, 0);

setTimeout(() => {
    console.log('tercer timerOut');
}, 0);

console.log('fin del programa');

//aqui se nota el uso de las call backs

//ya que primero improime los logs que no tiene este tiempo de espera
//esto tiene que ver con el ciclo de vida de un proceso