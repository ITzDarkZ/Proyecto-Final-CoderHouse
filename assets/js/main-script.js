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

const carrito = new Carrito();

let adidas1 = new Producto('Remera Adidas Original Vocal Logo', 3499.99, 30, 0, 'adidas1.jpg');
let adidas2 = new Producto('REMERA NIKE SPORTSWEAR', 2499.99, 30, 0, 'nike1.jpg');