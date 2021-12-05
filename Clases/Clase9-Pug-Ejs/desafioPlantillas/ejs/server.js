const express = require('express')

const app = express();


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const productos = [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]

app.get("/", (req, res) =>{
    res.render('home.ejs', {
        productos
    }) 
});

app.get("/form", (req, res) =>{
    res.render('form.ejs')
});

app.post("/productos", (req, res) =>{
    productos.push(req.body)
    res.render('form.ejs')
});




app.listen(3000)