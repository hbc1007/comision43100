let filaProductos = document.querySelector('.row-product');
let valorTotal = document.querySelector('.total-pagar');
let cartEmpty = document.querySelector('.cart-empty');
let cartTotal = document.querySelector('.cart-total');


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

        console.log('LOGICA1: Se ha usado la función flecha filaProductos');
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

    console.log('LOGICA1: Se ha usado la función flecha vistaHTML');
}
