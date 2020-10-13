/// funcion nomal

function sumar(a, b) {
    return a + b
}

console.log(sumar(10, 40));

/// si la armamos tipo  flecha seria 
/// las funciones tipo flacha de una linea tienen un return explicito

const sm = (a, b) => a + b;

console.log(sm(10, 40));
/// la forma tradiciona de las funciones tipo flecha es esta
const saludar = (mensaje) => {
    return `hola el mensaje es ${mensaje}`
}

/// tambien si se tiene un argumento se puede eliminar los parentesis ya que no son necesarios

const saluda = nombre => `hola ${nombre}`;

console.log(saludar('oso peresozos'));
console.log(saluda('hector'));

//hayn que tener cuiodado con el objeto del this, ya que apunta con lo que valga fuera de la funcion de flecha...