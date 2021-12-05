// npm init 
// express 

const express = require('express');
const { Router } = express

//router
const app = express();
const PORT = 8080;
const router = Router();
app.listen(PORT);

router.get('/persona', (req, res) => {
    res.send('devuelve personas');
})

router.get('/producto', (req, res) => {
    res.send('devuelve productos');
})

app.use('/api', router); // todo va a empezar con api/...

//static file 

app.use(express.static('public'));
// http://localhost:8080/img/descarga (2).jpg asi se llama 
// http://localhost:8080/index.html asi llamo al index q esta en public

router.get('/persona', (req, res) => {
    res.send('devuelve personas');
})



app.use(express.static('data'));
// http://localhost:8080/data.json

/*
const app = express()
const router = Router()

const mascotas = []
const personas = []

router.get("/mascota", (req, res) => {
    res.send(mascotas)
})

router.post("/mascotas" , (req, res)=>{
    console.log(req.body);
    const { nombre, raza, edad } = req.body;
    personas.push({ nombre, raza, edad });
    res.json(mascotas);
})

router.get("/persona", (req, res) => {
    res.send(personas)
})

router.post('/personas', (req, res) => {
    console.log(req.body)
    const { nombre, apellido, edad } = req.body
    personas.push({ nombre, apellido, edad })
    res.json(personas)
});

app.use(express.json());
app.use("/api", router)

app.listen(8080)
*/