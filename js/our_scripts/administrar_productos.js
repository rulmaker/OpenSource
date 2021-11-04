const $form = document.getElementById('formulario');
const playera = [];


fetch('http://localhost:8080/personas/listar'/* , { mode: 'no-cors' } */)

    .then(response => response.json())
    .then(productos =>
        productos.forEach(el => {
            if (el === null) {
                el = ""
            } else {
                const productList = document.getElementById('tabla');
                const element = document.createElement('tr');
                element.innerHTML = `
                <tr>
                <td>${el.idproducto}</td>
                <td><img src="${el.imagen}" class="imagen"></td>
                <td>${el.nombre}</td>
                <td>${el.genero}</td>
                <td>$ ${el.precio}</td>
                <td>${el.talla}</td>
                <td><button id="${el.idproducto}" class="btn btn-danger"
                name="eliminar">Eliminar</button>
                </td>
                <td>
                <button id="${el.idproducto}" type="button" class="btn btn-primary"
                data-toggle="modal" data-target="#exampleModalCenter" name="editar">Editar</button>
                </td>
                </tr>
              `;
                productList.appendChild(element);
            }
        })


    );


//DELETE fetch

function borrar(elemento) {
    const fila = elemento.parentElement.parentElement;

    if (elemento.name === 'eliminar') {

        document.getElementById("tabla").deleteRow(fila.rowIndex);
        fetch('http://localhost:8080/personas/eliminar/' + elemento.id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => console.log(res))
        console.log(elemento.id)
    }


}



function mostrar(elemento) {
    if (elemento.name === 'editar') {

        fetch('http://localhost:8080/personas/listar/' + elemento.id /* , { mode: 'no-cors' } */)

            .then(response => response.json())
            .then(el => {

                const elemento = {
                    "idproducto": el.idproducto,
                    "imagen": el.imagen,
                    "nombre": el.nombre,
                    "precio": el.precio,
                    "genero": el.genero,
                    "talla": el.talla
                };
                if (el === null) {
                    el = ""
                } else {
                    const productList = document.getElementById('tablaModal');
                    const element = document.createElement('tr');
                    element.innerHTML = `
                <tr>
                <td>${el.idproducto}</td>
                <td><img src="${el.imagen}" class="imagen"></td>
                <td>${el.nombre}</td>
                <td>${el.genero}</td>
                <td>$ ${el.precio}</td>
                <td>${el.talla}</td>
               
                </tr>
              `;
                    productList.appendChild(element);
                    playera.push(elemento);
                }
            })

        // console.log(playera)

    }
}


function borrarFila() {
    document.getElementById('tablaModal').deleteRow(1);
    playera.length = 0;
}






document.getElementById('tabla').addEventListener('click', function (e) {
    borrar(e.target);
    mostrar(e.target);
})






$form.addEventListener('submit', e => {
    let imagen = document.getElementById('imagen').value;
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let descripcion = document.getElementById('descripcion').value;
    let talla = document.getElementById('talla').value;
    let imagenP, nombreP, precioP, generoP, tallaP;
    const producto = playera;
    console.log(producto)

    if (imagen === "" && nombre === "" && precio === "" && descripcion === "" && talla === "") return alert("Todos los espacios están vacíos");

    if (imagen === "") {
        imagenP = producto[0].imagen;
    } else {
        imagenP = imagen;
    }

    if (nombre === "") {
        nombreP = producto[0].nombre;
    } else {
        nombreP = nombre;
    }

    if (precio === "") {
        precioP = producto[0].precio;
    } else {
        precioP = precio;
    }

    if (descripcion === "") {
        generoP = producto[0].genero;
    } else {
        generoP = descripcion;
    }

    if (talla === "") {
        tallaP = producto[0].talla;
    } else {
        tallaP = talla;
    }




    const data = {
        idproducto: producto[0].idproducto,
        imagen: imagenP,
        nombre: nombreP,
        precio: precioP,
        genero: generoP,
        talla: tallaP

    }
    e.preventDefault();
    //console.log(data);

    fetch('http://localhost:8080/personas/actualizar', {
        // mode: 'no-cors',
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    $form.reset();
})

