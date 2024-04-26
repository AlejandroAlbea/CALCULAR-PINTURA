const rendimientoPorColor = {
    blanco: 5,
    negro: 6,
    gris: 5.5,
    azul: 5,
    verde: 4.5,
    rojo: 5,
    amarillo: 4.8,
    naranja: 4.6,
    violeta: 4.7,
    marron: 4.9,
    turquesa: 5.2,
    celeste: 5.1,
    dorado: 5,
    plateado: 5.3,
    rosa: 4.4,
    lila: 4.8,
    lima: 4.7,
    coral: 4.6,
    lavanda: 4.5,
    beige: 5.4,
};

const generarOpcionesPorColor = (color, marcas) => {
    return Array.from({ length: 5 }, (_, index) => {
        const i = 0.75 * Math.pow(2, index);
        const valorSeguro = `${color}-${i}`.replace(/[-+]/g, '');
        const numRef = Math.floor(1000 + Math.random() * 9000);
        const marcaAleatoria = marcas[Math.floor(Math.random() * marcas.length)];
        return `<option value="${valorSeguro}">${marcaAleatoria} - ${color.charAt(0).toUpperCase() + color.slice(1)} - ${i} L (Ref. ${numRef})</option>`;
    }).join('\n');
};

const generarOpcionesColores = (rendimientoPorColor) => {
    const marcas = ['Titanlux', 'Mojácar', 'Guadalux'];
    return Object.keys(rendimientoPorColor).map(color => {
        const opcionesPorColor = generarOpcionesPorColor(color, marcas);
        return `<optgroup label="${color.charAt(0).toUpperCase() + color.slice(1)}">\n${opcionesPorColor}\n</optgroup>`;
    }).join('\n');
};


const agregarOpcionesColores = () => {
    const opciones = generarOpcionesColores(rendimientoPorColor);
    const selectElement = document.querySelector('#colorYTamano');
    selectElement.innerHTML += opciones;
};

document.addEventListener('DOMContentLoaded', agregarOpcionesColores);

function calcularBotes() {
    const metrosCuadrados = parseFloat(document.getElementById('metrosCuadrados').value);

    const colorYTamano = document.getElementById('colorYTamano').value;

    const [color, tamanioBote] = colorYTamano.split('-');

    const tamanioBoteNumerico = parseFloat(tamanioBote);

    const metrosCuadradosInput = document.getElementById('metrosCuadrados');

    const colorYTamanoInput = document.getElementById('colorYTamano');

    if (isNaN(metrosCuadrados) || isNaN(tamanioBoteNumerico) || color === '') {
        metrosCuadradosInput.classList.add('error');
        colorYTamanoInput.classList.add('error');
        return;
    } else {
        metrosCuadradosInput.classList.remove('error');
        colorYTamanoInput.classList.remove('error');
    }

    const litrosNecesarios = metrosCuadrados / rendimientoPorColor[color];

    const numeroBotes = Math.ceil(litrosNecesarios / tamanioBoteNumerico);

    const nombrebote = numeroBotes === 1 ? 'bote' : 'botes';

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `Para pintar ${metrosCuadrados} m<sup>2</sup> necesitas ${numeroBotes} ${nombrebote} de ${tamanioBoteNumerico} litros de pintura ${color}.`;
}
