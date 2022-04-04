const ProductoDao = require("../dao/productosDao")
const Product = require('./productos')

module.exports = class ProductRepo{
    constructor(){
        this.dao = new ProductoDao()
    }

    async getAll(){
        const dtos = this.dao.getAll()
        return  dtos.map(dto => new Product(dto))
    }
    async add(product){
        return await this.dao.add(product)
    }
}