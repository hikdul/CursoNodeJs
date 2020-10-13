//se incorporaron en el EMS7

//de este modo hacemos que se llanme directamente una promesa
//asi no tengo que resaltar nada!!
// de este modo llamo a mi async
const getNombre = async() => 'hector'

console.log(getNombre());

getNombre().then(nm => {
    console.log(nm);
}).catch(e => {
    console.log('ERROR' + e);
})




/********************************  */
// de este modo uso mi await
// para poder ejecutar el await si o si tenemos que estar enuna funct await


const getter = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('hector')
        }, 2500)

    })
}

///eso crea la sensacion de que son fununciones sincronas
//  por tanto son bastante peligrosas

const saludaWon = async() => {
    let nm = await getter();

    return `Hola ${nm}`
}



saludaWon().then(mens => console.log(mens))