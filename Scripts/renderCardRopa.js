const renderRopa = document.getElementById("renderRopa");

const infoRopaHombre = [
    {
        id: 0,
        imagen: "Imagenes/Remeras/RemeraAdolescente/Hombre/Remera-azul-new-york.jpg",
        title: "New York",
        color: "Gama Azul",
        precio: 999,
        talle: ["M", "L", "XL"],
        para: "hombre"
    },
    {
        id: 1,
        imagen: "Imagenes/Remeras/RemeraAdolescente/Hombre/Remera-thor.jpg",
        title: "Thor",
        color: "Negra",
        precio: 999,
        talle: ["M", "L", "XL", "XXL"],
        para: "hombre"
    }
]

const infoRopaAdolecente = []

const infoRopaMujer = []

function mostrarProductos() {
    infoRopaHombre.forEach(prenda => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card-ropa" id=${prenda.id}>
            <img src=${prenda.imagen}>
            <div class="detalle-ropa">
                <p class="titulo-producto">${prenda.title}</p>
                <p class="precio-producto">$ ${prenda.precio}</p>
                <button class="btn-agregar-producto">Agregar</button>
            </div>
        </div>
        `;
        renderRopa.append(div);

    })
};

mostrarProductos()


/*
        <div class="card-ropa">
            <img src="Imagenes/Remeras/Remera Adolescente/Hombre/Remera-Argentina.webp" alt="Remera de Argentina">
            <div class="detalle-ropa">
                <p class="titulo-producto">Remera Argentina</p>
                <p class="precio-producto">$ 999</p>
                <button class="btn-agregar-producto">Agregar</button>
            </div>
        </div>
*/