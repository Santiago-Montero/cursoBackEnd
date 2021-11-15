/*
// sincronica 

const a = () => {
    console.log('1')
    b()
    console.log('2')

}
const b = () => {
    console.log('3')
    c()
    console.log('4')

}
const c = () => {
    console.log('5')
    console.log('6')

}

a()
console.log('hola hola')

1
3
5
6
4
2
hola hola
ejecuta linea por linea



// asincronico

const async = () => {
    setTimeout(() => {
        console.log('me ejecuto 3 segundo desp del chau chau')
    }, 3000)
}

async()
console.log('chau chau')

chau chau
...3 segundos desp
me ejecuto 3 segundo desp del chau chau
*/

const mostrarLetras = (string, cb) => {
    setTimeout(() =>{
        if(string.length > 0){
            console.log(string[0])
            string = string.slice(1) // slice corta la cantidad de caracteres q le pases por parametro, tmb se le puede pasar (1,5)
            mostrarLetras(string, cb)
        }else{
            cb()
        }
    }, 2000)
}

const fin = () => console.log('termine')

mostrarLetras('hola',fin)