function generateBoard() {
    const boardSize = parseInt(document.getElementById('boardSize').value);
    const board = document.getElementById('board');
    board.innerHTML = '';

    if (isNaN(boardSize) || boardSize < 1 || boardSize > 100) {
        alert('El tamaño no es válido');
        return;
    }

    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;

    const cellSize = Math.min(boardWidth, boardHeight) / boardSize;

    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

