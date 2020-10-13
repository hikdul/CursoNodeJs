/// es una funcion que se ejecuta luego de una accion

/// un callback sencillo

setTimeout(() => {
    console.log('hola mundo'); //este seria el callback => ya que se ejecuto luego de llamar la funcion settimeout
}, 3000)

/// otro ejemplol de callback es

let getUsuarioById = (id, callback) => {
    /// de las ventajas de EMS6 es que al recibir un parametro llamado id e introducirlo en algo que se llama igual
    /// no es necesario implementa la equidad simplemente se hace por referencia
    /// por eso se ovbia el id=id
    const usuario = {
            nombre: 'hector',
            id
        }
        /// por lo general el primer argumento de una function en callback es el error
        /// asi si vemos en este ejemplo simplifica de cierto modo el manejo de errores yu/oexcepciones
    if (id === 20)
        callback(`el usuario con id ${id} no existe en la base de datos`)
    else
        callback(null, usuario)
        /// por eso es que se coloca aqui null si no trabajara solo con el erroe
}

/// asi sea seria un llamado un callback
getUsuarioById(10, (err, usuario) => {
    if (err)
        return console.log(err);

    console.log('usuario de base de datos ', usuario);
})

getUsuarioById(20, (err, usuario) => {
    if (err)
        return console.log(err);

    console.log('usuario de base de datos ', usuario);
})