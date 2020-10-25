let { io } = require('../server')

io.on('connection', (client) => {
        console.log('usr Conectado')


        client.on('disconnect', () => {
            console.log('usr desconectado')
        })





        // escuchar el cliente
        // los emit son para emitir y los on son para escuchar
        // aqui escuchamos cada que se envia 
        // por medio del callback verificamos que la informacion llego de manera satisfactoria
        client.on('enviarMensaje', (msn, callback) => {

            console.log(msn);

            // ovbiamente aqui ya que se enviaria luego de recibir el mensaje
            // asi emito un mensaje de modo completo
            // solo disparando el mismo evento que todos escuchan
            // solo es agregar ese broadcas y se emitira a todos
            client.broadcast.emit('enviarMensaje', msn);


            // if (msn.usuario) {
            //     callback({
            //         ok: true,
            //         resp: 'todo salio bien'
            //     })
            // } else {
            //     callback({
            //         ok: false,
            //         resp: 'todo salio Mallll!!!!! Marico que paso y el usuario'
            //     })
            // }

            // // // esto se comento para poder hacer el ejemplo de enviar mensajes a todos los usuarios
        })

        // ahora vamos a emitir un mensaje para  que lo reviba los cliente.. desde aqui enviamos y aya hay que escucharlo

        client.emit('enviarMensaje', {
            usuario: 'Administrador Del Sistema',
            mensaje: 'bienvenido al uso de la app'
        })


    })
    // ==========fin de la informacion