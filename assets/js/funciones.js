function agregarCarrito(event){
    swal("Ingrese cantidad de articulos:",{
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
                    if(productos.length < 1){
                        productos = cargarProductos();
                    }
                    const agrego = carro.agregarCompra(productos[index], Number(value));
                    if(agrego){
                        swal(`Se agregaron ${value} unidades al carrito!`, {
                            icon: "success",
                        });
                    } else {
                        swal({
                            title: "Error!",
                            text: "Se ingreso una cantidad mayor al stock actual...",
                            icon: "error",
                            button: false
                          });
                    }
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
            producto = element;
        }
    });
    carro.removerCompra(producto);
    setTimeout("location.reload(true);", 1);
}

function completarPago(){
    let productosFormato = '';
    let total = 0;
    carro.carrito.forEach(element => {
        productosFormato += element.nombre + '\nCantidad: ' + element.cant_pedida + '\nTotal: ' + Math.round(element.cant_pedida * element.precio) + '\n\n';
        total += Number(element.precio * element.cant_pedida);
    });
    swal({
        title: "Estas seguro?",
        text: `Estas seguro de comprar:\n${productosFormato}\nEl total es: ${Math.round(total)}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if(willDelete) {
            carro.completarCompra();
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
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    let mostrar = true;
    const cantidad = $(`#${event.target.id}`).val();
    for(letra of cantidad){
        if (letra.match(format)){
            mostrar = false;
        }
    }
    if(mostrar){
        const idproducto = 'precio-producto-' + event.target.id;
        const actualizar = productos[event.target.id].actualizarCantidad(Number(cantidad));
        let compraAct = false;
        let producto = null;
        if(actualizar){
            const span = $(`#${idproducto}`);
            const precios = span.parent();
            precios.remove(span);
            span.text('$' + Math.round(productos[event.target.id].cant_pedida * productos[event.target.id].precio));
            precios.append(span);
            carro.carrito.forEach(element => {
                if (Number(event.target.id) === element.id){
                    producto = element;
                }
            });
            compraAct = carro.actualizarCompra(producto, cantidad);
            if(compraAct){
                localStorage.setItem('Carrito', JSON.stringify(carro.carrito));
                const pagoTotal = $('#pago-total');
                let total = 0;
                carro.carrito.forEach(element => {
                    total += element.precio * element.cant_pedida;
                });
                total = Math.round(total);
                pagoTotal.text('$' + total);
            } else {
                swal({
                    title: "Error!",
                    text: "Se produjo un error desconocido al modificar la cantidad de esta compra...",
                    icon: "error",
                    button: false
                  });
            }
        } else {
            swal({
                title: "Error!",
                text: "La cantidad solicitada es mayor al stock disponible...",
                icon: "error",
                button: false
              });
        }
    } else {
        swal({
            title: "Error!",
            text: "Se ingreso una cantidad invalida...",
            icon: "error",
            button: false
          });
    }
    
}

function setTalle(event){
    const idproducto = event.target.id.replace('talle-', '');
    const selected = event.target.selectedOptions[0].innerHTML;
    let producto
    carro.carrito.forEach(element => {
        if (Number(idproducto) === element.id){
            producto = element
        }
    });
    carro.actualizarTalle(producto, selected);
    localStorage.setItem('Carrito', JSON.stringify(carro.carrito));
}

function mostrarProductoCarrito(producto) {
	let code = `
                <div class="product">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-3 carro-completo">
                            <div class="product-image"><a href="assets/img/${producto.imagen}" data-lightbox="ropa"><img class="img-fluid d-block mx-auto image" src="assets/img/${producto.imagen}"></a></div>
                        </div>
                    <div class="col-md-5 product-info">
                        <h6><strong>${producto.nombre}</strong></h6>
                        <div class="product-specs">
                            <div class="precio"><span>Precio unidad:&nbsp;</span><span class="value">$${Math.round(producto.precio)}</span></div>
                            <div class="talle"><span>Talle:&nbsp;</span>
                                <select id="talle-${producto.id}" class='custom-select' onchange="setTalle(event)">
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
                        <div class="col-6 col-md-2 col-xl-2 quantity"><label class="d-none d-md-block" for="quantity">Cantidad</label><input type="number" id="${producto.id}" class="form-control quantity-input" onkeypress="presionarTeclaCantidad(event)" onchange="actualizarCantidad(event)" value="${producto.cant_pedida}" min="1" max="${producto.stock}">
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

function mostrarTienda(producto){
    let code = `
                <div class="col-md-4">
                    <div class="product-inner">
                        <div class="product-wrap" data-lightbox="photos">
                            <a href="assets/img/${producto.imagen}" data-lightbox="ropa"><img class="img-fluid d-block mx-auto image" src="assets/img/${producto.imagen}"/></a>
                            <div class="actions">
                                <a id="${producto.id}" class="add-to-cart" href="#" onclick="agregarCarrito(event)"></a>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${producto.nombre}</h3>
                            <span class="price">$${producto.precio}</span>
                        </div>
                    </div>
                </div>
                `;
    return code;
}


function cargarProductos(){
    let prods = localStorage.getItem('Productos');
    prods = JSON.parse(prods);
    let producto = prods.map(value => {
        return new Producto(value.id, value.nombre, value.precio, value.stock, value.cant_pedida, value.imagen, value.talle);
    });
    return producto
}