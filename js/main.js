let turno = 'rojo'; 
const botones = document.querySelectorAll('.juego button');
const titulo = document.querySelector('h1');
const ganadorH2 = document.querySelector('h2');

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let juegoTerminado = false;

function colorRojo() {
    titulo.classList.remove('tituloazul');
    titulo.classList.add('titulorojo');
};

function colorAzul() {
    titulo.classList.remove('titulorojo');
    titulo.classList.add('tituloazul');
}

function verificarGanador() {
    const clases = Array.from(botones).map(button => {
        if (button.classList.contains('rojo')) return 'rojo';
        if (button.classList.contains('azul')) return 'azul';
        return null;
    });

    for (let win of wins) {
        const [a, b, c] = win;
        if (clases[a] && clases[a] === clases[b] && clases[a] === clases[c]) {
            return clases[a];
        }
    }

    return null;
}

function juegoLleno() {
    return Array.from(botones).every(button =>
        button.classList.contains('rojo') || button.classList.contains('azul')
    );
}

function reiniciarTablero() {
    botones.forEach(button => button.className = '');
    titulo.textContent = "Turno del 🟥";
    colorRojo();
    turno = 'rojo';
    juegoTerminado = false;
}

botones.forEach(button => {
    button.addEventListener('click', () => {
        if (juegoTerminado) return;

        if (button.classList.contains('rojo') || button.classList.contains('azul')) {
            return;
        }

        if (turno === 'rojo') {
            button.classList.add('rojo');
        } else {
            button.classList.add('azul');
        }

        const ganador = verificarGanador();
        if (ganador) {
            ganadorH2.textContent = `¡${ganador.charAt(0).toUpperCase() + ganador.slice(1)} fue el ultimo ganador!`;
            ganadorH2.classList.remove('titulorojo', 'tituloazul', 'titulogris');
            ganadorH2.classList.add(ganador === 'rojo' ? 'titulorojo' : 'tituloazul');
            juegoTerminado = true;
            setTimeout(reiniciarTablero, 2000);
            return;
        }

        if (juegoLleno()) {
            ganadorH2.textContent = 'Empate';
            ganadorH2.classList.add('titulogris');
            juegoTerminado = true;
            setTimeout(reiniciarTablero, 2000);
            return;
        }

        turno = turno === 'azul' ? 'rojo' : 'azul';

        if (turno === 'rojo') {
            titulo.textContent = "Turno del 🟥";
            colorRojo();
        } else {
            titulo.textContent = "Turno del 🟦";
            colorAzul();
        }
    });
});


