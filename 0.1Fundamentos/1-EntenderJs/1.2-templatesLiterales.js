let nombre = 'deadpool'
let real = 'Wade Widstrom'

console.log(`el personaje de ${nombre} lo interpreta ${real}`);

const var1 = `el personaje de ${nombre} lo interpreta ${real}`
const var2 = 'el personaje de ' + nombre + ' lo interpreta' + real



//esto a nivel sintantico es igual a usar la concatenacion 
if (var1 === var2)
    console.log('Equals maricooo equalsss');

const suma = (n1, n2) => n1 + n2

n1 = 14
n2 = 34
    ///trambien puede llamar funciones
console.log(`el valos de la suma es ${suma(5,5)}`);
console.log(`el valos de la suma es ${suma(n1,n2)}`);