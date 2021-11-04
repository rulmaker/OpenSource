


fetch('http://localhost:8080/personas/listar'/* , { mode: 'no-cors' } */)

  .then(response => response.json())
  .then(productos =>
    productos.forEach(el => {

      if (el === null) {
        el = ""
      } else {
        const elemento = {
          "idproducto": el.idproducto,
          "imagen": el.imagen,
          "nombre": el.nombre,
          "precio": el.precio,
          "genero": el.genero,
          "talla": el.talla
        };
        // productoGrid.push(elemento)
        const productList = document.getElementById('productos');
        const element = document.createElement('div');
        element.innerHTML = `
                <div class="">
                  <div class="product">
                    <div class="flip-container">
                      <div class="flipper">
                        <div class="front">
                          <a href="#">
                            <img
                              src="${el.imagen}"
                              alt=""
                              class="img-fluid"
                          />
                          </a>
                        </div>
                        <div class="back">
                          <a href="#"
                            ><img
                              src="${el.imagen}"
                              alt=""
                              class="img-fluid"
                          /></a>
                        </div>
                      </div>
                    </div>
                    <a href="#" class="invisible"
                      ><img src="${el.imagen}" alt="" class="img-fluid"
                    /></a>
                    <div class="text">
                      <h3>
                        <a href="#"
                          >${el.nombre}</a
                        >
                      </h3>
                      <h3>
                        <a href="#"
                          >Talla: ${el.talla}</a
                        >
                      </h3>

                      <p class="price"><del></del>$${el.precio}</p>
                      <div class="buttons">
                        <button id="${el.idproducto}" class="btn btn-primary" name="agregarCarrito"
                          ><i class="fa fa-shopping-cart"></i>Agregar a carrito</button
                        >
                      </div>
                    </div>
                   
                  </div>
                 
                </div>`;
        productList.appendChild(element);

      }
    })


  );








document.getElementById('productos').addEventListener('click', function (e) {
  contar(e.target);
})









//agrega producto al local storage y al carrito
function contar(elemento) {
  //let playeraNum = elemento.id;




  if (elemento.name === "agregarCarrito") {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);



    fetch('http://localhost:8080/personas/listar/' + elemento.id /* , { mode: 'no-cors' } */)

      .then(response => response.json())
      .then(el => {

        const elementoArr = {
          idproducto: el.idproducto,
          imagen: el.imagen,
          nombre: el.nombre,
          precio: el.precio,
          genero: el.genero,
          talla: el.talla,
          inCart: 0
        };

        setItems(elementoArr);
        totalCost(elementoArr);
      })




    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').innerHTML = productNumbers + 1;
    } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').innerHTML = 1;
    }
  }

  onLoadCartNumbers();

}


//funcion para agregar cantidad de elementos de cada producto
function setItems(product) {//solo entra como valor el objeto seleccionado
  let cartItems = localStorage.getItem('productsInCart');//1.- lee todo lo almacenado en localstorage
  cartItems = JSON.parse(cartItems);//2. convierte a objeto
  //console.log(cartItems);

  if (cartItems !== null) {

    if (cartItems[product.idproducto] == undefined) {
      cartItems = {
        ...cartItems,//3.1 si ya hau un objeto, el nombre va a dar undefined, entonces el nuevo elemento se añade a la lista
        [product.idproducto]: product
      }
    }

    cartItems[product.idproducto].inCart += 1;//3. si ya hay un objeto, entonces al valor de in cart se le añade 1
  } else {
    product.inCart = 1;// si no hay nada, se le da el valor de 1
    cartItems = {
      [product.idproducto]: product
    }
  }

  //se agrega un solo objeto a local storage, y cada llave tiene como valor un objeto con los datos de ese objeto

  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}





//funcion calcular precio total
function totalCost(product) {
  let precio = parseInt(product.precio);
  let cartCost = localStorage.getItem('totalCost');


  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + precio)
  } else {
    localStorage.setItem("totalCost", product.precio);
  }


}









