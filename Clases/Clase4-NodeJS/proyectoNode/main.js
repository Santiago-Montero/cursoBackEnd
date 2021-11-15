const moment = require("moment");

// USANDO NPM MOMENT PARA SABER LAS FECHAS
const calcularEdad = (fecha) => {
    console.log(moment(fecha, 'M / D / Y').fromNow());
}


let dia = moment().format('M / D / Y')
console.log(`hoy es ${dia}`)
calcularEdad(" 8/ 14 / 2001") // 'M / D / Y'




