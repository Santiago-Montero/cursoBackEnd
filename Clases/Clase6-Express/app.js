// express 
const express = require('express');

const app = express();
const PORT = 8080;
const server = app.listen(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // consumir mejor servicios(req.body obtiene todo tipo de datos no solo cadenas)

app.get('/api/mensajes', (request, response) => {
    
    if(Object.entries(request.query).length > 0 ){
        //http://localhost:8080/api/mensajes?pais=bolivia
        response.send({
            result : 'mensaje con query',
            query: request.query
            //{"result":"mensaje con query","query":{"pais":"bolivia"}}
        })
    }else{
        response.send('mensajes');
    }
})

let ciudades  = [
    {id : 1, ciudad: "bolivia"},
    {id : 2, ciudad: "bolivia2"},
    {id : 3, ciudad: "bolivia3"},
    {id : 4, ciudad: "bolivia4"},
]


app.get('/api/ciudad/:id', (request, response) => {
    //http://localhost:8080/api/ciudad/2
    let id = request.params.id
    let ciudad = ciudades.find(ciudad => ciudad.id == id )
    response.json(ciudad)
    //{"id":2,"ciudad":"bolivia2"}
})

const frase = 'hola mundo como estan'

app.get('/api/frase', (request, response) => {
    response.json({frase}) //{"frase":"hola mundo como estan"}
})
app.get('/api/letras/:num', (request, response) => {
    
    // let cualLetra = frase.slice(request.params.num-1,request.params.num)
    let num = parseInt(request.params.num)
    // let letra = frase.find(palabra =>)

    if(isNaN(num)){
        return response.send({error : 'error el parametro no es un numero'})
    }
    if(num >= frase.length ||  num <= 0){
        return response.send({error : 'error el parametro esta fuera de rango'})
    }

    return response.json({letra : frase[num - 1]})
})
app.get('/api/palabras/:num', (request, response) => {
    //http://localhost:8080/api/palabras/2
    let palabras = frase.split(' ') // convierte nuestro string en un array separando cuando encuentra un espacio
    // frase : 'hola mundo como estan'
    // array : ["hola","mundo","como","estan"]

    let num = parseInt(request.params.num) 

    if(isNaN(num)){
        return response.send({error : 'error el parametro no es un numero'})
    }
    if(num >= frase.length ||  num <= 0){
        return response.send({error : 'error el parametro esta fuera de rango'})
    }

    return response.json({palabra : palabras[num - 1]})
    //{"palabra":"mundo"}
})

app.post('api/ciudad2' , (req , res) => {
    console.log('recibido por post');
    // para tomar el parametro por post tengo q usar body
    const mensaje = req.body ; 
    res.send(mensaje);
})

app.put('api/ciudad/:id' , (req , res) => {
    console.log('put request');
    // para tomar el parametro por post tengo q usar body
    const mensaje = req.body ; 
    res.send({
        result:'ok',
        id: req.params.id,
        nuevo: req.body
    })
})
app.delete('api/ciudad/:id' , (req , res) => {
    console.log('delete request');
    // para tomar el parametro por post tengo q usar body
    res.send({
        result:'ok',
        id: req.params.id,
        nuevo: req.body
    })
})

server.on('error', (error)=>{
    console.log('hubo un error'+ error )
})
