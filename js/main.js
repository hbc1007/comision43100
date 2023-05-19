// ------------------------------------------------------------------//
const div = document.querySelector('header > div');

window.addEventListener('scroll', function() {
    div.classList.toggle('abajo', window.scrollY > 0);
});

// ------------------------------------------------------------------//
//VARIABLES
let IGV = 0.18
let totalIGVparcial;
let totalVTAparcial;
let totalIGVtotal;
let totalVTAtotal;

//CLASE
class Producto{
    constructor(item, producto, precio, moneda, dscto){
        this.item = item;
        this.producto = producto;
        this.precio = precio;
        this.moneda = moneda;
        this.dscto = dscto;
    }
    //METODO
    calcularPrecio(){
        totalIGVparcial = this.precio * IGV;
        totalVTAparcial = this.precio + totalIGVparcial;
        totalVTAparcial = totalVTAparcial - (totalVTAparcial * (this.dscto / 100));
        alert('El precio neto venta del producto ' +this.producto+ ' es ' +totalVTAparcial+ ' '+this.moneda);
    }
}

const buttons = document.querySelectorAll('button[id^="button-"]');

buttons.forEach((btn) => {
    btn.addEventListener('click', e => {
        resultadoParcial=0;
        if(e.target.id == 'button-1'){
            const producto1 = new Producto(1, 'Agenda 2023 Vip Executive', 18.98, 'Soles', 15);
            producto1.calcularPrecio();
        }
        else if(e.target.id == 'button-2'){
            const producto2 = new Producto(2, 'Agenda Dgnottas Pocket', 3.98, 'Soles', 5);
            producto2.calcularPrecio();
        }
        else if(e.target.id == 'button-3'){
            const producto3 = new Producto(3, 'Agenda Dgnottas Pocket Flores', 3.98, 'Soles', 5);
            producto3.calcularPrecio();
        }
        else if(e.target.id == 'button-4'){
            const producto4 = new Producto(4, 'Agenda Dgnottas Pocket Arco Iris', 3.98, 'Soles', 5);
            producto4.calcularPrecio();
        }
        else if(e.target.id == 'button-5'){
            const producto5 = new Producto(5, 'Agenda 2023 Gaelle Escritorio Diaria', 21.98, 'Soles', 25);
            producto5.calcularPrecio();
        }
        else if(e.target.id == 'button-6'){
            const producto6 = new Producto(6, 'Agenda 2023 Hecha Pa Ser Libre', 13.98, 'Soles', 10);
            producto6.calcularPrecio();
        }
    });
});



