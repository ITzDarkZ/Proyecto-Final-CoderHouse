function agregarCarrito(event){
    swal("Ingrese cantidad de articulos:",
    {
        content: {
            element: "input",
            attributes: {
                placeholder: "Ingrese cantidad deseada",
                type: "number",
                min: "1",
                onkeypress(event){
                    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                        event.preventDefault();
                        const div = document.getElementsByClassName('swal-content');
                        let p = document.createElement('p');
                        p.setAttribute("id", "error-flecha");
                        if(document.getElementById('error-flecha') === null){
                            p.innerHTML = "Ingrese un numero con las flechas por favor";
                            div[0].appendChild(p);
                        }
                    }
                },
            },
        },
    }).then((value) => {
        var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        var mostrar = true
        for(letra of value){
            if (letra.match(format)){
                mostrar = false;
            }
        }
        if (typeof value === typeof '' && value !== '' && mostrar) {
            swal({
                title: "Estas seguro?",
                text: `Quieres agregar ${value} unidades al carrito?`,
                icon: "warning",
                buttons: ["Cancelar", "Si, estoy seguro"],
              }).then((seguro) => {
                if (seguro) {
                    const index = event.target.id;
                    carro.agregarCompra(productos[index], Number(value));
                    swal(`Se agregaron ${value} unidades al carrito!`, {
                        icon: "success",
                    });

                } else {
                    swal("Se cancelo correctamente!");
                }
              });
        } else if (value === '' || !mostrar) {
            swal({
                title: "Error!",
                text: "Se ingreso una cantidad invalida...",
                icon: "error",
                button: false
              });
        }
    });
}

function presionarTeclaCantidad(event){
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        event.preventDefault();
        swal('Error', 'Por favor utilizar las flechas, gracias!', 'error',{
            buttons: [false]
        });
    }
}

function eliminarProducto(event){
    let id = event.target.id.replace('eliminar-producto-', '');
    let producto = null;
    carro.carrito.forEach(element => {
        if (Number(id) === element.id){
            console.log(element)
            producto = element;
        }
    });
    console.log(producto)
    carro.removerCompra(producto);
    setTimeout("location.reload(true);", 1);
}

function completarPago(){
    let productosFormato = '';
    carro.carrito.forEach(element => {
        productosFormato += element.nombre + '\nCantidad: ' + element.cant_pedida + '\nTotal: ' + Math.round(element.cant_pedida * element.precio) + '\n\n';
    });
    swal({
        title: "Estas seguro?",
        text: `Estas seguro de comprar:\n${productosFormato}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if(willDelete) {
            carro.vaciarCarrito();
            swal("Genial, gracias por confiar en nosotros! :D", {
            icon: "success",
          });
          setTimeout("location.reload(true);", 1500);
        } else {
          swal("La compra se cancelo correctamente");
        }
      });
}

function actualizarCantidad(event){
    const idproducto = 'precio-producto-' + event.target.id;
    const cantidad = document.getElementById(event.target.id).value;
    productos[event.target.id].cant_pedida = Number(cantidad);
    const span = document.getElementById(idproducto);
    const precios = span.parentNode;
    precios.removeChild(span);
    span.innerHTML = '$' + Math.round(productos[event.target.id].cant_pedida * productos[event.target.id].precio);
    precios.appendChild(span);
    carro.carrito[event.target.id] = productos[event.target.id];
    localStorage.setItem('Carrito', JSON.stringify(carro.carrito));
    const pagoTotal = document.getElementById('pago-total');
    let total = 0;
    carro.carrito.forEach(element => {
        total += element.precio * element.cant_pedida;
    });
    total = Math.round(total);
    pagoTotal.innerHTML = '$' + total;
}

function mostrarProductoCarrito(producto) {
	let code = `
                <div class="product">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-3 carro-completo">
                            <div class="product-image"><a href="${producto.imagen}" data-lightbox="ropa"><img class="img-fluid d-block mx-auto image" src="${producto.imagen}"></a></div>
                        </div>
                    <div class="col-md-5 product-info">
                        <h6><strong>${producto.nombre}</strong></h6>
                        <div class="product-specs">
                            <div class="precio"><span>Precio unidad:&nbsp;</span><span class="value">$${Math.round(producto.precio)}</span></div>
                            <div class="talle"><span>Talle:&nbsp;</span>
                                <select class='custom-select'>
                                    <optgroup label="Talles">
                                    <option value="11" selected>XS</option>
                                    <option value="12">S</option>
                                    <option value="13">M</option>
                                    <option value="14">L</option>
                                    <option value="14">XL</option>
                                    </optgroup>
                                </select></div>
                            </div>
                        </div>
                        <div class="col-6 col-md-2 col-xl-2 quantity"><label class="d-none d-md-block" for="quantity">Cantidad</label><input type="number" id="${producto.id}" class="form-control quantity-input" onkeypress="presionarTeclaCantidad(event)" onchange="actualizarCantidad(event)" value="${producto.cant_pedida}" min="1">
                        <button id="eliminar-producto-${producto.id}" class="btn btn-primary eliminar" type="button" onclick="eliminarProducto(event)">Eliminar</button></div>
                        <div class="col-6 col-md-2 price"><span id="precio-producto-${producto.id}">$${Math.round(producto.precio * producto.cant_pedida)}</span></div>
                    </div>
                </div>
               `;
	return code;
}

function tituloHTML(){
    let code = `
                <h6><strong class="titulo">Carrito de compras</strong></h6>
                <div class="row no-gutters">
                    <div class="col-md-12 col-lg-8 col-xl-12" id="productos">
                        <div id="items" class="items">
               `
    return code
}

function actualizarSummary(carrito){
    let total = 0;
    carrito.forEach(element => {
        total += element.precio * element.cant_pedida;
    });
    total = Math.round(total)
    let code = `
                <div class="col-md-12 col-lg-4" id="summary">
                    <div class="summary">
                        <div id="formato" class="resumen">
                            <h2 id="titulo">Resumen</h2>
                            <h4><span class="text">Total&nbsp;</span><span id="pago-total" class="price">$${total}</span></h4><button class="btn btn-primary btn-block btn-lg" id="pago" onclick="completarPago()" type="button">Completar el Pago</button>
                        </div>
                    </div>
                </div>
               `;
return code;
}

function cargarProductos(){
    let objetoConProductos = JSON.parse(PRODUCTOS_DATA);
    let producto = objetoConProductos.map(value => {
        return new Producto(value.id, value.nombre, value.precio, value.stock, value.cant_pedida, value.imagen, value.talle);
    });
    return producto
}

const PRODUCTOS_DATA = `[  
    {
        "id": 0,
        "nombre": "Remera Adidas Original Vocal Logo",
        "precio": 3499.99,
        "stock": 30,
        "cant_pedida": 1,
        "imagen": "adidas1.jpg",
        "talle": "XS"
    },
    {
        "id": 1,
        "nombre": "Remera Nike Sportswear",
        "precio": 2499.99,
        "stock": 30,
        "cant_pedida": 1,
        "imagen": "nike1.jpg",
        "talle": "XS"
    },
    {
        "id": 2,
        "nombre": "Remera Adidas Originals Trefoil",
        "precio": 3399.99,
        "stock": 30,
        "cant_pedida": 1,
        "imagen": "adidas2.jpg",
        "talle": "XS"
    }
]`;