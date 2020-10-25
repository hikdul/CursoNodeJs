     //    <!-- configuracion de socket en el from end -->

     var socket = io();

     socket.on('connect', function() {
             console.log('conectado al servidor');
         })
         // con esto ya nuestro front end estara pendiente de cualñqueir cambio en el servidor

     socket.on('disconnect', function() {
         console.log('servidor desconectado');
     })

     // aqui vamos a enviar informacion desdes front end al back end
     // con esto solo enviamos los mensajes al server, y desde alli los pasamos de un punto a otro
     // pero solo el servidor lo escucha
     // el callback que este al final, es para alli verificar si los datos llegaron sin comprometerse a su destino
     socket.emit('enviarMensaje', {
         // usuario: 'Hector Contreras',
         mensaje: 'mensaje enviado desdes el front end'
     }, function(resp) {
         // console.log('se disparo el callBack');
         console.log('respuesta server: ', resp);
     });




     // ##########============##############

     // ahora vamos a escuchar informacion
     socket.on('enviarMensaje', function(mensaje) {
         console.log('servidor dice: ', mensaje)
     })