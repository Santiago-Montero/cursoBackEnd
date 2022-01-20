const fs = require('fs')

class Contenedor2 {
    constructor(name){
        this.nameFile = name,
        this.file = []
    }

    async read(){
        try{
            const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
            const listaDeMensajes = JSON.parse(contenido);
            this.file = listaDeMensajes;
            return contenido;

        }catch(err){
            try{
                const contenido = await fs.promises.writeFile(this.nameFile, '');
                return contenido;
            }catch(err){
                return err
            }
        }
    }
    async save(mensaje){
        try {
            const contenido =  await this.read();
            if (contenido == undefined) {
                mensaje.id = 1;
                this.file.push(mensaje);
            }else {
                let pos = this.file.length - 1 ;
                mensaje.id =  this.file[pos].id + 1;
                this.file.push(mensaje);
            }
            const mensajesString = JSON.stringify(this.file, null, 2);
            await fs.promises.writeFile(this.nameFile, mensajesString);
            return mensaje.id;

        } catch (error) {
            return error;
        }
    }
}

module.exports = Contenedor2;