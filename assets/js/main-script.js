/*
TODO
1) Carrito completamente funcional y mostrandose en la pagina "Carrito"
2) Calculo de precio sin ofertas y avisar al usuario cuanto esta ahorrando con esa oferta
3) Carrito que no se borre mientras no cierre la pestaña o quite los productos del mismo
4) Sistema de login para clientes y ofertas para los mismos (En duda)
5) Al completar el pago un visualizador para elegir si va a ser en cuotas y cuantas 
   con interes o sin dependiendo del banco y cuanto va a ser cada cuota mas el precio final
6) Pagina "Tienda" completamente funcional con filtros por tipo de prenda, sexo, talle y precios (desde y hasta)
   Ejemplo: elegir prendas desde 0 a 1700 pesos, o desde 1800 a 4000 pesos
*/
const carro = new Carrito();
const productos = cargarProductos();

$(document).ready(
   function(){
      const tiendahtml = document.getElementById('main-productos');
      const carritohtml = document.getElementById('carrito');
      if(carritohtml !== null){
         carritohtml.removeChild(document.getElementById('carrito_compras'));
         carritohtml.removeChild(document.getElementById('carrito_vacio'));
         const summary = document.getElementById('summary');
         carritohtml.removeChild(summary);
         if(carro.carrito.length > 0){
            const titulo = document.createElement('div');
            titulo.id = 'carrito_compras';
            titulo.className = 'content';
            titulo.innerHTML = tituloHTML();
            carritohtml.appendChild(titulo);
            const padre = document.getElementById('items');
            carro.carrito.forEach(element => {
               let plantilla = mostrarProductoCarrito(element);
               padre.innerHTML += plantilla;
            });
            titulo.appendChild(padre);
            summary.innerHTML = actualizarSummary(carro.carrito);
            carritohtml.appendChild(summary)
         } else {
            tituloVacio = document.createElement('h1');
            tituloVacio.id = "carrito_vacio";
            tituloVacio.innerHTML = 'TU CARRITO DE COMPRAS ESTÁ VACIÓ VE A LA TIENDA A COMPRAR ALGO!';
            carritohtml.appendChild(tituloVacio);
         }
      } else if (tiendahtml !== null) {
         let remover = $(".col-md-4");
         for(let i = 0; i < remover.length; i++){
            tiendahtml.removeChild(remover[i]);
         }
         productos.forEach(element => {
            let plantilla = mostrarTienda(element);
            tiendahtml.innerHTML += plantilla;
         });
      }
   }
);

