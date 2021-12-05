
const express = require('express');

const app = express();
const PORT = 8080;
app.listen(PORT);

app.use(function(req, res, next){
    console.log('time: ' , Date.now())
    next();
})

function mid1(req, res, next){
    req.dato = "datos controler";
    next()
}

app.get('/persona', (req, res) => {
    res.send('devuelve personas');
})

app.get('/persona2', mid1, (req, res) => {
    //antes de ejecutar persona2 hace mid1 ponele
    console.log(req.dato)
    res.send('devuelve personas');
})

// middlewear para hacer capas , generalmente procesar datos , autentificacion
// capa 1 verifica usuario 
// capa 2 verifica si estas autorizado 
// capa 3 ....
