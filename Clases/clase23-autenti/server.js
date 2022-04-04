const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require('bcrypt');
const app = express();
const mongoose = require('mongoose')

const User = require('./models')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 40000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const usuarios = []

passport.use(
    "login",
    new LocalStrategy((usuario, contra, done) => {
        User.findOne({ usuario }, (err, user) => {
            if (err) return done(err);

            if (!user) {
                console.log("No se encontro el usuario con este nombre " + usuario);
                return done(null, false);
            }

            if (!isValidPassword(user, contra)) {
                console.log("Contraseña incorrecta");
                return done(null, false);
            }
            return done(null, user);
        });
    })
);
passport.use(
    "signup",
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        (req, usuario, contra, mail, done) => {
            User.findOne({ usuario: usuario }, function (err, user) {
                if (err) {
                    console.log("Erro en la creacion de usuario: " + err);
                    return done(err);
                }
                if (user) {
                    console.log("Ese usuario ya existe");
                    return done(null, false);
                }
                
                
                const newUser = {
                    usuario: usuario,
                    contra: createHash(contra),
                    mail : mail
                };
                User.create(newUser, (err, userWithId) => {
                    if (err) {
                        console.log("Error guardando usuario: " + err);
                        return done(err);
                    }
                    console.log(user);
                    console.log("Creacion del usuario realizada");
                    return done(null, userWithId);
                });
            });
        }
    )
);

function createHash(contra) {
    return bCrypt.hashSync(contra, bCrypt.genSaltSync(10), null);
}

passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function connect(url, cb){
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, error => {
        if( cb != null) cb(error)
        else console.log('se conecto a la base de datos')
    })
}
connect('mongodb://localhost:27017/ecommerceBk', error => {
    if(error) console.log('error db')
    else app.listen(3000);
    
})
function getRoot(req, res){
    res.send('Hola ')
}

function getLogIn(req, res){
    if( req.isAuthenticated()){
        let user = req.usuario // por el name
        console.log('usuario logeado')
        res.sendFile(__dirname + "/views/home.html");
    }else{
        res.sendFile(__dirname + "/views/logIn.html");
    }
}
function postLogin(req, res){
    // const user = req.usuario 
    res.sendFile(__dirname + "/views/home.html");
}
function getSingUp (req, res){
    res.sendFile(__dirname + "/views/index.html");
}
function postSingUp(req, res){
    // const user = req.usuario 
    res.sendFile(__dirname + "/views/home.html");
}

app.get('/', getRoot)
app.get('/login', getLogIn)

app.post('/login', passport.authenticate('login',
        postLogin))

app.get('/signup', getSingUp)

app.post('/signup', passport.authenticate('signup',
        postSingUp))


function checkAuth(req,res,next){
    if(req.isAuthenticated()) next();
    else res.redirect("/index");
}

app.get('/private', checkAuth, (req, res)=>{
    const { usuario } = req
    res.send('usuario logeado anshei')
})
/*
app.use(express.static(__dirname + '/views'));

app.get("/", (req, res) => {
    // res.send("arranco");
    res.sendFile("index.html");
});
app.post("/registrar", (req, res) => {
    // res.send("arranco");
    const {usuario , contra } = req.body
    console.log(usuario);
    console.log(contra);
    const exist = usuarios.find( usu => usu.usuario == usuario)
    if(!exist){
        req.session.usuario = usuario
        usuarios.push({usuario, contra})
        res.sendFile(__dirname + "/views/index.html");
    } 
    else res.sendFile(__dirname + "/views/error.html");
    
    console.log(usuarios)
    //{ usuario: 'smontero', contra: 'as' }
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/views/error.html");
})

app.get('/logIn', (req, res) => {
    res.sendFile(__dirname + "/views/logIn.html");
})

app.post('/home', (req,res)=> {
    const {usuario , contra } = req.body
    const exist = usuarios.find( usu => usu.usuario == usuario)
    if(!exist){
        res.sendFile(__dirname + "/views/error.html");
    } 
    else res.sendFile(__dirname + "/views/home.html");

})*/