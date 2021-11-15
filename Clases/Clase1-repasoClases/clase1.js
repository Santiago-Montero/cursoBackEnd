// desafios de clase

const mostrarLista = (listaDatos) =>{

    if(listaDatos.length === 0){
        console.log("Lista vacia")
    }else{
        for (let i = 0; i < listaDatos.length; i++) {
            console.log(listaDatos[i])
        }
    }
}

(function(array){
    if(array.length === 0){
        console.log("Lista vacia")
    }else{
        for (let i = 0; i < array.length; i++) {
            console.log(array[i])
        }
    }
})([]);


function crearMultiplicador(num){
    const multiplicador = 3 
    return () =>  {
        console.log( num * multiplicador)
    }
}

function crearMultiplicadorAnshe(multiplicador){
    return (num) =>  {
        console.log( num * multiplicador)
    }
}

let multiplicar4por3 = crearMultiplicador(4)
multiplicar4por3()

let duplicar = crearMultiplicadorAnshe(2)
duplicar(4)

let triplicar = crearMultiplicadorAnshe(3)
triplicar(4)


mostrarLista([1,2,3,4,5,6,"hola"])
mostrarLista([])
mostrarLista([null, undefined])
