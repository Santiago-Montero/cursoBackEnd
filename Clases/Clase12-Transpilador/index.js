var btnCambiarFondo = document.getElementById('btnFondo');
btnCambiarFondo.addEventListener('click', function () {
    var numeroRandom1 = Math.floor((Math.random() * (255)) + 0);
    var numeroRandom2 = Math.floor((Math.random() * (255)) + 0);
    var numeroRandom3 = Math.floor((Math.random() * (255)) + 0);
    var bgColor = "rgb(".concat(numeroRandom1, ",").concat(numeroRandom2, ",").concat(numeroRandom3, ")");
    document.body.style.backgroundColor = bgColor;
});
