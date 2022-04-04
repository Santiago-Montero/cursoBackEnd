class ProductoDto {
    constructor(datos, cotizaciones) {
        this.name = datos.name
        this.price = datos.price
        for (const [ denominacion, valor ] of Object.entries(cotizaciones)) {
            this[ denominacion ] = valor
        }
    }
}

module.exports = ProductoDto