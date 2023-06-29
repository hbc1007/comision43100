//------------------------------------------------------------------------------//
const div = document.querySelector('header > div');

window.addEventListener('scroll', function() {
    div.classList.toggle('abajo', window.scrollY > 0);
});
//------------------------------------------------------------------------------//