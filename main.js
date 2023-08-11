var btnGirar = document.getElementById('btn-girar');
var resultado = document.getElementById('resultado');
var btnCambiarApuesta = document.getElementById('btn-cambiar-apuesta');

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

function cargarFichasDesdeLocalStorage() {
  const fichasGuardadas = localStorage.getItem('fichas');
  if (fichasGuardadas !== null) {
    jugador.fichas = parseInt(fichasGuardadas);
  } else {
    jugador.fichas = 10000;
  }
  document.getElementById('fichas').textContent = jugador.fichas;
}

cargarFichasDesdeLocalStorage();

function cambiarApuesta() {
  Swal.fire({
    title: 'Ingresa tu apuesta:',
    input: 'number',
    inputAttributes: {
      min: 1,
    },
    showCancelButton: true,
    confirmButtonText: 'Cambiar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (nuevaApuesta) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (isNaN(nuevaApuesta) || nuevaApuesta < 1) {
            Swal.showValidationMessage('El valor de la apuesta debe ser un número mayor o igual a 1');
            resolve();
          } else {
            resolve(nuevaApuesta);
          }
        }, 100);
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      jugador.apuesta = parseInt(result.value);
      document.getElementById('valor-apuesta').textContent = jugador.apuesta;
      Swal.fire('Apuesta cambiada', 'Nueva apuesta: ' + jugador.apuesta, 'success');
    }
  });
}

btnGirar.addEventListener('click', girarRuleta);
btnCambiarApuesta.addEventListener('click', cambiarApuesta);

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 37);
}


function girarRuleta() {
  if (jugador.fichas >= jugador.apuesta) {
    Swal.fire({
      title: 'Ingresa el número al que quieres apostar (0-36):',
      input: 'number',
      inputAttributes: {
        min: 0,
        max: 36
      },
      showCancelButton: true,
      confirmButtonText: 'Apostar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (numeroSeleccionado) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (isNaN(numeroSeleccionado) || numeroSeleccionado < 0 || numeroSeleccionado > 36) {
              Swal.showValidationMessage('El número ingresado no es válido');
              resolve();
            } else {
              resolve(numeroSeleccionado);
            }
          }, 100);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const numeroSeleccionado = parseInt(result.value);

        Swal.fire({
          title: 'Ingresa el color al que quieres apostar (rojo/negro):',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Apostar',
          cancelButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm: (colorSeleccionado) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                if (colorSeleccionado !== 'rojo' && colorSeleccionado !== 'negro') {
                  Swal.showValidationMessage('El color ingresado no es válido');
                  resolve();
                } else {
                  resolve(colorSeleccionado);
                }
              }, 100);
            });
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const colorSeleccionado = result.value;
            var numeroGanador = generarNumeroAleatorio();
            const ganador = numeros.find((el) => el.numero === numeroGanador);

            Swal.fire('Resultado', 'Número: ' + ganador.numero + ' - Color: ' + ganador.color, 'info');

            if (numeroSeleccionado === ganador.numero && colorSeleccionado === ganador.color) {
              jugador.fichas += jugador.apuesta * 35;
              console.log('GANASTE!')
            } else {
              jugador.fichas -= jugador.apuesta;
              console.log('Mala suerte, sigue jugando.')
            }

            document.getElementById('fichas').textContent = jugador.fichas;
            localStorage.setItem('fichas', jugador.fichas.toString());

            console.log('Número seleccionado: ' + numeroSeleccionado + ' - Color seleccionado: ' + colorSeleccionado);
            console.log('Fichas restantes: ' + jugador.fichas);
            document.getElementById('fichas').textContent = jugador.fichas;
          }
        });
      }
    });
  } else {
    Swal.fire('No tienes suficientes fichas para apostar', '', 'warning');
  }
}

btnGirar.addEventListener('click', girarRuleta);
