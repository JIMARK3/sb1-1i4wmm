export function handleKeyPress(event, direction, isGameRunning) {
  if (!isGameRunning) return direction

  switch (event.key) {
    case 'ArrowUp':
      return direction !== 'down' ? 'up' : direction
    case 'ArrowDown':
      return direction !== 'up' ? 'down' : direction
    case 'ArrowLeft':
      return direction !== 'right' ? 'left' : direction
    case 'ArrowRight':
      return direction !== 'left' ? 'right' : direction
    default:
      return direction
  }
}