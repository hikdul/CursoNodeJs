// ============================
//  Configuracionse generales del sistema!!
// ============================

// =========================================================================================//

// ============================
//  Puerto
// ============================

// => aqui verifico si estamos en local o en un ambiente de produccion
//  => para el local usamos el puerto 300 en produccion simplemente obtenemos el puerto

process.env.PORT = process.env.PORT || 3000;

// ============================
//  enviroment
// ============================

// => aqui tal cual si no es produccion nombramos en ambiente de trabajo como 'dev'
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  base de datos
// ============================

// =>seleccionamos la base de datos en base a su ambiente 
// NOTA: enmmi caso no configure una base de datos en ATLAS asi que solo quedara la local pero ya quedara para luego

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'aqui iria la bse de datos de produccion o la de ATLAS';
}
//esta variable como tal no existe pero la uso para identificar mi cadena de coneccion
process.env.DATA_BASE = urlBD;



// ============================
//  semilla secreta para disponer de nuestro jwt
// ============================

process.env.SEED = process.env.SEED || "process.env.SEED-llave-expuesta";


// =============================
// tiempo de expiracion de los tokens 
// 1 semana segun este "algotirmo"
// =============================


process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 7;

// ============================
//  Cliend Id para google SingIn
// ============================


process.env.CLIENT_ID = process.env.CLIENT_ID || '614776848556-387tb4rccoaighqrnl595kn9v5d83t9e.apps.googleusercontent.com';