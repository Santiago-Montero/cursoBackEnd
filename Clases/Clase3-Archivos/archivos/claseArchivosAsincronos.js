// Archivos asincronos 
const fs = require('fs')

// leer archivo 

fs.readFile('archivo.txt', 'utf-8', (error, data) =>{
    if(error){
        console.log(error + ' el error')
    }else{
        console.log(data)
    }
})

console.log('fin del programa')


// sobre escribir 
fs.writeFile('archivo.txt', 'agregando', (error) =>{
    if(error){
        console.log(error + ' el error')
    }else{
        console.log('se sobre escribio el archivo')
    }
})

// agregar texto 
fs.appendFile('archivo_dos.txt', '\nIndependiente yo te amo', (error) =>{
    if(error){
        console.log(error + ' el error')
    }else{
        console.log('se agrego texto al archivo')
    }
})

fs.mkdir('carpeta_nueva', (error) =>{
    if(!error){
        fs.writeFile('archivo.txt', 'agregando', (error) =>{
            if(error){
                        console.log(error + ' el error')
            }else{
                console.log('se sobre escribio el archivo')
            }
        })
    }else{
        console.log(error + ' el error')
    }
})


// fs.unlink(ruta, callback) borras archivos
// fs.mkdir(ruta, callback) creas carpeta
// fs.readdir(ruta, callback) leer carpeta




// Promesas

function readArchivo(){
    fs.promises.readFile('archivo_dos.txt', 'utf-8')
    .then(contenido => {
        console.log('el archivo fue leido con promesa \n' + contenido)
    })
    .catch(error => {
        console.log('un error ' + error)
    })
}

readArchivo()

async function leer(){
    try{
        const contenido = await fs.promises.readFile('archivo.txt', 'utf-8')
        console.log(contenido)
    }catch(error){
        console.log('hubo un error')
    }
    
}

leer()
// async se declara para poder usar el await
// await forza a q la promesa termine , es como un forzamiento a que sea sincronica XD