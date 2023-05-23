// ------------------------------------------------------------------//
const div = document.querySelector('header > div');

window.addEventListener('scroll', function() {
    div.classList.toggle('abajo', window.scrollY > 0);
});

// ------------------------------------------------------------------//
const btnCart = document.querySelector('.container-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})