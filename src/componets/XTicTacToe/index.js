import React, { useState, useEffect, useCallback } from 'react'
import { SquareType } from '../Square'
import { updateMatrix, delay, randomBool } from '../../utils'
import TicTactToeBoard from '../TicTacToeBoard'
import Header from '../Header'

const { x, none } = SquareType

// https://math.stackexchange.com/questions/3645659/chess-hourse-move-in-a-tic-tac-toe-board
const hourseMove = (matrix, x, y) => {
  let newX1 = (
    (1 / 4) *
    (
      8 + (x ** 2) - (8 * x * y) + (y ** 2) - (x ** 3) + (2 * (x ** 2) * y) + (2 * x * (y ** 2)) - (y ** 3)
    )
  )
  let newY1 = (
    (1 / 4) *
    (
      4 + (7 * (x ** 2)) - (7 * (y ** 2)) - (3 * (x ** 3)) + (2 * (x ** 2) * y) - (2 * x * (y ** 2)) + (3 * (y ** 3))
    )
  )

  let newX2 = (
    (1 / 4) *
    (
      4 - (7 * (x ** 2)) + (7 * (y ** 2)) + (3 * (x ** 3)) - (2 * (x ** 2) * y) + (2 * x * (y ** 2)) - (3 * (y ** 3))
    )
  )
  let newY2 = (
    (1 / 4) *
    (
      8 - (x ** 2) + (8 * x * y) - (y ** 2) + (x ** 3) - (2 * (x ** 2) * y) - (2 * x * (y ** 2)) + (y ** 3)
    )
  )
  const [newX, newY] = (matrix[newX1][newY1] === none ? [newX1, newY1] : [newX2, newY2])
  return [newX, newY]
}

const getFreeSquares = matrix => {
  let freeSquares = []
  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i]
    let i1, i2
    if (i === 0) {
      i1 = 1
      i2 = 2
    } else if (i === 1) {
      i1 = 0
      i2 = 2
    } else if (i === 2) {
      i1 = 1
      i2 = 0
    }
    for (let j = 0; j < row.length; j++) {
      let square = row[j]
      if (square === none) {
        if (j === 0 &&
          (matrix[i1][j] === none || matrix[i2][j] === none) &&
          (matrix[i][1] === none || matrix[i][2] === none) &&
          (i === 1 || matrix[1][1] === none || matrix[i2][2] === none)
        ) {
          freeSquares.push([i, j])
        } else if (j === 1 &&
          (i !== 1 ?
            (
              (matrix[i1][j] === none || matrix[i2][j] === none) &&
              (matrix[i][0] === none || matrix[i][2] === none)
            ) :
            (
              (matrix[i1][0] === none || matrix[i2][2] === none) &&
              (matrix[i1][2] === none || matrix[i2][0] === none)
            )
          )
        ) {
          freeSquares.push([i, j])
        } else if (j === 2 &&
          (matrix[i1][j] === none || matrix[i2][j] === none) &&
          (matrix[i][0] === none || matrix[i][1] === none) &&
          (i === 1 || matrix[1][1] === none || matrix[i2][0] === none)
        ) {
          freeSquares.push([i, j])
        }
      }
    }
  }
  return freeSquares
}

const isGameOver = matrix => {
  const checkMatrix = [
    [matrix[0][0], matrix[0][1], matrix[0][2]], // row 0
    [matrix[1][0], matrix[1][1], matrix[1][2]], // row 1
    [matrix[2][0], matrix[2][1], matrix[2][2]], // row 2
    [matrix[0][0], matrix[1][0], matrix[2][0]], // col 0
    [matrix[0][1], matrix[1][1], matrix[2][1]], // col 1
    [matrix[0][2], matrix[1][2], matrix[2][2]], // col 2
    [matrix[0][0], matrix[1][1], matrix[2][2]], // dig
    [matrix[2][0], matrix[1][1], matrix[0][2]], // antidig
  ]
  return checkMatrix.some(i => i.every(j => j === x))
}

const defaultValues = {
  matrix: Array(3).fill(Array(3).fill(none)),
  round: 0,
  gameOver: false,
  moves: [],
  isUserTurn: () => randomBool()
}

export default function XTicTacToe() {
  const [matrix, setMatrix] = useState(defaultValues.matrix)
  const [round, setRound] = useState(defaultValues.round)
  const [gameOver, setGameOver] = useState(defaultValues.gameOver)
  const [moves, setMoves] = useState(defaultValues.moves)
  const [isUserTurn, setIsUserTurn] = useState(defaultValues.isUserTurn)

  const onReset = () => {
    setMatrix(defaultValues.matrix)
    setRound(defaultValues.round)
    setGameOver(defaultValues.gameOver)
    setMoves(defaultValues.moves)
    setIsUserTurn(defaultValues.isUserTurn)
  }

  useEffect(() => {
    const computerMove = () => {
      let isComputerFirst = round % 2 === 0
      let freeSquares = getFreeSquares(matrix)
      let newMatrix = matrix
      if (!freeSquares.length) {
        setGameOver(true)
        return
      }
      if (isComputerFirst) {
        if (round === 0) {
          setMoves(prev => prev.concat([[1, 1]]))
          newMatrix = updateMatrix(x, 1, 1)(matrix)
        } else {
          const lastMove = moves[moves.length - 1]
          let [i, j] = lastMove
          const hourse = hourseMove(matrix, i, j)
          setMoves(prev => prev.concat([hourse]))
          newMatrix = updateMatrix(x, ...hourse)(matrix)
        }
      } else {
        if (matrix[1][1] === none) {
          const lastMove = moves[moves.length - 1]
          let [i, j] = lastMove
          let newI = i === 2 ? 0 : i === 0 ? 2 : i
          let newJ = j === 2 ? 0 : j === 0 ? 2 : j
          setMoves(prev => prev.concat([[newI, newJ]]))
          newMatrix = updateMatrix(x, newI, newJ)(matrix)
        }
        else {
          setMoves(prev => prev.concat([freeSquares[0]]))
          newMatrix = updateMatrix(x, ...freeSquares[0])(matrix)
        }
      }
      const over = isGameOver(newMatrix)
      let freeNewSquares = getFreeSquares(newMatrix)
      setGameOver(over || !freeNewSquares.length)
      setIsUserTurn(true)
      setRound(prev => prev + 1)
      setMatrix(newMatrix)
    }
    if (!isUserTurn) {
      const over = isGameOver(matrix)
      if (!over)
        computerMove()
      else {
        setGameOver(true)
      }
    }
  }, [isUserTurn, matrix, round, moves])

  const onClick = ({ value, i, j }) => {
    if (value !== x && isUserTurn && !gameOver) {
      setMatrix(prev => {
        setMoves(prev => prev.concat([[i, j]]))
        let newMatrix = updateMatrix(x, i, j)(prev)
        const over = isGameOver(newMatrix)
        setGameOver(over)
        if (!over)
          setIsUserTurn(false)
        return newMatrix
      })
      setRound(prev => prev + 1)
    }
  }

  return (
    <div>
      <Header {...{ isUserTurn, gameOver, onReset }} />      
      <TicTactToeBoard {...{ matrix, onClick }} />
    </div>
  )
}
