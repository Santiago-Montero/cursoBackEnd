const express = require('express')

const app = express();


app.set('views', './ejs');
app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    return res.render('mensaje.ejs', {
        mensaje:'estoy usando ejs'
    }) // renderizar la plantilla
});
app.get("/pets", (req, res) =>{
    const pets = [
        {name:'dorado', animal:'pez', edad:1},
        {name:'oli', animal:'perro', edad:3},
        {name:'simba', animal:'perro', edad:2},
        {name:'henry', animal:'perro', edad:11},
        {name:'albus', animal:'perro', edad:3},
    ]
    return res.render('pets.ejs', {
        pets
    }) // renderizar la plantilla
});

app.get("/datos", (req, res) =>{
    let { nombre , apellido } = req.query
    return res.render('mensaje.ejs', {
        nombre,
        apellido
    })
});


app.listen(3000)