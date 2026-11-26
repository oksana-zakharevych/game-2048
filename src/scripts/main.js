import Game from '../modules/Game.class';

const game = new Game();
const button = document.querySelector('.button');
const scoreElement = document.querySelector('.game-score');
const cells = document.querySelectorAll('.field-cell');
const startMessage = document.querySelector('.message-start');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');

function updateButton() {
  const isIdle = game.getStatus() === 'idle';

  button.classList.toggle('start', isIdle);
  button.classList.toggle('restart', !isIdle);
  button.textContent = isIdle ? 'Start' : 'Restart';
}

function render() {
  const state = game.getState();

  scoreElement.textContent = game.getScore();

  state.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cellIndex = rowIndex * 4 + colIndex;
      const cell = cells[cellIndex];

      cell.className = 'field-cell';

      if (value > 0) {
        cell.textContent = value;
        cell.classList.add(`field-cell--${value}`);
      } else {
        cell.textContent = '';
      }
    });
  });

  startMessage.classList.toggle('hidden', game.getStatus() !== 'idle');
  winMessage.classList.toggle('hidden', game.getStatus() !== 'win');
  loseMessage.classList.toggle('hidden', game.getStatus() !== 'lose');

  updateButton();
}

button.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
  } else {
    game.restart();
  }

  render();
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      game.moveLeft();
      break;

    case 'ArrowRight':
      e.preventDefault();
      game.moveRight();
      break;

    case 'ArrowUp':
      e.preventDefault();
      game.moveUp();
      break;

    case 'ArrowDown':
      e.preventDefault();
      game.moveDown();
      break;

    default:
      return;
  }

  render();
});

render();
