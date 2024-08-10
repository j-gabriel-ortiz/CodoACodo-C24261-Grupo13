// Renderizado de ropa
const contenedorCards = document.getElementById('ropa-exclusiva')

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
fetch('https://gabrieljo.pythonanywhere.com/api/datos')
    .then(response => response.json())
    .then(contenido => {
        const longitud = contenido.length;
        const numerosUnicos = generarNumerosUnicos(longitud);

        numerosUnicos.forEach(index => {
            const indexContenido = contenido[index];
            cardRopaExclusiva(indexContenido)
        })
    })

function generarNumerosUnicos(longitud) {
    const numerosUnicos = new Set();

    while (numerosUnicos.size < 5) {
        const numero = Math.floor(Math.random() * longitud); 
        numerosUnicos.add(numero);
    }

    return Array.from(numerosUnicos);
}

function cardRopaExclusiva(dicRopa) {
    //Creacion de elementos
    // contenedor card
    const card = document.createElement("div");
    card.classList.add('card');

    //Imagen
    const imgCard =  document.createElement('img');
    imgCard.classList.add('card-img-top');
    imgCard.src = dicRopa.img;
    imgCard.alt = dicRopa.prenda;

    // cuerpo del Card
    const cardBody = document.createElement("div");
    cardBody.classList.add('card-body');

    //titulo card
    const tituloH5 = document.createElement('h5');
    tituloH5.classList.add('card-title');
    tituloH5.textContent = dicRopa.prenda;

    // precio
    const precioP = document.createElement('p');
    precioP.classList.add('card-text');
    precioP.textContent = '$'+ dicRopa.precio;
    
    //Append
    cardBody.appendChild(tituloH5)
    cardBody.appendChild(precioP)

    card.appendChild(imgCard)
    card.appendChild(cardBody)

    //Renderizado de elementos
    contenedorCards.append(card);
};