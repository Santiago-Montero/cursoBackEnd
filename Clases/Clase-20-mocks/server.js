// const express = require('express');
const faker = require('faker');
const fs = require('fs')

// const app = express();


let str = 'NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\r\n'

for (let i = 0; i < 100; i++) {
    str += faker.name.firstName() +
        ';'+ faker.internet.email() +
        ';'+ faker.name.jobTitle() +
        ';'+ faker.random.locale() +
        '\r\n'
}
fs.writeFile('./test.csv' , str , function (err){
    if(err) console.log(err)

    console.log('se guardo')
})



// app.get('/test', (req, res) =>{
//     res.send('hola')
// });



// app.listen(8080);