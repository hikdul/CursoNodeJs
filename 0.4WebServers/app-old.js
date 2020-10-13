// ##########################################
// ##########################################
// Esto es usando la forma clasica de praogrmar sin usar paquetes de terceros!! 
// para esta seccion se usara express
// ##########################################
// ##########################################

// Primero nuestrasd declaraciones generales
const http = require('http');


http.createServer((req, res) => {


        res.writeHead(200, { 'content-type': 'application/json' });
        let salida = {
            nobre: 'hector',
            edad: 30,
            casado: false,
            url: req.url
        }
        res.write(JSON.stringify(salida));


        // res.write('Hola Mundo');
        res.end();

    })
    .listen(8080);

console.log('escuchando el puesto 8080');