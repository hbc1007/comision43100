// ------------------------------------------------------------------//
const div = document.querySelector('header > div');

window.addEventListener('scroll', function() {
    div.classList.toggle('abajo', window.scrollY > 0);
});

// ------------------------------------------------------------------//
let resultadoTotal;
let resultadoParcial;

function calcularVenta(precio){
    let iva;
    let tot;
    iva = precio * 0.18;
    tot = precio + iva;
    resultadoParcial = tot;
    return resultadoParcial;
}

const btns = document.querySelectorAll('button[id^="button-"]');

btns.forEach((btn) => {
    btn.addEventListener('click', e => {
        resultadoParcial=0;
        switch(e.target.id){
            case 'button-1':
                let nombre1 = "Agenda 2023 Vip Executive";
                let precio1 = 18.98;
                calcularVenta(18.98)
                alert("La "+nombre1+" cuesta "+resultadoParcial);
                break;
            case 'button-2':
                let nombre2 = "Agenda Dgnottas Pocket";
                let precio2 = 3.98;
                calcularVenta(3.98)
                alert("La "+nombre2+" cuesta "+resultadoParcial);
                break;
            case 'button-3':
                let nombre3 = "Agenda Dgnottas Pocket Flores";
                let precio3 = 3.98;
                calcularVenta(3.98)
                alert("La "+nombre3+" cuesta "+resultadoParcial);
                break;
            case 'button-4':
                let nombre4 = "Agenda Dgnottas Pocket Arco Iris";
                let precio4 = 3.98;
                calcularVenta(3.98)
                alert("La "+nombre4+" cuesta "+resultadoParcial);
                break;
            case 'button-5':
                let nombre5 = "Agenda 2023 Gaelle Escritorio Diaria";
                let precio5 = 21.98;
                calcularVenta(21.98)
                alert("La "+nombre5+" cuesta "+resultadoParcial);
                break;
            case 'button-6':
                let nombre6 = "Agenda 2023 Hecha Pa Ser Libre";
                let precio6 = 13.98;
                calcularVenta(13.98)
                alert("La "+nombre6+" cuesta "+resultadoParcial);
                break;
            default:
                console.log('Producto sin stock');
                break;
        }
    });
});



