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


let todosProductos = [];
let cantCarrito = 0;
let contenedorProductos = document.getElementById('listaProductos');
let cartaInfo = document.querySelector('.cart-product');
let filaProductos = document.querySelector('.row-product');
let listaProductos = document.querySelector('.container-items');
let listaBolsa = document.querySelector('.container-cart-icon');
let valorTotal = document.querySelector('.total-pagar');
let contProduct = document.querySelector('#count-products');
let cartEmpty = document.querySelector('.cart-empty');
let cartTotal = document.querySelector('.cart-total');


//---------------------------------------------------------------------------------------//
//FUNCION - CANTIDAD TOTAL EN BOLSA DEL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------------//
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
                <img src="${itemProducto.imagen}" alt="Agendas">
            </figure>
            <div class="info-product">
                <p class="name">${itemProducto.nombre}</p>
                <p class="price">${formatearValor(itemProducto.precio,2)}</p>
                <button id="${itemProducto.id}" class="btn-add-cart botonCompra">Añadir al carrito</button>
            </div>
        </div>
        `;
    }
}


//---------------------------------------------------------------------------------------//
//FUNCION - CAMBIA EL COLOR DEL BOTON AL MOMENTO DE POSICIONARSE
//---------------------------------------------------------------------------------------//
function cambiarColorBotones () {
    let botones = document.getElementsByClassName('btn-add-cart');
    for (const boton of botones){
        boton.onmouseover = () => {
            boton.classList.replace('botonCompra','botonColor');
        }
        boton.onmouseout = () => {
            boton.classList.replace('botonColor','botonCompra');
        }
    }
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
    return formateador.format(valor);
};




//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//
renderizarProductos(productos);
cambiarColorBotones();
cantidadBolsa();
contProduct.innerText = cantCarrito;


//---------------------------------------------------------------------------------------//
//FUNCION FLECHA - MUESTRA U OCULTA VENTANA DEL CARRITO DE COMPRAS AL DAR CLICK EN LA BOLSA
//---------------------------------------------------------------------------------------//
const botonBolsaCompras = document.querySelector('.container-cart-icon');
const contenedorCartaProductos = document.querySelector('.container-cart-products');

botonBolsaCompras.addEventListener('click', () => {
    contenedorCartaProductos.classList.toggle('hidden-cart');
    vistaHTML();
});


//---------------------------------------------------------------------------------------//
//FUNCION FLECHA - CARGA INCIAL DEL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------------//
// listaBolsa.addEventListener('click', e => {
//     if (e.target.classList.contains('icon-cart')){
//         console.log("click en la bolsa del carrito")
//         vistaHTML();
//     }
// })


//---------------------------------------------------------------------------------------//
//FUNCION FECHA - INSERTA LA LINEA DEL PRODUCTO AL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------------//
listaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')){
        let recoveredData = localStorage.getItem('todos-Productos')
        if (recoveredData != null){
            todosProductos = JSON.parse(recoveredData);
        }

        const product = e.target.parentElement;

        const infoProducto = {
            quantity: 1,
            name: product.querySelector('.name').textContent,
            price: product.querySelector('.price').textContent,
            id: product.querySelector('button').getAttribute('id'),
        };

        //METODO SOME, BUSCA EL PRIMER ELEMENTO ENCONTRADO Y DEVUELVE TRUE O FALSE
        const exists = todosProductos.some(product => product.id === infoProducto.id)

        //
        if (exists){
            //ACTUALIZACION DE LA CANTIDAD POR PRODUCTO
            const products = todosProductos.map(product => {
                if(product.id === infoProducto.id){
                    product.quantity++; //SUMA
                    return product;
                }
                else{
                    return product;
                }
            });

            todosProductos = [...products];
        }
        else
        {
            todosProductos = [...todosProductos, infoProducto];
        }

        //AGREGA DATOS DEL CARRITO DE COMPRAS EN EL LOCAL STORAGE
        localStorage.setItem("todos-Productos", JSON.stringify(todosProductos));
        vistaHTML();
    }
})


//---------------------------------------------------------------------------------------//
//FUNCION FECHA - ACTUALIZA LA LINEA DEL PRODUCTO AGREGADO AL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------------//
filaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const idPro = product.querySelector('.codi-prod-cart').textContent;
         //RECUPERA DATOS DEL LOCAL STORAGE
        todosProductos = JSON.parse(localStorage.getItem("todos-Productos"));
        todosProductos = todosProductos.filter(product => product.id !== idPro);
        //GUARDA EN EL LOCAL STORAGE
        localStorage.setItem("todos-Productos", JSON.stringify(todosProductos));
        vistaHTML();
    }
});


//---------------------------------------------------------------------------------------//
//FUNCION FLECHA - MUESTRA LOS PRODUCTOS EN LA VENTANA DEL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------------//
const vistaHTML = () =>{
    //RECUPERA DATOS DEL LOCAL STORAGE
    const productosEnCarrito = JSON.parse(localStorage.getItem("todos-Productos"));

    if (!productosEnCarrito.length) {
		cartEmpty.classList.remove('hidden');
		filaProductos.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		filaProductos.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

    //LIMPIAR HTML
    filaProductos.innerHTML = '';

    let total = 0;
    let totalOfProductos = 0;

    productosEnCarrito.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <p class="cant-prod-cart">${product.quantity}</p>
                <p class="titl-prod-cart">${product.name}</p>
                <p class="prec-prod-cart">${product.price}</p>
                <p class="codi-prod-cart">${product.id}</p>
            </div>
            <img class="icon-close" src="../assets/img/Equis.png" alt="Equis">
            `;

        filaProductos.append(containerProduct);

        total = total + parseFloat(product.quantity * product.price.slice(3));
        totalOfProductos = totalOfProductos + product.quantity;
    })

    let valorFormat = formatearValor(`${total}`, 2);
    valorTotal.innerText = valorFormat;
    contProduct.innerText = totalOfProductos;
}