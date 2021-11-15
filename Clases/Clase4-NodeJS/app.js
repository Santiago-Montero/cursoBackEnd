
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log('numeor random ' + random(1,10000));


const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

console.log(productos.map(producto => producto.nombre).join())


const precioFinal = () =>{
    let precioTotal = 0
    productos.forEach(producto => {
        precioTotal += producto.precio
    })
    console.log('Este es el precio: ' + precioTotal.toFixed(2))
}

const precioMenor = () =>{
    let menorPrecio = productos[0].precio
    let menorNombre = productos[0].nombre
    productos.forEach(producto => {
        if(  menorPrecio > producto.precio ){
            menorPrecio = producto.precio
            menorNombre = producto.nombre
        }
    })
    console.log('Este es el de menor precio: ' + menorNombre + '  sale : ' + menorPrecio.toFixed(2))
}

const precioMayor = () =>{
    let mayorPrecio = productos[0].precio
    let mayorNombre = productos[0].nombre
    productos.forEach(producto => {
        if(  mayorPrecio < producto.precio ){
            mayorPrecio = producto.precio
            mayorNombre = producto.nombre
        }
    })
    console.log('Este es el de menor precio: ' + mayorNombre + '  sale : ' + mayorPrecio.toFixed(2))
}

const promedioFinal = () =>{
    let precioTotal = 0
    let i = 0
    productos.forEach(producto => {
        i++
        precioTotal += producto.precio
    })
    console.log('Este es el promedio: ' + (precioTotal / i).toFixed(2))
}

precioFinal()
promedioFinal()
precioMenor()
precioMayor()