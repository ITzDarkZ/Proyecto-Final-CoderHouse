class Producto {
    constructor(nombre, precio, stock, cantidad_solicitada, imagen){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.cantidad_solicitada = cantidad_solicitada;
        this.imagen = imagen;
    }

    comprar(){
        this.stock -= this.cantidad_solicitada;
        this.cantidad_solicitada = 0
    }

    renovar_cantidad(cantidad_solicitada){
        if (cantidad_solicitada > this.stock){
            return false;
        } else {
            this.cantidad_solicitada = cantidad_solicitada;
            return true;
        }
        
    }
}

class Carrito{
    compras = [];
    agregar_compra(producto, cantidad){
        if (producto.renovar_cantidad(cantidad)){
            this.compras.push(producto);
            return true;
        } else {
            return false;
        }
    }
    finalizar_compra(){
        this.compras.forEach(element => { // Hice un forEach porque me resulta mas facil manejarme con este ciclo que con el for
            element.comprar();
        });
        this.compras = [];
    }
    mostrar(){
        if(this.compras.length == 0){
            console.log('El carrito esta vacio');
        } else {
            console.log('---------------INICIO------------------');
            this.compras.forEach(element => {
                console.log(element);
            });
            console.log('----------------FIN--------------------');
        }
    }
    remover_compra(compra){
        this.compras = this.compras.filter(function(value){
            return value !== compra;
        });
    }

    encontrar_compra(producto){
        for (let i = 0; i < this.compras.length; i++){
            if (this.compras[i].nombre === producto.nombre){
                return i;
            }
        }
        return false;
    }
}