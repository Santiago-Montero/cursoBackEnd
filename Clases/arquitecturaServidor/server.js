const express = require('express')
const minimist = require('minimist')
const ProductApi = require('./services/productApi')
const productApi = new ProductApi()

async function exec(){
    const argv = minimist(process.argv.slice(2))
    const { cmd, id, name, price } = argv

    try{
        switch(cmd.toLowerCase()){
            case 'add' : 
                console.log('add')
                const r = await productApi.add({name, price})
                console.log(r);
                break
            case 'get' : 
                console.log('get')
                const g = await productApi.get()
                console.log(g);
                break
            case 'cotizacion' :
                console.log('cotizacion')
                const c = await productApi.buscarConCotizacionEnDolares(id)
                console.log(c);
                break
            default:
                console.log('no valido')
        }
    }catch(e){
        console.log(e)
    }
    await productApi.exit()
}

exec()
// const app = express();
// app.listen(3000, () => {
//     console.log('Servidor corriendo en puerto 3000')
// })