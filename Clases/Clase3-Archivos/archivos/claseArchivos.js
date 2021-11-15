// archivos
const fs = require('fs') // importamos libreria

// sincronico 

// leo el archivo
const data = fs.readFileSync('archivo.txt', 'utf-8');
console.log(data)

// creo un archivo y escribio 
fs.writeFileSync('archivo_dos.txt', 'Boca yo te amo'); 

// agrego cosas al archivo
fs.appendFileSync('archivo_dos.txt', '\nRiver yo te amo') 

//borro archivo
// fs.unlinkSync('archivo_dos.txt')


// intenta leer el archivo y sino lo encuentra tira un error
// try {
//     fs.readFileSync('archivo9.txt')
// }catch(err) {
// console.log(err + ' no se encontro')
// }


// desafio 
let time = new Date();


fs.writeFileSync('fyh.txt', time.toLocaleDateString()); 

try {
    const data2 = fs.readFileSync('fyh.txt')
    console.log(data2)
}catch(err) {
console.log(err + ' no se encontro')
}


// Guardar datos JSON
let dataJson =  [
    {nombre: 'Jorge', apellido: 'Santamaria'},
    {nombre: 'Ezequiel', apellido: 'Barrera'},
    {nombre: 'Carlos', apellido: 'Forero'}
]

let dataString = JSON.stringify(dataJson)
fs.writeFileSync('archivo.json', dataString)

