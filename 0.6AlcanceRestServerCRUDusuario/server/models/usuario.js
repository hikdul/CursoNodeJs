const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

// asi se declara un nuevo esquema
// aqui conf un las reglas para este schema
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario']
    },
    psw: {
        type: String,
        required: [true, 'conrtaseña es completamente necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// de este modo no retornamos el valor o el sitio donde se aloja el psw
//  methods.toJSON,
usuarioSchema.methods.toJSON = function() {
    // obtengo el modelo actual con todo, 
    let user = this;
    // creo una copia del objeto actual
    let userOb = user.toObject();
    // elimino el pasword del area de retorno
    delete userOb.psw;
    // y por ultimo lo retorno
    return userOb;
}




// estones para retornar el mensaje en caso de jrepetir email
usuarioSchema, mongoose.plugin(unique, { message: '{PATH} usuario ya registrado' });

// asi lo esportamos hacia la base de datos
module.exports = mongoose.model('Usuario', usuarioSchema);