// express 

const express = require('express');
const fs = require('fs');
const moment = require('moment');

const app = express()
const PORT = 3000
let visitas = 0
const server = app.listen( PORT, () =>{
    try{
        let data = fs.readFileSync("visitas");
        visitas = Number(data)
        console.log('servidor corriendo en ' + PORT)
    }catch(e){
        console.log('no file')
    }
})

app.get('/', (request, response) => {
    response.send(`
    <h1 style='color:blue;'>
        bienvenido al servidor
    </h1>`)
})
app.get('/visitas', (request, response) => {
    
    visitas++;
    fs.writeFileSync("visitas", visitas.toString())
    response.send(`Cantidad visitas es ${visitas}`)
})

app.get('/fyh', (request, response) => {
    response.send({
        time: new moment().format('H:mm:ss')
    })
})

server.on('error', (error)=>{
    console.log('hubo un error')
})
