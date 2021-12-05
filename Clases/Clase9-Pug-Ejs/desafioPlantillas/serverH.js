const express = require('express')
const handlebars = require('express-handlebars')

const app = express();


app.engine(
    "handlebars",
    handlebars.engine()
)
app.set('views', './views')
app.set('view engine','handlebars')

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
    res.render('homeH', {
        productos,
        productExist : productos.length != 0 ? true : false
    }) 
});

app.get("/formH", (req, res) =>{
    res.render('formH')
});

app.post("/productos", (req, res) =>{
    productos.push(req.body)
    res.render('formH')
});

app.listen(8080)