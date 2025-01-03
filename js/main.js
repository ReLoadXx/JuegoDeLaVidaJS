let intervalo;
let contadorCiclos = 0;
let tableroArray = [];

function generarTablero() {
    const tamanoTablero = parseInt(document.getElementById('boardSize').value);
    const tablero = document.getElementById('board');
    tablero.innerHTML = '';

    if (isNaN(tamanoTablero) || tamanoTablero < 1 || tamanoTablero > 100) {
        alert('El tamaño no es válido');
        return;
    }

    tableroArray = Array.from({length: tamanoTablero}, () => Array(tamanoTablero).fill(0));

    const anchoTablero = tablero.clientWidth;
    const altoTablero = tablero.clientHeight;

    const tamanoCelda = Math.min(anchoTablero, altoTablero) / tamanoTablero;

    for (let i = 0; i < tamanoTablero; i++) {
        const fila = document.createElement('div');
        fila.classList.add('row');
        for (let j = 0; j < tamanoTablero; j++) {
            const celda = document.createElement('div');
            celda.classList.add('cell');
            celda.dataset.row = i;
            celda.dataset.col = j;
            celda.addEventListener('click', () => alternarEstadoCelda(i, j));
            celda.style.width = `${tamanoCelda}px`;
            celda.style.height = `${tamanoCelda}px`;
            fila.appendChild(celda);
        }
        tablero.appendChild(fila);
    }
}

function alternarEstadoCelda(fila, col) {
    tableroArray[fila][col] = tableroArray[fila][col] === 0 ? 1 : 0;
    actualizarTablero();
}

function actualizarTablero() {
    const tablero = document.getElementById('board');
    Array.from(tablero.children).forEach((filaDiv, indiceFila) => {
        Array.from(filaDiv.children).forEach((celdaDiv, indiceCol) => {
            if (tableroArray[indiceFila][indiceCol] === 1) {
                celdaDiv.classList.add('alive');
            } else {
                celdaDiv.classList.remove('alive');
            }
        });
    });
}

function iniciarJuego() {
    if (intervalo) return;
    intervalo = setInterval(() => {
        tableroArray = siguienteGeneracion(tableroArray);
        actualizarTablero();
        document.getElementById('cycleCount').innerText = ++contadorCiclos;
    }, 500);
}

function detenerJuego() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciarJuego() {
    detenerJuego();
    contadorCiclos = 0;
    document.getElementById('cycleCount').innerText = contadorCiclos;
    generarTablero();
}

function siguienteGeneracion(tablero) {
    const filas = tablero.length;
    const cols = tablero[0].length;
    const nuevoTablero = Array.from({ length: filas }, () => Array(cols).fill(0));

    const obtenerVecinos = (x, y) => {
        let cuenta = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < filas && ny >= 0 && ny < cols) {
                    cuenta += tablero[nx][ny];
                }
            }
        }
        return cuenta;
    };

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < cols; j++) {
            const vecinosVivos = obtenerVecinos(i, j);
            if (tablero[i][j] === 1) {
                nuevoTablero[i][j] = vecinosVivos === 2 || vecinosVivos === 3 ? 1 : 0;
            } else {
                nuevoTablero[i][j] = vecinosVivos === 3 ? 1 : 0;
            }
        }
    }

    return nuevoTablero;
}