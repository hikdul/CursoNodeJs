const hbs = require('hbs');

/// helpers
/// los helpers son una funcion que se dispara cuando el template lo requiere
/// getanio se llama desde footer
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('Capitalizar', texto => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();

    });
    return palabras.join(' ');
})