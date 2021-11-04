let arrayProductos = [];//almacena elementos que seran guardados en localStorage

class Product {
    constructor(name, image, description, talla, price,) {
        this.name = name;
        this.image = image;
        this.description = description;//se guarda en genero DB
        this.talla = talla;
        this.price = price;

    }

}

class UI {


    //crea objeto con datos del producto
    crearItem(product) {
        let item = {
            nombre: product.name,
            imagen: product.image,
            descripcion: product.description,
            talla: product.talla,
            precio: product.price,
            ID: this.newID()

        }

        arrayProductos.push(item);

        return arrayProductos;
    }



    newID() {
        let lastID = localStorage.getItem("lastID") || "-1";
        let newNumberID = JSON.parse(lastID) + 1;
        localStorage.setItem("lastID", JSON.stringify(newNumberID));
        return newNumberID
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        const elemento = element.parentElement.parentElement.parentElement;
        let productos = JSON.parse(localStorage.getItem('productos'));
        let elID = elemento.id;

        if (element.name === 'delete') {
            elemento.remove();


            //eliminar BD
            delete productos[parseInt(elID)]
            arrayProductos = productos;
            guardarDB();
            location.reload();
            /* this.showMessage('Producto borrado exitosamente', 'info'); */
            resetDB();
        }



    }

    agregarProducto(element) {
        const elemento = element.parentElement.parentElement.parentElement;
        let productos = JSON.parse(localStorage.getItem('productos'));
        let elID = elemento.id;
        let producto = productos[parseInt(elID)]

        const data = {
            imagen: producto.imagen,
            nombre: producto.nombre,
            precio: producto.precio,
            genero: producto.descripcion,
            talla: producto.talla

        }

        console.log(productos[parseInt(elID)].nombre)
        console.log(JSON.stringify(data));
        fetch('http://localhost:8080/personas/guardar', {
            //mode: 'no-cors',
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imagen: producto.imagen,
                nombre: producto.nombre,
                precio: producto.precio,
                genero: producto.descripcion,
                talla: producto.talla

            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        elemento.remove();
        //eliminar BD
        delete productos[parseInt(elID)]
        arrayProductos = productos;
        guardarDB();
        location.reload();
        /* this.showMessage('Producto borrado exitosamente', 'info'); */
        resetDB();
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));
        //SHOWING IN DOM
        const container = document.querySelector('.mensaje-contenedor');
        const app = document.querySelector('container');
        container.insertBefore(div, app);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1500);
    }
}





//FUNCTIONS


//resetea localStorage si todos los elementos estan vacios
function resetDB() {
    let comprobarDB = JSON.parse(localStorage.getItem('productos'));

    if (comprobarDB.every(element => element === null)) {
        localStorage.clear();
    }
}

//guarda objeto Item en local storage



const guardarDB = () => {
    localStorage.setItem('productos', JSON.stringify(arrayProductos));

}


//pintar solo el ultimo elemento de DB
const agregarDB = () => {
    let productoNuevo = JSON.parse(localStorage.getItem('productos'));
    let count = 0;
    for (i = 0; i < arrayProductos.length; i++) {
        count = i;

    }

    let lastElement = productoNuevo[count];
    const productList = document.getElementById('list-items');
    const element = document.createElement('div');
    element.innerHTML = `
             <div class="mb-4" id="${lastElement.ID}" >
             <div class="producto">
             <img src="${lastElement.imagen}" class="producto__imagen" alt="imagen">
             <div class="card-body">
             <h5 class="card-title"><strong>Nombre</strong>: ${lastElement.nombre}</h5>
             <p class="card-text"><strong>Descripción</strong>: ${lastElement.descripcion}</p>
             <p><strong>Talla</strong>: ${lastElement.talla}</p>
             <p><strong>Precio</strong>: $${lastElement.precio}</p>
             
             <button class="btn btn-danger" name="delete">Borrar</button>
             <button class="btn btn-primary"  name="prueba">Agregar a Tienda</button>
             
             </div>
             </div>
             </div>`;
    productList.appendChild(element);


}

//Funcion que pinta datos al recargar
const pintarDB = () => {
    arrayProductos = JSON.parse(localStorage.getItem('productos'));

    if (arrayProductos === null) {
        arrayProductos = [];
    } else {
        arrayProductos.forEach(el => {
            if (el === null) {
                el = ""
            } else {
                const productList = document.getElementById('list-items');
                const element = document.createElement('div');
                element.innerHTML = `
                <div class="mb-4" id="${el.ID}" >
                <div class="producto">
                <img src="${el.imagen}" class="producto__imagen" alt="imagen">
                <div class="card-body">
                <h5 class="card-title"><strong>Nombre</strong>: ${el.nombre}</h5>
                <p class="card-text"><strong>Descripción</strong>: ${el.descripcion}</p>
                <p><strong>Talla</strong>: ${el.talla}</p>
                <p><strong>Precio</strong>: $ ${el.precio}</p>
                
                <button class="btn btn-danger" name="delete">Borrar</button>
                <button class="btn btn-primary"  name="prueba">Agregar a tienda</button>
                
                </div>
                </div>
                </div>`;
                productList.appendChild(element);
            }
        })
    }
}


//DOM EVENTS
document.getElementById('product-form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;
    const talla = document.getElementById('talla').value;
    const price = document.getElementById('price').value;


    const product = new Product(name, image, description, talla, price);

    const ui = new UI();

    if (name === "" || price === "" || image === "" || description === "" || talla === "") {
        return ui.showMessage('Complete all fields', 'danger'), e.preventDefault();
    }

    /* ui.addProduct(product); */

    ui.crearItem(product);

    guardarDB();

    agregarDB();

    ui.resetForm();

    ui.showMessage('Product added successfully', 'success');

    e.preventDefault();
});

document.getElementById('list-items').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})

document.getElementById('list-items').addEventListener('click', function (e) {
    const ui = new UI();
    ui.agregarProducto(e.target);
    ui.deleteProduct(e.target);
})

//pintar datos de localStorage al recargar
document.addEventListener('DOMContentLoaded', pintarDB);




