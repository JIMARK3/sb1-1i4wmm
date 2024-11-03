import { GRID_SIZE, CELL_SIZE, GAME_SPEED } from './constants'
import { createInitialSnake, generateFood, checkCollision, moveSnake } from './gameLogic'
import { setupCanvas, drawGame } from './renderer'
import { handleKeyPress } from './controls'

export function initGame() {
  const canvas = document.getElementById('gameCanvas')
  const ctx = setupCanvas(canvas, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE)
  const startButton = document.getElementById('startButton')
  const scoreElement = document.getElementById('scoreValue')

  let snake = createInitialSnake()
  let food = generateFood(snake)
  let direction = 'right'
  let score = 0
  let gameInterval = null
  let isGameRunning = false

  function updateGame() {
    const { newSnake, ate } = moveSnake(snake, direction, food)

    if (checkCollision(newSnake[0], snake)) {
      gameOver()
      return
    }

    snake = newSnake

    if (ate) {
      score += 10
      scoreElement.textContent = score
      food = generateFood(snake)
    }

    drawGame(ctx, snake, food, canvas.width, canvas.height)
  }

  function gameOver() {
    clearInterval(gameInterval)
    isGameRunning = false
    startButton.textContent = 'Start Game'
    alert(\`Game Over! Score: \${score}\`)
  }

  function resetGame() {
    snake = createInitialSnake()
    food = generateFood(snake)
    direction = 'right'
    score = 0
    scoreElement.textContent = score
  }

  startButton.addEventListener('click', () => {
    if (isGameRunning) {
      clearInterval(gameInterval)
      isGameRunning = false
      startButton.textContent = 'Start Game'
    } else {
      resetGame()
      isGameRunning = true
      startButton.textContent = 'Stop Game'
      gameInterval = setInterval(updateGame, GAME_SPEED)
    }
  })

  document.addEventListener('keydown', (event) => {
    direction = handleKeyPress(event, direction, isGameRunning)
  })

  // Initial draw
  resetGame()
  drawGame(ctx, snake, food, canvas.width, canvas.height)
}