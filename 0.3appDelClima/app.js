// Hacemos el llamdado a nuestros elementos
const argv = require('./Config/Yargs').argv;
const Lugar = require('./Lugar/Lugar');
const Clima = require('./Clima/Clima');





const getInfo = async dir => {

    try {
        const coo = await Lugar.getLugar(dir);
        const temp = await Clima.getClima(coo.lat, coo.long);
        return `el clima de ${coo.direccion} es de ${temp}.`;
    } catch {
        return `no se consigue el clima para ${dir}`;
    }

};

getInfo(argv.direccion).then(console.log).catch(console.log);