const renderRopa = document.getElementById("renderRopa");
const filtrosCheckbox = document.querySelectorAll(".filter-checkbox");
const precioMinimo = document.getElementById("p-min");
const precioMaximo = document.getElementById("p-max");
const btnPrecio = document.getElementById("btn-buscar-precio");


// Renderizado de toda la ropa

fetch('https://gabrieljo.pythonanywhere.com/api/datos')
    .then(response => response.json())
    .then(contenido => {
        mostrarProductos(contenido)
    })


// Funcion para aplicar filtros a la ropa

function aplicarFiltros() {
fetch('https://gabrieljo.pythonanywhere.com/api/datos')
    .then(response => response.json())
    .then(contenido => {
        //Array con objetos filtrados
        const arrayFilter = [];

        contenido.forEach(prenda => {

            //Toma de valores
            const categoriaSeleccionados = Array.from(document.querySelectorAll(".filter-checkbox[name^='categoria-']:checked")).map(checkbox => checkbox.value);
            const tallasSeleccionadas = Array.from(document.querySelectorAll(".filter-checkbox[name^='talle-']:checked")).map(checkbox => checkbox.value);
            const pMinimo = precioMinimo.value === "" ? 0 : parseInt(precioMinimo.value);
            const pMaximo = precioMaximo.value === "" ? 9999 : parseInt(precioMaximo.value);
            
            //Verificacione de condiciones
            const cunpleCondiciones = () => {
                const cumpleGenero = categoriaSeleccionados.length === 0 ? true : categoriaSeleccionados.includes(prenda.ropa_para);
                const cumpleTalla = tallasSeleccionadas.length === 0 ? true : tallasSeleccionadas.some(talla => prenda.talles.includes(talla));
                const cumplePrecio = prenda.precio >= pMinimo && prenda.precio <= pMaximo;
                return (cumpleGenero && cumpleTalla && cumplePrecio)
            }

            if(cunpleCondiciones()) {
                if(prenda.length !== 0) {
                    arrayFilter.push(prenda);
                }
            }
            mostrarProductos(arrayFilter);
        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
    });
}

//  Aplicar evento a todos los checkbox

filtrosCheckbox.forEach(checkbox => {
    checkbox.addEventListener("change", aplicarFiltros);
});

//  Aplicar evento al boton para filtrar por precio

btnPrecio.addEventListener("click", aplicarFiltros)


// Funcion para renderizar los productos

function mostrarProductos(dbRopa) {
    renderRopa.textContent = "";
    dbRopa.forEach(prenda => {
        //Creacion de elementos
        // contenedor card
        const div = document.createElement("div");
        div.classList.add('card');

        //Imagen
        const imgCard =  document.createElement('img');
        imgCard.src = prenda.img
        imgCard.alt = prenda.prenda
        imgCard.classList.add('card-img-top')
        
        //Contenedor de detalles
        const detalleCard = document.createElement("div");
        detalleCard.classList.add('card-body');

        //Parrafos y boton
        const pTitulo = document.createElement('h5');
        pTitulo.classList.add('card-title');
        pTitulo.textContent = prenda.prenda;

        const pPrecio = document.createElement('p');
        pPrecio.classList.add('card-text');
        pPrecio.textContent = '$'+ prenda.precio;
        
        const btnAgregar = document.createElement('button');
        btnAgregar.setAttribute('id', prenda.id);
        btnAgregar.classList.add('btn');
        btnAgregar.classList.add('btn-primary');
        btnAgregar.textContent = 'Agregar';
        btnAgregar.addEventListener('click', (event) => {
            const currentTarget = event.currentTarget.getAttribute("id");
            agregarCarrito(currentTarget)
        })

        //Append
        detalleCard.appendChild(pTitulo)
        detalleCard.appendChild(pPrecio)
        detalleCard.appendChild(btnAgregar)

        div.appendChild(imgCard)
        div.appendChild(detalleCard)

        //Renderizado de elementos
        renderRopa.append(div);
    })
};

//  Funcion para el carrito de compras

function agregarCarrito(id) {
    const listaCarritoString = sessionStorage.getItem('listaPrendas');
    const listaCarrito = listaCarritoString ? JSON.parse(listaCarritoString) : [];
    
    listaCarrito.push(id);
    
    const arrayString = JSON.stringify(listaCarrito);
    sessionStorage.setItem('listaPrendas', arrayString);
}