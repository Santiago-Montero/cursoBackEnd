class Calculadora {
    static sumar(a, b){
        const r = a + b
        return r
    }
}
// en el package.json en test puse jest 
// para ejecutar el test hice ==> " npm test "
module.exports = Calculadora