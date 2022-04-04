const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new mongoose.Schema({
    nombre : {type : String , requiere: true, max : 100000},
    precio : {type : Number , requiere: true, max : 100000},
    stock : {type : Number , requiere: true, max : 100000},
    foto : {type : String , requiere: true, max : 100000}
})

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto




