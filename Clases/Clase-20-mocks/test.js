const Calculadora = require('./main.js')

test('Should adds 4 and 5' , () => {
    expect(Calculadora.sumar(4,5)).toBe(9)
})