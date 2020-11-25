const carro = new Carrito();
let productos = [];
$.ajax({
   type: "Get",
   url: "assets/js/productos.json",
   dataType: "json",
   success: function(data) {
      localStorage.setItem('Productos', JSON.stringify(data));
      productos = cargarProductos();
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
                  tituloVacio.innerHTML = 'TU CARRITO DE COMPRAS ESTÁ VACÍO VE A LA TIENDA A COMPRAR ALGO!';
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
   },
   error: function(){
       alert("No se encontro el archivo de productos!");
   }
});