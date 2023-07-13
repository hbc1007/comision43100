//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
//FUNCION - CAMBIA COLOR HEADER CUANDO HACE SCROLL
//---------------------------------------------------------------------------------------//
const div = document.querySelector('header > div');
window.addEventListener('scroll', function() {
    div.classList.toggle('abajo', window.scrollY > 0);
});


//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
//CLASE - PRODUCTOS EN CARRITO
//---------------------------------------------------------------------------------------//
class clsProducto {
    constructor(obj) {
        this.quantity = parseFloat(obj.quantity),
        this.name = obj.name,
        this.price = parseFloat(obj.price),
        this.id = obj.id
    }
}


//---------------------------------------------------------------------------------------//
//FUNCION - RENDERIZACION DE PRODUCTOS
//---------------------------------------------------------------------------------------//
function renderizarProductos(objProductos){
    //VACIAMOS EL CONTENEDOR PARA EVITAR DUPLICADOS
    contenedorProductos.innerHTML='';
    //CARGAMOS LAS CARTAS DE LOS PRODUCTOS SOLICITADOS
    for(const itemProducto of objProductos){
        contenedorProductos.innerHTML+=`
        <div class="item">
            <figure>
                <img src="${itemProducto.imagen}" alt="">
            </figure>
            <div class="info-product">
                <p class="name">${itemProducto.nombre}</p>
                <p class="price">${formatearValor(itemProducto.precio,2)}</p>
                <button id="${itemProducto.id}" class="btn-add-cart botonCompra">Añadir al carrito</button>
            </div>
        </div>
        `;
    }

    console.log('GENERAL: Se ha renderizado los productos');
}


//---------------------------------------------------------------------------------------//
//FUNCION - FORMATO NUMEROS
//---------------------------------------------------------------------------------------//
function formatearValor(valor, decimal){
    const formateador = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        maximumFractionDigits: decimal,
    });

    console.log('GENERAL: Se ha usado la función formatearValor');
    return formateador.format(valor);
};


//---------------------------------------------------------------------------------------//
//FUNCION FLECHA - MUESTRA U OCULTA VENTANA DEL CARRITO DE COMPRAS AL DAR CLICK EN LA BOLSA
//---------------------------------------------------------------------------------------//
const botonBolsaCompras = document.querySelector('.container-cart-icon');
const contenedorCartaProductos = document.querySelector('.container-cart-products');

botonBolsaCompras.addEventListener('click', () => {
    contenedorCartaProductos.classList.toggle('hidden-cart');

    console.log('GENERAL: Se ha usado la función flecha botonBolsaCompras');
    vistaHTML();
});


//---------------------------------------------------------------------------------------//
//FUNCION - CANTIDAD TOTAL EN BOLSA DEL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------------//
let cantCarrito = 0;
let contProduct = document.querySelector('#count-products');

function cantidadBolsa(){
    let productos = [];
    const almacenados = JSON.parse(localStorage.getItem('todos-Productos'));
    if (almacenados != null){
        for (const objeto of almacenados)
        //INSERTA EN LA CLASE clsProductos TODO HAY EN EL LOCALSTORAGE
        productos.push(new clsProducto(objeto));
    
        //SUMA LA CANTIDAD DE PRODUCTOS PARA QUE SE MUESTRE EN LA BOLSA
        for (const producto of productos){
            cantCarrito += producto.quantity;
        }
    }

    console.log('GENERAL: Se ha usado la función cantidadBolsa');
}

cantidadBolsa();
contProduct.innerText = cantCarrito;



