const renderRopa = document.getElementById("renderRopa");
const filtrosCheckbox = document.querySelectorAll(".filter-checkbox");
const precioMinimo = document.getElementById("p-min");
const precioMaximo = document.getElementById("p-max");
const btnPrecio = document.getElementById("btn-buscar-precio");

fetch('https://gabrieljo.pythonanywhere.com/api/datos')
    .then(response => response.json())
    .then(contenido => {
        mostrarProductos(contenido)
    })

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
                const cumpleGenero = categoriaSeleccionados.length === 0 ? true : categoriaSeleccionados.includes(prenda.para);
                const cumpleTalla = tallasSeleccionadas.length === 0 ? true : tallasSeleccionadas.some(talla => prenda.talle.includes(talla));
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

filtrosCheckbox.forEach(checkbox => {
    checkbox.addEventListener("change", aplicarFiltros);
});

btnPrecio.addEventListener("click", aplicarFiltros)

function mostrarProductos(dbRopa) {
    renderRopa.textContent = "";
    dbRopa.forEach(prenda => {
        //Creacion de elementos
        // contenedor card
        const div = document.createElement("div");
        div.setAttribute('id', prenda.id);
        div.classList.add('card-ropa');

        //Imagen
        const imgCard =  document.createElement('img');
        imgCard.src = prenda.img
        imgCard.alt = prenda.prenda
        
        //Contenedor de detalles
        const detalleCard = document.createElement("div");
        detalleCard.classList.add('detalle-ropa');

        //Parrafos y boton
        const pTitulo = document.createElement('p');
        pTitulo.classList.add('titulo-producto');
        pTitulo.textContent = prenda.prenda;

        const pPrecio = document.createElement('p');
        pPrecio.classList.add('precio-producto');
        pPrecio.textContent = '$'+ prenda.precio;
        
        const btnAgregar = document.createElement('button');
        btnAgregar.classList.add('btn-agregar-producto');
        btnAgregar.textContent = 'Agregar';

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