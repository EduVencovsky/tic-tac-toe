import React, { useState, useEffect, useCallback } from 'react'
import { SquareType } from '../Square'
import { updateMatrix, delay, randomBool } from '../../utils'
import TicTactToeBoard from '../TicTacToeBoard'

const { x, none } = SquareType

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

export default function XTicTacToe() {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill(none)))
  const [round, setRound] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [moves, setMoves] = useState([])
  const [isUserTurn, setIsUserTurn] = useState(() => randomBool())

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
          setMoves(prev => prev.concat([freeSquares[0]]))
          newMatrix = updateMatrix(x, ...freeSquares[0])(matrix)
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
    if (value !== x && isUserTurn) {
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
      <p>
        {gameOver && 'Game Over'}
      </p>
      <p>
        {isUserTurn ? 'User Turn' : 'Computer Turn'}
      </p>
      <TicTactToeBoard {...{ matrix, onClick }} />
    </div>
  )
}
