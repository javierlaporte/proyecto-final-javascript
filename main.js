
class Canciones {
   constructor (id,nombreartista,cancion,precio,img){
    this.id = id;
    this.nombreartista = nombreartista;
    this.cancion= cancion;
    this.precio= precio;
    this.img= img;
    }
}
//array paso parametros//
const tracks = [

    trackuno= new Canciones (1,"Javier Laporte","Deep Fall",1.29,"img/baltimo.jpg"),
    trackdos= new Canciones (2,"Juan Deminicis","Lighting",1.29, "img/salazar.jpg"),
    tracktres= new Canciones (3,"Alex Orion","Particles",1.29, "img/sunprogress.jpg"),

 ]

//cards recorriendo el array con los objetos del dom //
const carrito = [];
function displayCards () {

    let cardsCanciones = document.getElementById ('cards')
    tracks.forEach((productosCanciones) => {
        cardsCanciones.innerHTML += `
        <div id="cards">
            <div id="imgbox">
                <img src="${productosCanciones.img}" alt= "producto" id="mouse">
            </div>
        
             <div id="contenedorbox">
             <h3>Canciones ${productosCanciones.nombreartista}</h3>
             <h2 class="price"> $${productosCanciones.precio} </h3>
             <button onclick= "guardarEnCarrito (${productosCanciones.id})" class="buy"> Añadir al carrito </button>
       
             </div>
        </div>`
    }
        
    )
}
displayCards();


function guardarEnCarrito (productoId) {


let item = tracks.find ((producto) => producto.id === productoId)
carrito.push(item)     
console.log(carrito);
renderCarrito()
calcularTotal()
actualizarProductosStorage()
consultarjson()
                                          
}
//carrito de compras//
const contenedorCarrito = document.querySelector ('#contenedorcarrito')

const renderCarrito = () => {
contenedorCarrito.innerHTML = ''
carrito.forEach ((item) => {
let div = document.createElement('div')
div.innerHTML = `

<div id='card2' >
<div id='imgbox2'>
<img src=${item.img} alt="" >
</div>

</div>

<p>${item.nombreartista} </p>
<p>Precio: ${item.precio} </p>  

<button onclick= "eliminarItem (${item.id})" class="buy"> Eliminar del carrito </button>
`

contenedorCarrito.append(div)

    } 
)

}

//para el boton eliminar del carrito linkeado en el button//
const eliminarItem = (id) => {

    let borrar = carrito.find((producto) => producto.id === id)
    let indice = carrito.indexOf (borrar)
    carrito.splice (indice,1)
    renderCarrito()
    calcularTotal()
    actualizarProductosStorage()
    consultarjson()

}
//calcular total y mostrar //
const divPrecio = document.querySelector('#precioTotal')
calcularTotal= () => {

let contador = 0 
carrito.forEach((pre) => {

    contador += pre.precio
})
divPrecio.innerHTML = contador
}

//LOCAL STORAGE Y JSON//

function obtenerproductosLS (){

    return JSON.parse(localStorage.getItem("productos"))
}

function actualizarProductosStorage (){
let productosJson = JSON.stringify (tracks)  
localStorage.setItem("productos", productosJson)

}

//FETCH//

function consultarjson (){

    fetch ("./productos.json")
    .then ((response) => response.json())
    .then((data)=> console.log (data))
}




