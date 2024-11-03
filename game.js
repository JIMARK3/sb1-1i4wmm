const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE_LENGTH = 4
const GAME_SPEED = 100

const COLORS = {
  BACKGROUND: '#1a1a1a',
  SNAKE: '#646cff',
  FOOD: '#ff4646'
}

export function initGame() {
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')
  const startButton = document.getElementById('startButton')
  const scoreElement = document.getElementById('scoreValue')

  canvas.width = GRID_SIZE * CELL_SIZE
  canvas.height = GRID_SIZE * CELL_SIZE

  let snake = []
  let food = { x: 0, y: 0 }
  let direction = 'right'
  let score = 0
  let gameInterval = null
  let isGameRunning = false

  function createInitialSnake() {
    const snake = []
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snake.push({ x: INITIAL_SNAKE_LENGTH - i - 1, y: 0 })
    }
    return snake
  }

  function generateFood() {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }

  function draw() {
    // Clear canvas
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = COLORS.SNAKE
    snake.forEach(segment => {
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      )
    })

    // Draw food
    ctx.fillStyle = COLORS.FOOD
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    )
  }

  function moveSnake() {
    const head = { ...snake[0] }

    switch (direction) {
      case 'up':
        head.y--
        break
      case 'down':
        head.y++
        break
      case 'left':
        head.x--
        break
      case 'right':
        head.x++
        break
    }

    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      gameOver()
      return
    }

    snake.unshift(head)

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      score += 10
      scoreElement.textContent = score
      food = generateFood()
    } else {
      snake.pop()
    }
  }

  function gameOver() {
    clearInterval(gameInterval)
    isGameRunning = false
    startButton.textContent = 'Start Game'
    alert(`Game Over! Score: ${score}`)
  }

  function gameLoop() {
    moveSnake()
    draw()
  }

  function handleKeyPress(event) {
    if (!isGameRunning) return

    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'down') direction = 'up'
        break
      case 'ArrowDown':
        if (direction !== 'up') direction = 'down'
        break
      case 'ArrowLeft':
        if (direction !== 'right') direction = 'left'
        break
      case 'ArrowRight':
        if (direction !== 'left') direction = 'right'
        break
    }
  }

  function initializeGame() {
    snake = createInitialSnake()
    food = generateFood()
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
      initializeGame()
      isGameRunning = true
      startButton.textContent = 'Stop Game'
      gameInterval = setInterval(gameLoop, GAME_SPEED)
    }
  })

  document.addEventListener('keydown', handleKeyPress)

  // Initial setup
  initializeGame()
  draw()
}