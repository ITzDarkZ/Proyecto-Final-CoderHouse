class Producto {
    constructor(id, nombre, precio, stock, cant_pedida, imagen, talle){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.cant_pedida = cant_pedida;
        this.talle = talle;
    }

    actualizarCantidad(cant_nueva){
        if(cant_nueva > this.stock){
            return false;
        } else {
            this.cant_pedida = cant_nueva;
            return true;
        }
    }

    comprar(){
        this.stock -= this.cant_pedida;
        this.cant_pedida = 0;
    }
}

class Carrito{
    constructor(){
        const infoCarrito = localStorage.getItem('Carrito');
        if (infoCarrito){
            this.carrito = JSON.parse(infoCarrito);
            this.carrito = this.carrito.map(element => {
                return new Producto(element.id, element.nombre, element.precio, element.stock, element.cant_pedida, element.imagen, element.talle);
            });
        } else {
            this.carrito = [];
        }
    }
    agregarCompra(producto, cantidad=1){
        let actualizo = false;
        if (this.carrito.length > 0){
            const encontro = this.carrito.find(element => {
                return producto.id === element.id;
            });
            if (encontro === undefined){
                actualizo = producto.actualizarCantidad(cantidad);
                if(actualizo){
                    this.carrito.push(producto);
                    localStorage.setItem('Carrito', JSON.stringify(this.carrito));
                    return true;
                } else {
                    return false;
                }
            } else {
                this.carrito.find(element => {
                    if (element.id === encontro.id){
                        actualizo = element.actualizarCantidad(element.cant_pedida + cantidad);
                    };
                });
                if(actualizo){
                    localStorage.setItem('Carrito', JSON.stringify(this.carrito));
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            actualizo = producto.actualizarCantidad(cantidad);
            if(actualizo){
                this.carrito.push(producto);
                localStorage.setItem('Carrito', JSON.stringify(this.carrito));
                return true;
            } else {
                return false;
            }
        }
    }
    removerCompra(producto){
        this.carrito = this.carrito.filter(element => {
            return element.id !== producto.id;
        });
        localStorage.setItem('Carrito', JSON.stringify(this.carrito));
    }
    mostrarCarrito(){
        if(this.carrito.length > 0){
            console.log('Productos en el carrito: \n');
            this.carrito.forEach(element => {
                console.log(' Nombre: ', element.nombre, '\n', 'Precio: ', element.precio, '\n', 'Cantidad: ', element.cant_pedida);
            });
            console.log('----------------------------------------------');
        } else {
            console.log('El carrito esta vacio');
        }
        
    }
    vaciarCarrito(){
        this.carrito = []
        localStorage.setItem('Carrito', JSON.stringify(this.carrito));
    }
    actualizarCompra(producto, cant_nueva){
        let actualizo = false;
        const encontro = this.carrito.find(element => {
            return producto.id === element.id;
        });
        if(encontro !== undefined){
            this.carrito.find(element => {
                if (element.id === encontro.id){
                    actualizo = element.actualizarCantidad(cant_nueva);
                };
            });
            if(actualizo){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    completarCompra(){
        this.carrito.forEach(element => {
            element.comprar();
        });
        this.vaciarCarrito();
    }
}