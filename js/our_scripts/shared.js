const $login = document.getElementById('form-login');




//inicia carrito con cantidad en locl storage
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').innerHTML = productNumbers;
        document.getElementById('cart').textContent = productNumbers;
    }
}

onLoadCartNumbers();