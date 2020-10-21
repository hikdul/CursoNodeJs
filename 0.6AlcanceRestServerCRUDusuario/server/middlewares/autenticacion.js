const jwt = require('jsonwebtoken');


// =====================
// Verificar Token
// =====================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido, intente logearse nuevamente'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });



};

// =====================
// Verifica AdminRole
// =====================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no los permisos necesarios'
            }
        });
    }
};


// ==================================
// verificar el token por el url, usado aca para la imagen
// ==================================

let verificaTokenUrl = (req, res, next) => {
    let token = req.query.token

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido, intente logearse nuevamente'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
}



module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenUrl
}