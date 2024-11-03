import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from './constants'

export function createInitialSnake() {
  const snake = []
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: INITIAL_SNAKE_LENGTH - i - 1, y: 0 })
  }
  return snake
}

export function generateFood(snake) {
  let food
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y))
  return food
}

export function checkCollision(head, snake) {
  return (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  )
}

export function moveSnake(snake, direction, food) {
  const head = { ...snake[0] }
  const newSnake = [head, ...snake.slice(0, -1)]
  let ate = false

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

  if (head.x === food.x && head.y === food.y) {
    ate = true
    newSnake.push(snake[snake.length - 1])
  }

  return { newSnake, ate }
}