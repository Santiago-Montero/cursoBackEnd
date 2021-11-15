const fs = require('fs')

class Contenedor {
    constructor(name){
        this.nameFile = name
    }

    async save(producto){
        try {

            const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
            let productos = [];
            
            if (contenido == "") {
                producto.id = 1;
                productos.push(producto);
            } else {
                const listaDeProductos = JSON.parse(contenido);
                producto.id = listaDeProductos.length + 1;
                listaDeProductos.push(producto);
                productos = listaDeProductos;
            }
            const productosString = JSON.stringify(productos, null, 2);
            await fs.promises.writeFile(this.nameFile, productosString);
            return producto.id;

        } catch (error) {
            return error;
        }
    }
    async getById(idProducto){
        try{

            const contenidoJSON = await fs.promises.readFile(this.nameFile, "utf-8");
            const listaDeProductos = JSON.parse(contenidoJSON);
            const item = listaDeProductos.find(producto => producto.id == idProducto);
            item ? item : null;
        
        }catch(error){
            return error;
        }
    }
    async getAll(){
        try{
            const contenidoJSON = await fs.promises.readFile(this.nameFile, "utf-8");
            const listaDeProductos = JSON.parse(contenidoJSON);
            
            return listaDeProductos
    
        }catch (error){
            return error ;
        }
    }
    async deleteById(idProducto) {
        try{
            const contenidoJSON = await fs.promises.readFile(this.namefile,"utf-8");
            const listaDeProductos = JSON.parse(contenidoJSON);
            const listaProductosSinId = listaDeProductos.filter(producto => producto.id !== idProducto);

            const listaProductosSinIdJSON = JSON.stringify(listaProductosSinId, null, 2);
            fs.promises.writeFile(this.namefile, listaProductosSinIdJSON);
            return 'Se actualizo'
        }catch(error){
            return error
        }
    }
    
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nameFile, "");
        } catch (error) {
            return error;
        }
    }

}
const item1 = {
    title: 'Item1',
    price: 1000,
    thumbnail: 'fotin'
}
const producto = new Contenedor('archivoDesafio.txt');
// producto.save(item1);
// producto.getById(1)
// producto.getAll();
// producto.deletebyId(1);
// producto.deleteAll()

/*
save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo.
*/
