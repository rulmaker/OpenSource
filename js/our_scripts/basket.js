const items = document.getElementById('items');
const templateItems = document.getElementById('template-item').content;
const footer1 = document.getElementById('footer1');
const footer = document.getElementById('footer');
const tablaTotal = document.getElementById('tabla-total');
const fragment = document.createDocumentFragment();
let carrito = {};





document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('productsInCart')) {
        carrito = JSON.parse(localStorage.getItem('productsInCart'));
        pintarItems();
        pintarCantidad();
    }
})

items.addEventListener('click', e => {
    btnAccion(e);
})



//pintarItems

const pintarItems = () => {
    console.log(carrito);
    items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateItems.querySelector('img').setAttribute("src", producto.imagen);
        templateItems.querySelectorAll('td a')[1].textContent = producto.nombre;
        templateItems.querySelectorAll('span')[0].textContent = producto.inCart;
        templateItems.querySelectorAll('span')[1].textContent = producto.precio;
        templateItems.querySelectorAll('td')[4].textContent = producto.talla;
        templateItems.querySelectorAll('span')[2].textContent = producto.inCart * producto.precio;

        //botones
        templateItems.querySelector('.fa-plus-circle').dataset.id = producto.idproducto;
        templateItems.querySelector('.fa-minus-circle').dataset.id = producto.idproducto;

        const clone = templateItems.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);

    pintarFooter();
    pintarTabla();

    localStorage.setItem('productsInCart', JSON.stringify(carrito));


}


const pintarFooter = () => {




    footer1.innerHTML = '';
    if (Object.keys(carrito).length === 0 || Object.keys(carrito) === null) {
        footer1.innerHTML = `
        <th scope="row" colspan="7" >Carrito vacío - comience a comprar!</th>
        `;
        return

    }

    const nCantidad = Object.values(carrito).reduce((acc, { inCart }) => acc + inCart, 0);
    const nPrecio = Object.values(carrito).reduce((acc, { inCart, precio }) => acc + inCart * precio, 0);

    console.log(nCantidad, nPrecio)







    localStorage.setItem('cartNumbers', nCantidad);
    localStorage.setItem('totalCost', nPrecio);
    pintarCantidad();

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {};
        pintarItems();
        pintarCantidad();
        borrarCantidad();
        pintarTabla();
    })

}

const pintarTabla = () => {
    let subtotal = JSON.parse(localStorage.getItem('totalCost'));

    document.getElementById('subtotal').innerHTML = subtotal;
    document.getElementById('iva').innerHTML = (subtotal * 0.16).toFixed(2);
    document.getElementById('total').innerHTML = (subtotal * 1.16).toFixed(2);

    document.getElementById('footer-total').textContent = subtotal;

}




//inicia carrito con cantidad en locl storage
function pintarCantidad() {
    let productNumbers = localStorage.getItem('cartNumbers');


    /*  if (productNumbers) {
         
     } else {
         
     } */
    if (localStorage.getItem('productsInCart') === '{}') {
        document.querySelector('.cantidad span').innerHTML = "0";
        document.querySelector('.cart span').innerHTML = '';
        document.getElementById('cart').textContent = '';

    } else {
        document.querySelector('.cantidad span').innerHTML = productNumbers;
        document.querySelector('.cart span').innerHTML = productNumbers;
        document.getElementById('cart').textContent = productNumbers;
    }



}

const btnAccion = e => {



    if (e.target.classList.contains('fa-plus-circle')) {
        const producto = carrito[e.target.dataset.id];
        producto.inCart++;
        carrito[e.target.dataset.id] = { ...producto };
        pintarItems();
    }

    if (e.target.classList.contains('fa-minus-circle')) {
        const producto = carrito[e.target.dataset.id];
        producto.inCart--;
        if (producto.inCart === 0) {
            delete carrito[e.target.dataset.id];
        }
        pintarItems();
        pintarCantidad();
        borrarCantidad();
        pintarTabla();
    }


    e.stopPropagation();
}


const borrarCantidad = () => {
    if (localStorage.getItem('productsInCart') === '{}') {
        localStorage.setItem('cartNumbers', '');
        localStorage.setItem('totalCost', 0);
    }
}