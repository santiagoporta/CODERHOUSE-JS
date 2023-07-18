var btnGirar = document.getElementById('btn-girar');
var resultado = document.getElementById('resultado');


var numeros = [
    { numero: 0, color: "verde" },
    { numero: 32, color: "rojo" },
    { numero: 15, color: "negro" },
    { numero: 19, color: "rojo" },    
    { numero: 4, color: "negro" },
    { numero: 21, color: "rojo" },    
    { numero: 2, color: "negro" },
    { numero: 25, color: "rojo" },    
    { numero: 17, color: "negro" },
    { numero: 34, color: "rojo" },    
    { numero: 6, color: "negro" },
    { numero: 27, color: "rojo" },    
    { numero: 13, color: "negro" },
    { numero: 36, color: "rojo" },    
    { numero: 11, color: "negro" },
    { numero: 30, color: "rojo" },    
    { numero: 8, color: "negro" },
    { numero: 23, color: "rojo" },    
    { numero: 10, color: "negro" },
    { numero: 5, color: "rojo" },    
    { numero: 24, color: "negro" },
    { numero: 16, color: "rojo" },    
    { numero: 33, color: "negro" },
    { numero: 1, color: "rojo" },    
    { numero: 20, color: "negro" },
    { numero: 14, color: "rojo" },    
    { numero: 31, color: "negro" },
    { numero: 9, color: "rojo" },    
    { numero: 22, color: "negro" },
    { numero: 18, color: "rojo" },    
    { numero: 29, color: "negro" },
    { numero: 7, color: "rojo" },    
    { numero: 28, color: "negro" },
    { numero: 12, color: "rojo" },
    { numero: 35, color: "negro" },
    { numero: 3, color: "rojo" },   
    { numero: 26, color: "negro" },
    ]

var jugador = {
  fichas: 10000,
  apuesta: 100
};


function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 37);
}


function girarRuleta() {
  if (jugador.fichas >= jugador.apuesta) {
    var numeroSeleccionado = parseInt(prompt('Ingresa el número al que quieres apostar (0-36):'));
    var colorSeleccionado = prompt('Ingresa el color al que quieres apostar (rojo/negro):');
    var numeroGanador = generarNumeroAleatorio()
    const ganador = numeros.find((el) => el.numero === numeroGanador)
    console.log (ganador)
    resultado.innerHTML = 'Número: ' + ganador.numero + ' - Color: ' + ganador.color;

    if (isNaN(numeroSeleccionado) || numeroSeleccionado < 0 || numeroSeleccionado > 36) {
      console.log('El número ingresado no es válido');
      return;
    }

    if (colorSeleccionado !== 'rojo' && colorSeleccionado !== 'negro') {
      console.log('El color ingresado no es válido');
      return;
    }

    if (numeroSeleccionado === parseInt(numeros[numeroGanador]) && colorSeleccionado === colorGanador) {
      jugador.fichas += jugador.apuesta * 5;
    } else {
      jugador.fichas -= jugador.apuesta;
    }

    console.log('Número seleccionado: ' + numeroSeleccionado + ' - Color seleccionado: ' + colorSeleccionado);
    console.log('Fichas restantes: ' + jugador.fichas);
  } else {
    console.log('No tienes suficientes fichas para apostar');
  }
  document.getElementById('fichas').textContent = jugador.fichas;
}


btnGirar.addEventListener('click', girarRuleta);