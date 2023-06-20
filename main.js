let laBala = 6;

const girarTambor = () => {
    var posicionRecamara = Math.floor(Math.random() * 6) + 1;
    return posicionRecamara;
};

const tirarDelGatillo = (posicionRecamara) => {
    console.log (posicionRecamara)
    if (posicionRecamara === laBala) {
        var reply = prompt('Mala suerte, volver a jugar? (escribir "si" para seguir jugando)')
        if (reply === 'si' ) {
            tirarDelGatillo(girarTambor())           
        } else {
            return null
    }
    }
    else {
        var reply = prompt('Tuviste suerte (escribir "si" para seguir jugando)')
        if (reply === 'si' ) {
            tirarDelGatillo(girarTambor())           
        } else {
            return null
        }
    }
}

tirarDelGatillo(girarTambor())