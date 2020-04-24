export const updateMatrix = (value, i, j) =>
  prev => prev.map((x, i2) => x.map((y, j2) => i === i2 && j === j2 ? value : y))

export const delay = (func, time = 1000) =>
  new Promise(res =>
    setTimeout(() => {
      res(func())
    }, time)
  )

export const randomBool = () => Math.random() >= 0.5