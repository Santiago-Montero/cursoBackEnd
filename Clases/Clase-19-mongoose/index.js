
const mongoose = require('mongoose')
const Producto = require('./models/productos.js')



CRUD()


async function CRUD(){
    try{
        /* -------------------------------------- */
        /*       conexion a la base de datos      */
        /* -------------------------------------- */
        const URL = 'mongodb://localhost:27017/ecommerce'
        const rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada');

        /* -------------------------------------- */
        /*      agrego datos la base de datos     */
        /* -------------------------------------- */
            // const producto = new Producto({
            //     nombre: 'Mochila 2',
            //     precio: 2000,
            //     stock: 55,
            //     foto: 'Mochila_2.png'
            // })
            // await producto.save()

        /* -------------------------------------- */
        /*          Leer la base de datos         */
        /* -------------------------------------- */
        const productos = await Producto.find({})
        console.log(productos)
        
        /* -------------------------------------- */
        /*      actualizar la base de datos       */
        /* -------------------------------------- */
            // const productoUpdate = await Producto.updateOne({ 'nombre' : 'Remera'}, {
            //     $set: {'stock' : 12}
            // });
            // console.log('Se actualizo')

        /* -------------------------------------- */
        /*      borrar datos de base de datos     */
        /* -------------------------------------- */
            // const productoDelete = await Producto.deleteOne({ 'nombre' : 'Mochila 2'});
            // console.log('Se borro dato') 
        
            
    }catch (error){
        console.log(error)
    }
}