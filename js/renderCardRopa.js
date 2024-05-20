const renderRopa = document.getElementById("renderRopa");

fetch('../db_ropa/db_ropa.json')
        .then(response => response.json())
        .then(contenido => {
            console.log(contenido);
            mostrarProductos(contenido)
        })
        .catch(error => {
            console.error('Error al cargar el archivo:', error);
        });


function mostrarProductos(dbRopa) {
    dbRopa.forEach(prenda => {
        //Creacion de elementos
        // contenedor card
        const div = document.createElement("div");
        div.setAttribute('id', prenda.id);
        div.classList.add('card-ropa');

        //Imagen
        const imgCard =  document.createElement('img');
        imgCard.src = prenda.imagen
        
        //Contenedor de detalles
        const detalleCard = document.createElement("div");
        detalleCard.classList.add('detalle-ropa');

        //Parrafos y boton
        const pTitulo = document.createElement('p');
        pTitulo.classList.add('titulo-producto');
        pTitulo.textContent = prenda.title;

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

