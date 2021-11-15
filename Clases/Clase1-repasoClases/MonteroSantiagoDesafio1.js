class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre 
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombre){
        this.mascotas.push(nombre)
    }

    countMascotas() {
        const count = this.mascotas.length
        return count
    }

    addBook(nombreLibro, nombreAutor){
        this.libros.push({nombre: nombreLibro, autor: nombreAutor})
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre)
    }
}

const usuario = new Usuario("Santiago", "Montero", [{nombre:"unLibro", autor:"juan"}, {nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}], ['Oliver' , 'Simba', 'Henry', 'Albus'])



usuario.getFullName()
usuario.getBookNames()
usuario.addBook('otroLibro', 'juan')
usuario.getBookNames()
usuario.countMascotas()
