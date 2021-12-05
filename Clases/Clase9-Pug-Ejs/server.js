const express = require('express')

const app = express();


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) =>{
    res.send('hola')
});

app.get("/hello", (req, res) =>{
    return res.render('hello.pug', {
        mensaje:'estoy usando pug'
    }) // renderizar la plantilla
});

app.get("/datos", (req, res) =>{
    let { max, min, value} = req.query
    return res.render('datos.pug', {
        min, 
        max, 
        value
    })
    //http://localhost:8080/datos?max=10&min=1&value=8
});


app.listen(8080)