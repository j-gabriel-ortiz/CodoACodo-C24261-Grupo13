const sectionRopaCarrito = document.getElementById('render-items-carrito');
const listaDetallesCarrito = document.getElementById('prendas-seleccionadas');
const montoFinal = document.getElementById('monto-final');


const listaCarritoString = sessionStorage.getItem('listaPrendas');
const listaString = JSON.parse(listaCarritoString); // Convertir de cadena JSON a array
const listaCarrito = listaString.map(Number); // Convertir todos los string a number


// Obtener los datos de la API
fetch('https://gabrieljo.pythonanywhere.com/api/datos')
.then(response => response.json())
.then(datosPrendas => {
    // Llamamos a la función renderCarrito() y le pasamos los datos
    renderCarrito(datosPrendas, listaCarrito);
})


//Funcion para renderizar
function renderCarrito(datosDb, lista) {
    // Limpiamos el contenedor antes de renderizar   
    sectionRopaCarrito.innerHTML = "";
    console.log(datosDb)
    //ID unicos
    const setIdString = new Set(lista);
    const setIdUnicos = Array.from(setIdString).map(Number);
    
    let sumaPrecio = 0;
    
    setIdUnicos.forEach((id) => {
        const prenda = datosDb.find((item) => item.id === id);

        if (prenda) {
            const cantidad = listaCarrito.filter((item) => item === id).length;
            sumaPrecio = sumaPrecio + (cantidad * prenda.precio);
            
            //Renderizado Card
            sectionRopaCarrito.appendChild(prendaCarrito(prenda.img, prenda.prenda, prenda.id, prenda.precio, cantidad))
        
            //Renderizado Detalles
            renderDetalles(prenda.prenda, cantidad)
        
        }

    })

    // Suma total de los montos
    const spanTotal = document.createElement('span');
    spanTotal.textContent = `$ ${sumaPrecio}`

    montoFinal.appendChild(spanTotal)
}

// Funcion para crear card
function prendaCarrito(srcImagen, titulo, id, precio, cantidad) {
    //Creacion del contenedor de la prenda
    const divContainer = document.createElement('div');
    divContainer.classList.add('conteiner-prenda');
    
    // Creacion de los elementos del contenedor
    //Imagen
    const imgCarrito = document.createElement('img');
    imgCarrito.classList.add('img-prenda-carrito');
    imgCarrito.src = srcImagen;
    imgCarrito.alt = titulo;

    //Contenedor de los detalles
    const divDetalles = document.createElement('div');
    divDetalles.classList.add('detalles-prenda')

    //Detalles
    const tituloPrenda = document.createElement('h5');
    tituloPrenda.textContent = titulo;

    // Agregar un botón "X" para eliminar la prenda
    const btnEliminar = document.createElement('button');
    btnEliminar.setAttribute('id', id)
    btnEliminar.textContent = '\u00D7';
    btnEliminar.addEventListener('click', (event) => {
        const idTarget = event.currentTarget.getAttribute("id");
        id = parseInt(idTarget)
        eliminarPrendaDelCarrito(id);
    });

    const pPrecio = document.createElement('p');
    pPrecio.textContent = `Precio: $ ${precio}`;

    const pCantidad = document.createElement('p');
    pCantidad.textContent ='Cantidad: '+ cantidad;

    const pTotal = document.createElement('p');
    pTotal.textContent = `Total: $ ${precio * cantidad}`;

    //Append de detalles
    divDetalles.appendChild(tituloPrenda)
    divDetalles.appendChild(btnEliminar)
    divDetalles.appendChild(pPrecio)
    divDetalles.appendChild(pCantidad)
    divDetalles.appendChild(pTotal)

    //Append contenedor
    divContainer.appendChild(imgCarrito)
    divContainer.appendChild(divDetalles)

    return divContainer
}

function renderDetalles(nombrePrenda, cantida) {
    // Crear items de la lista
    const itemLista = document.createElement('li');
    itemLista.textContent = nombrePrenda;

    const spanCantidad = document.createElement('span');
    spanCantidad.textContent = '\u00D7 ' + cantida;

    itemLista.appendChild(spanCantidad);

    listaDetallesCarrito.appendChild(itemLista);
}

function limpiarCarrito() {
    sessionStorage.clear();
    window.location.reload();
}

// Función para eliminar una prenda específica del carrito:
function eliminarPrendaDelCarrito(id) {
    const index = listaCarrito.indexOf(id);
    if (index !== -1) {

        // Eliminar la prenda del array
        listaCarrito.splice(index, 1); 
        const arrayString = JSON.stringify(listaCarrito);
        sessionStorage.setItem('listaPrendas', arrayString);
        window.location.reload(); 
    }
}