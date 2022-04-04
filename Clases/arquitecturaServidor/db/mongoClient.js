const DBClient = require('./dbClient')
const mongoose = require('mongoose')
const Config = require('../config/config')


class MongoClient extends DBClient{

    constructor(){
        super()
        this.connected = false
        this.client = mongoose
    }

    async connect(){
        try{
            const url = Config.db.connectString + Config.db.name
            await this.client.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            this.connected = true
            console.log('DB MONGO CONNECT')
        }catch (err){
            throw new Error(' Error al conectar', err)
        }
    }
    async disconnect(){
        try{
            await this.client.connection.close()
            console.log('DB MONGO DISCONNECT')
            this.connected = false
        }catch (err){
            throw new Error(' Error al desconectar', err)
        }
    }


    async add(product){
        try{
            const Product = mongoose.model('Product', {name : String, price : Number})
            
            const bag = new Product(product)
            return await bag.save()
        }catch(err){
                throw new Error(' Error al hacer add', err)
        }
    }
    async get(){
        try{
            const Product = mongoose.model('Product', {name : String, price : Number})
            
            return await Product.find()
        }catch(err){
                throw new Error(' Error al hacer get', err)
        }
    }
}

module.exports = MongoClient