module.exports = class Product {

    #id
    #name
    #price
    #stock


    constructor({id, name, price, stock = 4}){
        this.id    = id
        this.name  = name 
        this.price = price
        this.stock = stock
    }

    get id(){
        return this.#id
    }
    set id(id){
        return this.#id = id
    }
    get name(){
        return this.#name
    }
    set name(name){
        return this.#name = name
    }
    get price(){
        return this.#price
    }
    set price(price){
        return this.#price = price
    }
    get  stock(){
        return this.#stock
    }
    set stock ( stock){
        return this.#stock =  stock
    }
}