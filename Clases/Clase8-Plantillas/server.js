const fs = require('fs');
const express = require('express');
const { Router } = express

const app = express()
const PORT = 8080
const router = Router();
const server = app.listen(PORT);

// app.use(express.json())
// app.use(express.urlencoded({
//     extended: true
// }))

// crear motor para plantilla
app.engine('.santi', function (filePath, options, callback){
    fs.readFile(filePath, function(err, content){
        if(err) return callback(new Error(err))
        
        const rendered = content.toString()
                                .replace('$title$', options.title + ' ')
                                .replace('$message$', options.message + '')
        return callback(null, rendered)
    })
})



// especifica la carperta de las plantillas 
app.set('views', './views')

// registra el motor de plantillas 
app.set('view engine','santi')


app.get('/', (req, res) => {
    
    res.render('indexSanti', {
        title: req.query.title,
        message : "GOOOOOOOOOOOD"
        // req.params.title
        // req.params.message
        //localhost:8080/?title="juan carlos"
    })
})

server.on('error', (error)=>{
    console.log('hubo un error'+ error )
})

// app.use(express.static('public'));
// app.use("/api", router)