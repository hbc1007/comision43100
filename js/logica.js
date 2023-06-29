//----------------------------------------------------------------------------//
//RENDERIZACION DE PRODUCTOS
//----------------------------------------------------------------------------//
let contenedorProductos = document.getElementById('listaProductos');

function renderizarProductos(objProductos){
    //VACIAMOS EL CONTENEDOR PARA EVITAR DUPLICADOS
    contenedorProductos.innerHTML='';
    //CARGAMOS LAS CARTAS DE LOS PRODUCTOS SOLICITADOS
    for(const itemProducto of objProductos){
        contenedorProductos.innerHTML+=`
        <div class="item">
            <figure>
                <img src=${itemProducto.imagen} alt="Agendas">
            </figure>
            <div class="info-product">
                <p class="descrip">${itemProducto.nombre}</p>
                <p class="price">${formatearValor(itemProducto.precio,2)}</p>
                <button id=${itemProducto.id} class="btn-add-cart botonCompra">Añadir al carrito</button>
            </div>
        </div>
        `;
    }

    //CAMBIA EL COLOR DEL BOTON AL MOMENTO DE POSICIONARSE
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

renderizarProductos(productos);

//----------------------------------------------------------------------------//
//FUNCION FORMATO NUMEROS
//----------------------------------------------------------------------------//
function formatearValor(valor, decimal){
    const formateador = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        maximumFractionDigits: decimal,
    });

    return formateador.format(valor);
};

//---------------------------------------------------------------------------------//
//MUESTRA U OCULTA AL DAR CLICK EN LA VENTANA RESUMEN DEL CARRITO DE COMPRAS
//---------------------------------------------------------------------------------//
const botonBolsaCompras = document.querySelector('.container-cart-icon');
const contenedorCartaProductos = document.querySelector('.container-cart-products');

botonBolsaCompras.addEventListener('click', () => {
    contenedorCartaProductos.classList.toggle('hidden-cart');
});

//--------------------------------------------------------------------------------//
//VARIABLES - QUERY SELECTOR
//--------------------------------------------------------------------------------//
let todosProductos = [];
const cartaInfo = document.querySelector('.cart-product');
const filaProductos = document.querySelector('.row-product');
const listaProductos = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const contProduct = document.querySelector('#count-products');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');


listaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement;

        const infoProducto = {
            quantity: 1,
            title: product.querySelector('.descrip').textContent,
            price: product.querySelector('.price').textContent,
        };

        //SOME, RECORRE TODOS LOS OBJETOS
        const exists = todosProductos.some(product => product.title === infoProducto.title)

        if (exists){
            const products = todosProductos.map(product => {
                if(product.title === infoProducto.title){
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

        showHTML();
    }
})

filaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('.titl-prod-cart').textContent;

        todosProductos = todosProductos.filter(
            product => product.title !== title
        );

        showHTML();
    }
});

//FUNCION PARA MOSTRAR HTML
const showHTML = () =>{
    if (!todosProductos.length) {
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
    let totalOfProducts = 0;

    todosProductos.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <p class="cant-prod-cart">${product.quantity}</p>
                <p class="titl-prod-cart">${product.title}</p>
                <p class="prec-prod-cart">${product.price}</p>
            </div>
            <img class="icon-close" src="../assets/img/Equis.png" alt="Equis">
            `;

        filaProductos.append(containerProduct);

        total = total + parseFloat(product.quantity * product.price.slice(3));
        totalOfProducts = totalOfProducts + product.quantity;
    })

    let valorFormat = formatearValor(`${total}`, 2);
    valorTotal.innerText = valorFormat;
    contProduct.innerText = totalOfProducts;
}