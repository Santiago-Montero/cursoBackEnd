const express = require('express');
const handlebars = require('express-handlebars');

const app = express()
const PORT = 3000

const server = app.listen(PORT);

// app.use(express.json())
// app.use(express.urlencoded({
//     extended: true
// }))

// crear motor para plantilla
app.engine(
    "handlebars",
    handlebars.engine()
)

// especifica la carperta de las plantillas 
app.set('views', './views')

// registra el motor de plantillas 
app.set('view engine','handlebars')

listPokemon = () => [
    {name: "picachu", tipo:"trueno"},
    {name: "aguita", tipo:"agua"},
    {name: "meto", tipo:"tierra"}

]
app.get('/', (req, res) => {
    
    res.render('home', {
        list: listPokemon, 
        showList: true
    })
})

server.on('error', (error)=>{
    console.log('hubo un error'+ error )
})

// app.use(express.static('public'));
// app.use("/api", router)