const http = require('http') // requerimos el modulo http
const moment = require('moment');

// request = peticion , response = respuesta
const server = http.createServer((request, response) => {

    const now = Number(new moment().format('HH'))
    let message = ''
    if(now >= 6 && now  <= 12){
        message = 'Buenos dias'
    }else if(now  >= 13 && now  <= 19){
        message =  'Buenas tardes'
    }else{
        message =  'Buenas noches'
    }
    response.end(message)
})

const connect = server.listen(8080, () =>{
    // contenido del server
    let port = connect.address().port
    console.log(`escuchando por puerto ${port}`)
})

//nodemon main.js (esto si tenes instalado el nodemon)/ node main.js 