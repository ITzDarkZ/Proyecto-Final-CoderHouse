class Producto {
    constructor(nombre, precio, stock, cant_pedida, imagen, talle){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.cant_pedida = cant_pedida;
        this.talle = talle;
    }
}

class Carrito{
    constructor(){
        const infoCarrito = localStorage.getItem('Carrito');
        if (infoCarrito){
            this.carrito = JSON.parse(infoCarrito);
            this.carrito = this.carrito.map(element => {
                return new Producto(element.nombre, element.precio, element.stock, element.cant_pedida, element.imagen);
            });
        } else {
            this.carrito = [];
        }
    }
    agregarCompra(producto, cantidad=1){
        if (this.carrito.length > 0){
            const encontro = this.carrito.find(element => {
                return producto.nombre === element.nombre;
            });
            if (encontro === undefined){
                producto.cant_pedida = cantidad;
                this.carrito.push(producto);
                localStorage.setItem('Carrito', JSON.stringify(this.carrito));
            } else {
                this.carrito.find(element => {
                    if (element.nombre === encontro.nombre){
                        element.cant_pedida += cantidad;
                    };
                });
                localStorage.setItem('Carrito', JSON.stringify(this.carrito));
            }
        } else {
            producto.cant_pedida = cantidad;
            this.carrito.push(producto);
            localStorage.setItem('Carrito', JSON.stringify(this.carrito));
        }
    }
    removerCompra(producto){
        this.carrito = this.carrito.map(element => {
            return element.nombre !== producto.nombre;
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
}