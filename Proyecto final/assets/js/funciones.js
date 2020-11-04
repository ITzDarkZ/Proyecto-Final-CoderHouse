function agregarCarrito(){
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
                if (seguro) {/*
                    let agrego = false;
                    let indice = carrito.encontrar_compra(adidas1);
                    if (indice !== false){
                        cantidad = adidas1.cantidad_solicitada = Number(value) + adidas1.cantidad_solicitada;
                        agrego = carrito.agregar_compra(adidas1, cantidad);
                        carrito.mostrar();
                    } else {
                        agrego = carrito.agregar_compra(adidas1, Number(value));
                        carrito.mostrar();
                    }
                    if(!agrego) {
                        swal({
                            title: "Error!",
                            text: "Estas solicitando mas unidades de las que estan disponibles!",
                            icon: "error",
                          });
                    } else {*/
                        swal(`Se agregaron ${value} unidades al carrito!`, {
                            icon: "success",
                        });
                    //}

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

