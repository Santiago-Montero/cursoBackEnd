const mongoose = require('mongoose')

module.exports = mongoose.model('User',{
    usuario: String,
    contra: String,
    mail : String
})