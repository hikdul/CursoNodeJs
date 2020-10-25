const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// para poder usar sockects instalamos el paquete sokets.io
const soketIO = require('socket.io');
const http = require('http');
let server = http.createServer(app);
// hasta aqui los llamdo de sokects

app.use(express.static(publicPath));
// aqui inicializamos el sokectio

// asi lo exportamos para usarlo desde otro archivo
module.exports.io = soketIO(server);
// aqui  inportamos estilo PHP para que la configuracion de los sockest este separa y aya mayor orden en el server
require('./sokects/sokects')
    // esta seria la comunicacion del backend

// asi sabremos como cuando alguien se conecte


// io.on('dis')
// este es para escuchar los datos
// aqui hay otro cambio en ves de app se llanma server
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});

// NOTA: para poder verificar que el servidor esta montado ir 
// al endPoint: /socket.io/socket.io.js
// si se observa un archivo de js con todo sus detalle que pesa unos 100k estamos bien