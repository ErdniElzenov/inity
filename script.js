const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let size = 50; // Размер игрового поля (по умолчанию 50x50)
let cellSize = canvas.width / size;
let board = createEmptyBoard(size);

function createEmptyBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (board[x][y] === 1) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function updateBoard() {
  const newBoard = createEmptyBoard(size);
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const neighbors = countNeighbors(x, y);
      if (board[x][y] === 1) {
        newBoard[x][y] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newBoard[x][y] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  board = newBoard;
}

function countNeighbors(x, y) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (!(dx === 0 && dy === 0)) {
        const nx = (x + dx + size) % size;
        const ny = (y + dy + size) % size;
        count += board[nx][ny];
      }
    }
  }
  return count;
}

function startGame() {
  intervalId = setInterval(() => {
    updateBoard();
    drawBoard();
  }, 100); // Интервал обновления в миллисекундах (здесь 100ms)
}

function stopGame() {
  clearInterval(intervalId);
}

function clearBoard() {
  board = createEmptyBoard(size);
  drawBoard();
}

function randomizeBoard() {
  board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => (Math.random() > 0.5 ? 1 : 0))
  );
  drawBoard();
}

function resizeBoard() {
  size = parseInt(document.getElementById("size").value);
  cellSize = canvas.width / size;
  board = createEmptyBoard(size);
  drawBoard();
}

canvas.addEventListener("click", (event) => {
  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);
  board[x][y] = 1 - board[x][y]; // Переключаем клетку между живой и мёртвой
  drawBoard();
});

// Начальное отображение игрового поля
drawBoard();
