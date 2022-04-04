const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const next = require('express-next')
const app = express()

// app.use(cookieParser())

app.listen(3000)


app.use(session({
    secret : 'secreto',
    resave : true,
    saveUninitialized : true
}))

app.get('/consesion', (req,res) => {
    if(req.session.contador){
        req.session.contador++
        res.send(`visitaste la web ${req.session.contador}`)
    }else{
        req.session.contador = 1
        res.send('bienvenido!')
    }
})

app.get('salir', (req,res) => {
    req.session.destroy( err => {
        if(!err) res.send('saliste')
        else res.send({status: 'error al salir ', body : err})
    })
})

app.get('/entrar/:nombre', (req,res) => {
    const {nombre} = req.params
    req.session.user = nombre
    res.send(`usuario : ${ req.session.user}`)
})
app.get('/psw/:psw', (req,res) => {
    const {psw} = req.params
    req.session.psw = psw
    res.send(`contraseña : ${ req.session.psw}`)
})

app.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'santi' || password !== '123') {
        return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})
function auth(req, res, next) {
    if (req.session?.user === 'santi' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}
app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
})
   

app.get('/set', (req, res) => {
    res.cookie('server', 'soy la cokie del server ').send('cookies set')
})

app.get('/set2', (req, res) => {
    res.cookie('server2', 'soy la cokie del server dos ', {maxAge: 30000}).send('cookies set')
})
app.get('/set3', (req, res) => {
    res.cookie('server2', 'soy la cokie del server GOOOOOOOOOD ', { signed: true }).send('cookies set')
})
app.get('/get', (req, res) => {
    res.send(req.signedCookies.server3);
})

app.get('/clear', (req,res) => {
    res.clearCookie('server2').send('cookie limpiada')
})