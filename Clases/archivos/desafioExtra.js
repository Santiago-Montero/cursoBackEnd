// Archivos asincronos 
const fs = require('fs')

// leer archivo 


fs.readFile('package.json', 'utf-8', (error, data) =>{
    if(error){
        console.log(error + ' el error')
    }else{
        const info = {
            contenidoStr: data,
            contenidoObj: JSON.parse(data),
            // size: archivo["size"]
        }
        console.log(info.contenidoObj + ' soy el obj')
        console.log(info.contenidoStr + ' soy el str')
        console.log(info.size + ' soy el size')
    }
})

