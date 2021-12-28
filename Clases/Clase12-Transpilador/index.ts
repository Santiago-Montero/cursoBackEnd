
let btnCambiarFondo:HTMLElement = document.getElementById('btnFondo')

btnCambiarFondo.addEventListener('click', ()=> {
    const numeroRandom1:number = Math.floor((Math.random() * (255))+0);
    const numeroRandom2:number = Math.floor((Math.random() * (255))+0);
    const numeroRandom3:number =  Math.floor((Math.random() * (255))+0);
    let bgColor:string = `rgb(${numeroRandom1},${numeroRandom2},${numeroRandom3})`
    document.body.style.backgroundColor = bgColor
})