export const updateMatrix = (value, i, j) =>
  prev => prev.map((x, i2) => x.map((y, j2) => i === i2 && j === j2 ? value : y))
