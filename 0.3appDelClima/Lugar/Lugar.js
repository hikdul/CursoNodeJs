const axios = require('axios');


// console.log(argv.direccion);

//aqui escapamos la direccion //=>sin embargo aqui  no es util para hacer las busquedas
// const encoderURL = encodeURI(argv.direccion)
// console.log(encoderURL);

/// aqui tedria que haber un header pero la apí  no funciona
/// ya eso estara en el codigo del profesor

const getLugar = async dir => {

    const instance = axios.create({
        baseURL: `https://geocode.xyz/Hauptstr.,+57632+"${dir}"?json=1`
            // timeout: 1500

    });

    const resp = await instance.get();

    const data = resp.data;

    if (data.standard.countryname === undefined)
        throw new Error(`No Hay Resultados para el valor: ${dir}`);

    const direccion = `Ciudad ${data.standard.city} => Pais ${data.standard.countryname}`;
    const lat = data.latt;
    const long = data.longt;

    return {
        direccion,
        lat,
        long
    }


}

module.exports = {
    getLugar
}