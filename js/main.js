// ------------------------------------------------------------------//
const div = document.querySelector('header > div');

window.addEventListener('scroll', function() {
    div.classList.toggle('abajo', window.scrollY > 0);
});

// ------------------------------------------------------------------//
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// ------------------------------------------------------------------//
const carInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

//LISTA DE TODOS LOS CONTENEDORES DE PRODUCTOS
const productList = document.querySelector('.container-items');

//VARIABLE DE ARREGLO DE PRODUCTOS
let allProducts = [];
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        //SOME, RECORRE TODOS LOS OBJETOS
        const exists = allProducts.some(product => product.title === infoProduct.title)

        if (exists){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++; //SUMA
                    return product;
                }
                else{
                    return product;
                }
            });

            allProducts = [...products];
        }
        else{
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
    }
})

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );

        showHTML();
    }
});

//FUNCION PARA MOSTRAR HTML
const showHTML = () =>{
    if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

    //LIMPIAR HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <img src="../assets/img/Equis.png" alt="Equis" class="icon-close">
        `;

        rowProduct.append(containerProduct);

        total = total + parseFloat(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    })

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
}

