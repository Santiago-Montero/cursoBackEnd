const ProductoDao = require('../dao/productosDao')
const Cotizador = require('../dto/cotizador')
const ProductoDto = require('../dto/productoDto')

class ProductoApi {
    
    constructor(){
        this.productDao = new ProductoDao()
        this.cotizador = new Cotizador()
    }

    async add(product){
        return await this.productDao.add(product)
    }
    async get(){
        return await this.productDao.getAll()
    }
    async exit(){
        return await this.productDao.exit()
    }
    async buscarConCotizacionEnDolares(id) {
        if (id) {
            const producto = await this.productDao.getById(id);
            const cotizaciones = {
                precioDolar: this.cotizador
                    .getPrecioSegunMoneda(producto.price, 'USD')
            }
            const productoDto = new ProductoDto(producto, cotizaciones)
            return productoDto
        } else {
            const productos = await this.productDao.getAll();
            const productosDtos = productos.map(producto => {
                const cotizaciones = {
                    precioDolar: this.cotizador
                        .getPrecioSegunMoneda(producto.price, 'USD')
                }
                const productoDto = new ProductoDto(producto, cotizaciones)
                return productoDto
            })
            return productosDtos;
        }
    }
    
}

module.exports = ProductoApi

