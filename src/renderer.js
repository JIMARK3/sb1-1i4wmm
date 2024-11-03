import { CELL_SIZE, COLORS } from './constants'

export function setupCanvas(canvas, width, height) {
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')
}

export function drawGame(ctx, snake, food, canvasWidth, canvasHeight) {
  // Clear canvas
  ctx.fillStyle = COLORS.BACKGROUND
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

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