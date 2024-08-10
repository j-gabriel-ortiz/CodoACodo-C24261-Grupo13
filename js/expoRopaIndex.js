// Elementos carousel home
const prevSmallImagen = document.getElementById('small-previus');
const prevImagen = document.getElementById('previus');
const currentImagen = document.getElementById('current');
const nextImagen = document.getElementById('next');
const nextSmallImagen = document.getElementById('small-next');

// const expoURL = 'https://gabrieljo.pythonanywhere.com/api/expo-ropa';
// const ropaURL = 'https://gabrieljo.pythonanywhere.com/api/datos'

// function conexionDB(URL) {
//     return fetch(URL)
//     .then(response => response.json())
//     .then(contenido => {
//         return contenido
//     })    
// }

// Fetch expo carousel
fetch('https://gabrieljo.pythonanywhere.com/api/expo-ropa')
    .then(response => response.json())
    .then(contenido => {
        let contador = 1
        setInterval(() => {
            asignarImagen(contenido, contador);
            contador = (contador + 1) % contenido.length;
        }, 3000)
    })

//medidor del width de la pantalla
const widthScreen = () => window.innerWidth < 900 ? false : true


//funcion asignar
function asignarImagen(array, index) {
    // Imagen central
    let indexActual = index == array.length
        ? 0
        : index;

    //Imagen previa
    let indexPrevio = indexActual == 0
        ? array.length - 1
        : indexActual - 1;

    //Imagen posterior
    let indexPosterior = indexActual == array.length - 1
        ? 0
        : indexActual + 1;
    


    // Carga de imagenes y alt
    prevImagen.alt = array[indexPrevio].alt_exp;
    prevImagen.src = array[indexPrevio].img_exp;

    currentImagen.alt = array[indexActual].alt_exp;
    currentImagen.src = array[indexActual].img_exp;

    nextImagen.alt = array[indexPosterior].alt_exp;
    nextImagen.src = array[indexPosterior].img_exp;

    if(widthScreen()) {
        imagenesLaterales(indexPrevio, indexPosterior, array)
    }
    
}

function imagenesLaterales(indexPrev, indexPost, array) {
    //img izquierda
    let smallIndexPrevio = indexPrev == 0
        ? array.length - 1
        : indexPrev - 1;

    //img derecha
    let smallIndexPosterior = indexPost == array.length - 1
        ? 0
        : indexPost + 1;
    
    prevSmallImagen.alt = array[smallIndexPrevio].alt_exp;
    prevSmallImagen.src = array[smallIndexPrevio].img_exp;

    nextSmallImagen.alt = array[smallIndexPosterior].alt_exp;
    nextSmallImagen.src = array[smallIndexPosterior].img_exp;
}
    
