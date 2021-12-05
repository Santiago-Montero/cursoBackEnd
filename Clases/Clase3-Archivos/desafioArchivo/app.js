const fs = require('fs')

class Contenedor {
    constructor(name){
        this.nameFile = name,
        this.file = []
    }

    async read(){
        try{
            const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
            const listaDeProductos = JSON.parse(contenido);
            this.file = listaDeProductos;
            return contenido;

        }catch(err){ // error en la lectura de archivo
            try{
                const contenido = await fs.promises.writeFile(this.nameFile, '');
                return contenido;
            }catch(err){
                return err // error en la creacion de archivo
            }
        }
    }

    async save(producto){
        try {
            const contenido =  await this.read(); // uso contenido para ver si esta vacio el archivo
            if (contenido == undefined) {
                producto.id = 1;
                this.file.push(producto);
            }else {
                let pos = this.file.length - 1 ;
                producto.id =  this.file[pos].id + 1;
                this.file.push(producto);
            }
            const productosString = JSON.stringify(this.file, null, 2);
            await fs.promises.writeFile(this.nameFile, productosString);
            return producto.id;

        } catch (error) {
            return error; // error al leer o en el proceso de guardar
        }
    }
    async getById(idProducto){
        try{

            const contenido = await this.read();
            const item = contenido.find(producto => producto.id == idProducto);
            if(item){
                return item;
            }else{
                return null;
            }
        }catch(error){
            return error;
        }
    }
    async getAll(){
        try{
            const listaDeProductos = await this.read();
            if(listaDeProductos){
                return listaDeProductos
            }else{
                return []
            }
        }catch (error){
            return error ;
        }
    }
    async deleteById(idProducto) {
        try{
            await this.read();
            const productoEliminar = this.file.find(producto => producto.id == idProducto);
            if(productoEliminar){
                const listaDeProductosNueva = this.file.filter(producto => producto.id != idProducto);
                const productosString = JSON.stringify(listaDeProductosNueva, null, 2);
                fs.promises.writeFile(this.nameFile, productosString);
            }
        }catch(error){
            return error;
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
    title: 'Item2',
    price: 1000,
    thumbnail: 'fotin'
}
const producto = new Contenedor('archivoDesafio.txt');
// producto.read();
producto.save(item1);
// producto.deleteById(45);
// producto.getById(1)
// producto.getAll();
// producto.deleteAll()

/*
save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo.
*/
